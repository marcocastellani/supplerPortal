using Remira.UCP.SupplierPortal.Domain.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents a questionnaire template that can be used to create questionnaire instances
/// </summary>
public class QuestionnaireTemplate : BaseAuditableEntity
{
    /// <summary>
    /// Template title
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Template description
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Target supply network entity type for this template
    /// </summary>
    [Obsolete("Use TargetEntityTypes navigation property instead")]
    public int TargetEntityTypeId { get; set; }

    /// <summary>
    /// Primary language for the template
    /// </summary>
    public string PrimaryLanguage { get; set; } = "en";

    /// <summary>
    /// Questionnaire expiration period in months
    /// </summary>
    public int ExpirationMonths { get; set; }

    /// <summary>
    /// Type of certificate required for completion
    /// </summary>
    public CertificateType CertificateType { get; set; }

    /// <summary>
    /// Current status of the template
    /// </summary>
    public TemplateStatus Status { get; set; } = TemplateStatus.Draft;

    /// <summary>
    /// Template version for audit trail
    /// </summary>
    public string Version { get; set; } = "1.0";

    /// <summary>
    /// Last time template was modified
    /// </summary>
    public new DateTime? LastModified { get; set; }

    // Navigation properties

    /// <summary>
    /// Sections that organize questions within the template
    /// </summary>
    public ICollection<QuestionnaireSection> Sections { get; set; } = new List<QuestionnaireSection>();

    /// <summary>
    /// All questions in this template
    /// </summary>
    public ICollection<TemplateQuestion> Questions { get; set; } = new List<TemplateQuestion>();

    /// <summary>
    /// Conditional logic rules between questions
    /// </summary>
    public ICollection<QuestionCondition> Conditions { get; set; } = new List<QuestionCondition>();

    /// <summary>
    /// Questionnaire instances created from this template
    /// </summary>
    public ICollection<Questionnaire> QuestionnaireInstances { get; set; } = new List<Questionnaire>();

    /// <summary>
    /// Target entity types for this template (many-to-many relationship)
    /// </summary>
    public ICollection<QuestionnaireTemplateEntityType> TargetEntityTypes { get; set; } = new List<QuestionnaireTemplateEntityType>();

    /// <summary>
    /// Validates that the template has at least one target entity type
    /// </summary>
    /// <returns>True if template is valid, false otherwise</returns>
    public bool HasValidTargetEntityTypes()
    {
        return TargetEntityTypes != null && TargetEntityTypes.Any();
    }

    /// <summary>
    /// Gets the list of target entity types for this template
    /// </summary>
    /// <returns>List of EntityType enums</returns>
    public List<EntityType> GetTargetEntityTypes()
    {
        return TargetEntityTypes?.Select(te => te.EntityType).ToList() ?? new List<EntityType>();
    }
}
