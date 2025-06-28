using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.Services;

/// <summary>
/// Service for validating questionnaire templates before activation
/// </summary>
public interface ITemplateValidationService
{
    Task<TemplateValidationResult> ValidateForActivationAsync(Guid templateId, CancellationToken cancellationToken = default);
}

/// <summary>
/// Result of template validation
/// </summary>
public class TemplateValidationResult
{
    public bool IsValid { get; set; }
    public List<string> ValidationErrors { get; set; } = new();

    public void AddError(string error)
    {
        ValidationErrors.Add(error);
        IsValid = false;
    }
}

/// <summary>
/// Implementation of template validation service
/// </summary>
public class TemplateValidationService : ITemplateValidationService
{
    private readonly IApplicationDbContext _context;

    public TemplateValidationService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TemplateValidationResult> ValidateForActivationAsync(Guid templateId, CancellationToken cancellationToken = default)
    {
        var result = new TemplateValidationResult { IsValid = true };

        // Get template with related data
        var template = await _context.QuestionnaireTemplates
            .Include(t => t.Questions)
            .Include(t => t.TargetEntityTypes)
            .FirstOrDefaultAsync(t => t.Id == templateId, cancellationToken);

        if (template == null)
        {
            result.AddError("Template not found");
            return result;
        }

        // Check if template is already active
        if (template.Status == TemplateStatus.Active)
        {
            result.AddError("Template is already active and cannot be activated again");
            return result;
        }

        // Validate basic template information
        await ValidateBasicInformation(template, result, cancellationToken);

        // Validate questions
        await ValidateQuestions(template, result, cancellationToken);

        // Validate target entity types
        ValidateTargetEntityTypes(template, result);

        // Validate conditional logic
        await ValidateConditionalLogic(template, result, cancellationToken);

        return result;
    }

    private async Task ValidateBasicInformation(QuestionnaireTemplate template, TemplateValidationResult result, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(template.Title))
        {
            result.AddError("Template title is required");
        }

        if (string.IsNullOrWhiteSpace(template.Description))
        {
            result.AddError("Template description is required");
        }

        if (string.IsNullOrWhiteSpace(template.PrimaryLanguage))
        {
            result.AddError("Primary language is required");
        }

        if (template.ExpirationMonths <= 0)
        {
            result.AddError("Expiration months must be greater than 0");
        }
    }

    private async Task ValidateQuestions(QuestionnaireTemplate template, TemplateValidationResult result, CancellationToken cancellationToken)
    {
        var questionCount = await _context.TemplateQuestions
            .CountAsync(q => q.QuestionnaireTemplateId == template.Id, cancellationToken);

        if (questionCount == 0)
        {
            result.AddError("Template must have at least one question");
        }

        // Validate each question has required properties
        var questions = await _context.TemplateQuestions
            .Where(q => q.QuestionnaireTemplateId == template.Id)
            .ToListAsync(cancellationToken);

        foreach (var question in questions)
        {
            if (string.IsNullOrWhiteSpace(question.Text))
            {
                result.AddError($"Question at order {question.Order} is missing question text");
            }

            // Additional question-specific validations can be added here
            // For example, validate question configuration based on question type
        }
    }

    private void ValidateTargetEntityTypes(QuestionnaireTemplate template, TemplateValidationResult result)
    {
        if (template.TargetEntityTypes?.Any() != true)
        {
            result.AddError("Template must have at least one target entity type");
        }
    }

    private async Task ValidateConditionalLogic(QuestionnaireTemplate template, TemplateValidationResult result, CancellationToken cancellationToken)
    {
        var conditions = await _context.QuestionConditions
            .Where(c => _context.TemplateQuestions
                .Any(q => q.QuestionnaireTemplateId == template.Id && (q.Id == c.TriggerQuestionId || q.Id == c.TargetQuestionId)))
            .ToListAsync(cancellationToken);

        if (!conditions.Any())
        {
            return; // No conditions to validate
        }

        // Check for circular dependencies in conditional logic
        var questionIds = await _context.TemplateQuestions
            .Where(q => q.QuestionnaireTemplateId == template.Id)
            .Select(q => q.Id)
            .ToListAsync(cancellationToken);

        foreach (var condition in conditions)
        {
            // Validate that both trigger and target questions exist in this template
            if (!questionIds.Contains(condition.TriggerQuestionId))
            {
                result.AddError($"Condition references trigger question that doesn't exist in this template");
            }

            if (!questionIds.Contains(condition.TargetQuestionId))
            {
                result.AddError($"Condition references target question that doesn't exist in this template");
            }
        }

        // Check for circular dependencies (simplified check)
        if (HasCircularDependencies(conditions))
        {
            result.AddError("Circular dependencies detected in conditional logic");
        }
    }

    private bool HasCircularDependencies(List<QuestionCondition> conditions)
    {
        // Build a dependency graph and check for cycles
        var dependencies = conditions
            .GroupBy(c => c.TriggerQuestionId)
            .ToDictionary(
                g => g.Key,
                g => g.Select(c => c.TargetQuestionId).ToList()
            );

        var visited = new HashSet<Guid>();
        var recursionStack = new HashSet<Guid>();

        foreach (var node in dependencies.Keys)
        {
            if (HasCycleDfs(node, dependencies, visited, recursionStack))
            {
                return true;
            }
        }

        return false;
    }

    private bool HasCycleDfs(Guid node, Dictionary<Guid, List<Guid>> dependencies, HashSet<Guid> visited, HashSet<Guid> recursionStack)
    {
        if (recursionStack.Contains(node))
        {
            return true; // Cycle detected
        }

        if (visited.Contains(node))
        {
            return false; // Already processed
        }

        visited.Add(node);
        recursionStack.Add(node);

        if (dependencies.TryGetValue(node, out var neighbors))
        {
            foreach (var neighbor in neighbors)
            {
                if (HasCycleDfs(neighbor, dependencies, visited, recursionStack))
                {
                    return true;
                }
            }
        }

        recursionStack.Remove(node);
        return false;
    }
}