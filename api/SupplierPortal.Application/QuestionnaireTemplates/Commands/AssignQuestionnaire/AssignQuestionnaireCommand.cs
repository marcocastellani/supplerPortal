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
    public DateTime DueDate { get; set; }

    /// <summary>
    /// Priority for the assigned questionnaires
    /// </summary>
    public QuestionnairePriority Priority { get; set; } = QuestionnairePriority.Medium;

    /// <summary>
    /// Optional assigned user ID
    /// </summary>
    public Guid? AssignedUserId { get; set; }

    /// <summary>
    /// Optional assigned agent ID
    /// </summary>
    public Guid? AssignedAgentId { get; set; }
}

/// <summary>
/// Result of questionnaire assignment operation
/// </summary>
public class AssignQuestionnaireResult
{
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
}

/// <summary>
/// Information about an entity that was skipped during assignment
/// </summary>
public class SkippedEntity
{
    public Guid EntityId { get; set; }
    public EntityType EntityType { get; set; }
    public string Reason { get; set; } = string.Empty;
}

/// <summary>
/// Priority levels for questionnaires
/// </summary>
public enum QuestionnairePriority
{
    Low = 1,
    Medium = 2,
    High = 3
}