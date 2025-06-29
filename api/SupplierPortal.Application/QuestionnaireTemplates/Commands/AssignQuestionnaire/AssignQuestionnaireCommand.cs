using MediatR;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;

/// <summary>
/// Command to assign a questionnaire template to supply network entities
/// </summary>
public class AssignQuestionnaireCommand : IRequest<AssignQuestionnaireResult>
{
    /// <summary>
    /// ID of the questionnaire template to assign
    /// </summary>
    public Guid TemplateId { get; set; }

    /// <summary>
    /// Optional filter for specific entity types (if empty, uses template's target types)
    /// </summary>
    public List<EntityType>? EntityTypeFilter { get; set; }

    /// <summary>
    /// Optional filter for specific entities by ID
    /// </summary>
    public List<Guid>? EntityIds { get; set; }

    /// <summary>
    /// Due date for the assigned questionnaires
    /// </summary>
    public DateTime? DueDate { get; set; }

    /// <summary>
    /// Priority for the assigned questionnaires (Low, Medium, High)
    /// </summary>
    public string Priority { get; set; } = "Medium";

    /// <summary>
    /// Optional assigned user ID
    /// </summary>
    public Guid? AssignedUserId { get; set; }

    /// <summary>
    /// Optional assigned agent ID
    /// </summary>
    public Guid? AssignedAgentId { get; set; }

    /// <summary>
    /// Optional notes or instructions for the assignment (max 1000 characters)
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Whether to send email notifications to assigned entities
    /// </summary>
    public bool SendNotifications { get; set; }
}

/// <summary>
/// Result of questionnaire assignment operation
/// </summary>
public class AssignQuestionnaireResult
{
    /// <summary>
    /// Total number of entities that were processed
    /// </summary>
    public int TotalEntities { get; set; }

    /// <summary>
    /// Number of questionnaires successfully assigned
    /// </summary>
    public int AssignedCount { get; set; }

    /// <summary>
    /// Number of entities that were skipped (already have active questionnaire, incompatible type, etc.)
    /// </summary>
    public int SkippedCount { get; set; }

    /// <summary>
    /// List of assigned questionnaire IDs
    /// </summary>
    public List<Guid> AssignedQuestionnaireIds { get; set; } = new();

    /// <summary>
    /// List of entities that were skipped with reasons
    /// </summary>
    public List<SkippedEntity> SkippedEntities { get; set; } = new();

    /// <summary>
    /// List of successfully assigned entities with basic info
    /// </summary>
    public List<AssignedEntity> AssignedEntities { get; set; } = new();
}

/// <summary>
/// Information about an entity that was skipped during assignment
/// </summary>
public class SkippedEntity
{
    public Guid EntityId { get; set; }
    public string EntityName { get; set; } = string.Empty;
    public EntityType EntityType { get; set; }
    public string Reason { get; set; } = string.Empty;
}

/// <summary>
/// Information about an entity that was successfully assigned
/// </summary>
public class AssignedEntity
{
    public Guid EntityId { get; set; }
    public string EntityName { get; set; } = string.Empty;
    public EntityType EntityType { get; set; }
    public string Location { get; set; } = string.Empty;
    public Guid QuestionnaireId { get; set; }
}