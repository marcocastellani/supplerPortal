using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents conditional logic between questions in a template
/// </summary>
public class QuestionCondition : BaseAuditableEntity
{
    /// <summary>
    /// ID of the question that triggers this condition
    /// </summary>
    public Guid TriggerQuestionId { get; set; }
    
    /// <summary>
    /// ID of the question that will be shown/hidden based on condition
    /// </summary>
    public Guid TargetQuestionId { get; set; }
    
    /// <summary>
    /// Type of condition (e.g., "show_if_yes", "show_if_no", "show_if_non_conformity")
    /// </summary>
    public string ConditionType { get; set; } = string.Empty;
    
    /// <summary>
    /// Value that triggers the condition (stored as JSON for flexibility)
    /// </summary>
    public string? TriggerValue { get; set; }
    
    /// <summary>
    /// Action to take when condition is met ("show" or "hide")
    /// </summary>
    public string Action { get; set; } = "show";
    
    /// <summary>
    /// Optional description of the condition
    /// </summary>
    public string? Description { get; set; }
    
    // Navigation properties
    
    /// <summary>
    /// Question that triggers this condition
    /// </summary>
    public TemplateQuestion TriggerQuestion { get; set; } = null!;
    
    /// <summary>
    /// Question that is affected by this condition
    /// </summary>
    public TemplateQuestion TargetQuestion { get; set; } = null!;
}
