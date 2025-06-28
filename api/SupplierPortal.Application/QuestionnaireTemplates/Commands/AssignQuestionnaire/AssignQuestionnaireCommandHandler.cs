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

        // Ensure template is active
        if (template.Status != TemplateStatus.Active)
        {
            throw new InvalidOperationException($"Template must be active to assign. Current status: {template.Status}");
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
            .Where(e => targetEntityTypes.Contains(e.EntityType) && e.Active);

        if (request.EntityIds?.Any() == true)
        {
            entitiesQuery = entitiesQuery.Where(e => request.EntityIds.Contains(e.Id));
        }

        var eligibleEntities = await entitiesQuery.ToListAsync(cancellationToken);

        // Get existing active questionnaires for these entities to avoid duplicates
        var existingQuestionnaireEntityIds = await _context.Questionnaires
            .Where(q => q.TemplateId == request.TemplateId
                && (q.Status == QuestionnaireStatus.Published
                    || q.Status == QuestionnaireStatus.InProgress)
                && (q.DueDate > _dateTime.Now || q.Status == QuestionnaireStatus.InProgress))
            .Select(q => q.SupplierId)
            .ToHashSetAsync(cancellationToken);

        // Track entities to notify
        var entitiesToNotify = new List<(Guid EntityId, string Email, Guid QuestionnaireId)>();

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
                        EntityName = entity.LegalName,
                        EntityType = entity.EntityType,
                        Reason = "Entity already has an active questionnaire for this template that has not expired"
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
                    Type = "Template-Based",
                    DueDate = request.DueDate,
                    Status = QuestionnaireStatus.Published,
                    Priority = MapPriority(request.Priority),
                    SupplierId = entity.Id,
                    AssignedUserId = request.AssignedUserId,
                    AssignedAgentId = request.AssignedAgentId,
                    TemplateId = template.Id,
                    Notes = request.Notes,
                    Created = _dateTime.Now,
                    CreatedBy = _currentUserService.UserId
                };

                _context.Questionnaires.Add(questionnaire);
                
                result.AssignedQuestionnaireIds.Add(questionnaire.Id);
                result.AssignedEntities.Add(new AssignedEntity
                {
                    EntityId = entity.Id,
                    EntityName = entity.LegalName,
                    EntityType = entity.EntityType,
                    Location = $"{entity.City}, {entity.Country}",
                    QuestionnaireId = questionnaire.Id
                });
                result.AssignedCount++;

                // Track for notifications if requested
                if (request.SendNotifications && !string.IsNullOrEmpty(entity.Email))
                {
                    entitiesToNotify.Add((entity.Id, entity.Email, questionnaire.Id));
                }
            }
            catch (Exception ex)
            {
                result.SkippedEntities.Add(new SkippedEntity
                {
                    EntityId = entity.Id,
                    EntityName = entity.LegalName,
                    EntityType = entity.EntityType,
                    Reason = $"Error creating questionnaire: {ex.Message}"
                });
                result.SkippedCount++;
            }
        }

        // Save all changes
        await _context.SaveChangesAsync(cancellationToken);

        // Queue notifications if requested
        if (request.SendNotifications && entitiesToNotify.Any())
        {
            // TODO: Integrate with notification service
            // For now, we'll just log that notifications were requested
            // In a real implementation, this would queue email jobs
            // Example: await _notificationService.QueueQuestionnaireAssignmentEmails(entitiesToNotify);
        }

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