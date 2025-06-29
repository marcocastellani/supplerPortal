using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Common.Exceptions;
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
    private readonly IMapper _mapper;
    private readonly ILogger<AssignQuestionnaireCommandHandler> _logger;

    public AssignQuestionnaireCommandHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ILogger<AssignQuestionnaireCommandHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<AssignQuestionnaireResult> Handle(AssignQuestionnaireCommand request, CancellationToken cancellationToken)
    {
        var result = new AssignQuestionnaireResult();

        // Validate template exists and is active
        var template = await _context.QuestionnaireTemplates
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId && t.Status == TemplateStatus.Active, cancellationToken);

        if (template == null)
        {
            throw new NotFoundException(nameof(QuestionnaireTemplate), request.TemplateId);
        }

        // Get eligible entities based on optional ID filter
        var entitiesQuery = _context.SupplyNetworkEntities
            .Where(e => e.IsActive);

        if (request.EntityIds?.Any() == true)
        {
            entitiesQuery = entitiesQuery.Where(e => request.EntityIds.Contains(e.Id));
        }

        var eligibleEntities = await entitiesQuery.ToListAsync(cancellationToken);
        result.TotalEntities = eligibleEntities.Count;

        // Get existing active questionnaires for these entities to avoid duplicates
        var entityIds = eligibleEntities.Select(e => e.Id).ToList();
        var existingActiveQuestionnaires = await _context.Questionnaires
            .Where(q => q.TemplateId == request.TemplateId
                && entityIds.Contains(q.EntityId)
                && (q.Status == QuestionnaireStatus.NotStarted 
                    || q.Status == QuestionnaireStatus.InProgress))
            .Select(q => q.EntityId)
            .ToListAsync(cancellationToken);

        var existingQuestionnaireEntityIds = new HashSet<Guid>(existingActiveQuestionnaires);

        // Process each eligible entity
        foreach (var entity in eligibleEntities)
        {
            // Skip if entity already has an active questionnaire for this template
            if (existingQuestionnaireEntityIds.Contains(entity.Id))
            {
                result.SkippedEntities.Add(new SkippedEntity
                {
                    EntityId = entity.Id,
                    EntityName = entity.LegalName,
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
                TemplateId = template.Id,
                EntityId = entity.Id,
                DueDate = request.DueDate ?? DateTime.UtcNow.AddDays(30),
                Priority = request.Priority,
                Status = QuestionnaireStatus.NotStarted,
                Notes = request.Notes
            };

            await _context.Questionnaires.AddAsync(questionnaire, cancellationToken);
            
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
        }

        // Save all changes
        await _context.SaveChangesAsync(cancellationToken);

        // Queue notifications if requested
        if (request.SendNotifications && result.AssignedEntities.Any())
        {
            _logger.LogInformation(
                "Email notifications requested for {Count} assigned entities",
                result.AssignedEntities.Count);
            // TODO: Integrate with notification service
            // await _notificationService.QueueQuestionnaireAssignmentEmails(result.AssignedEntities);
        }

        return result;
    }
}