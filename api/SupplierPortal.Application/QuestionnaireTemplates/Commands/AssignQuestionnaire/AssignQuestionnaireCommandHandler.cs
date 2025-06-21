using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;

/// <summary>
/// Handler for assigning questionnaires to supply network entities
/// </summary>
public class AssignQuestionnaireCommandHandler : IRequestHandler<AssignQuestionnaireCommand, AssignQuestionnaireResult>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;
    private readonly ICurrentUserService _currentUserService;

    public AssignQuestionnaireCommandHandler(
        IApplicationDbContext context,
        IDateTime dateTime,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _dateTime = dateTime;
        _currentUserService = currentUserService;
    }

    public async Task<AssignQuestionnaireResult> Handle(AssignQuestionnaireCommand request, CancellationToken cancellationToken)
    {
        var result = new AssignQuestionnaireResult();

        // Validate template exists and get target entity types
        var template = await _context.QuestionnaireTemplates
            .Include(t => t.TargetEntityTypes)
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId, cancellationToken);

        if (template == null)
        {
            throw new InvalidOperationException($"Template with ID {request.TemplateId} not found.");
        }

        // Determine which entity types to target
        var targetEntityTypes = request.EntityTypeFilter?.Any() == true
            ? request.EntityTypeFilter
            : template.TargetEntityTypes.Select(te => te.EntityType).ToList();

        if (!targetEntityTypes.Any())
        {
            throw new InvalidOperationException("No target entity types specified for assignment.");
        }

        // Get eligible entities based on entity types and optional ID filter
        var entitiesQuery = _context.SupplyNetworkEntities
            .Where(e => targetEntityTypes.Contains(e.EntityType));

        if (request.EntityIds?.Any() == true)
        {
            entitiesQuery = entitiesQuery.Where(e => request.EntityIds.Contains(e.Id));
        }

        var eligibleEntities = await entitiesQuery.ToListAsync(cancellationToken);

        // Get existing active questionnaires for these entities to avoid duplicates
        var existingQuestionnaireEntityIds = await _context.Questionnaires
            .Where(q => q.TemplateId == request.TemplateId
                && (q.Status == QuestionnaireStatus.Published
                    || q.Status == QuestionnaireStatus.InProgress))
            .Select(q => q.SupplierId)
            .ToHashSetAsync(cancellationToken);

        // Process each eligible entity
        foreach (var entity in eligibleEntities)
        {
            try
            {
                // Skip if entity already has an active questionnaire for this template
                if (existingQuestionnaireEntityIds.Contains(entity.Id))
                {
                    result.SkippedEntities.Add(new SkippedEntity
                    {
                        EntityId = entity.Id,
                        EntityType = entity.EntityType,
                        Reason = "Entity already has an active questionnaire for this template"
                    });
                    result.SkippedCount++;
                    continue;
                }

                // Create new questionnaire instance
                var questionnaire = new Questionnaire
                {
                    Id = Guid.NewGuid(),
                    Title = template.Title,
                    Description = template.Description,
                    Type = "Template-Based", // Could be enhanced based on template category
                    DueDate = request.DueDate,
                    Status = QuestionnaireStatus.Published,
                    Priority = MapPriority(request.Priority),
                    SupplierId = entity.Id, // Note: This field name suggests it's for suppliers, but we're using it for any entity
                    AssignedUserId = request.AssignedUserId,
                    AssignedAgentId = request.AssignedAgentId,
                    TemplateId = template.Id,
                    Created = _dateTime.Now,
                    CreatedBy = _currentUserService.UserId
                };

                _context.Questionnaires.Add(questionnaire);
                result.AssignedQuestionnaireIds.Add(questionnaire.Id);
                result.AssignedCount++;
            }
            catch (Exception ex)
            {
                result.SkippedEntities.Add(new SkippedEntity
                {
                    EntityId = entity.Id,
                    EntityType = entity.EntityType,
                    Reason = $"Error creating questionnaire: {ex.Message}"
                });
                result.SkippedCount++;
            }
        }

        // Save all changes
        await _context.SaveChangesAsync(cancellationToken);

        return result;
    }

    /// <summary>
    /// Maps application priority to domain enum
    /// </summary>
    private static Domain.Entities.QuestionnairePriority MapPriority(QuestionnairePriority priority)
    {
        return priority switch
        {
            QuestionnairePriority.Low => Domain.Entities.QuestionnairePriority.Low,
            QuestionnairePriority.Medium => Domain.Entities.QuestionnairePriority.Medium,
            QuestionnairePriority.High => Domain.Entities.QuestionnairePriority.High,
            _ => Domain.Entities.QuestionnairePriority.Medium
        };
    }
}