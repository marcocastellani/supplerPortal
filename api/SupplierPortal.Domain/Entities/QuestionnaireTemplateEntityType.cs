using Remira.UCP.SupplierPortal.Domain.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents a many-to-many relationship between questionnaire templates and entity types
/// </summary>
public class QuestionnaireTemplateEntityType : BaseEntity
{
    /// <summary>
    /// ID of the questionnaire template
    /// </summary>
    public Guid QuestionnaireTemplateId { get; set; }

    /// <summary>
    /// Type of supply network entity this template targets
    /// </summary>
    public EntityType EntityType { get; set; }

    // Navigation properties

    /// <summary>
    /// Parent questionnaire template
    /// </summary>
    public QuestionnaireTemplate QuestionnaireTemplate { get; set; } = null!;
}