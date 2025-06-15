using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents a section within a questionnaire template to organize questions
/// </summary>
public class QuestionnaireSection : BaseAuditableEntity
{
    /// <summary>
    /// Section title
    /// </summary>
    public string Title { get; set; } = string.Empty;
    
    /// <summary>
    /// Optional section description
    /// </summary>
    public string? Description { get; set; }
    
    /// <summary>
    /// Display order of the section within the template
    /// </summary>
    public int Order { get; set; }
    
    /// <summary>
    /// ID of the parent questionnaire template
    /// </summary>
    public Guid QuestionnaireTemplateId { get; set; }
    
    /// <summary>
    /// Translations for title and description stored as JSON
    /// Key: language code, Value: { title: string, description?: string }
    /// </summary>
    public string? TranslationsJson { get; set; }
    
    // Navigation properties
    
    /// <summary>
    /// Parent questionnaire template
    /// </summary>
    public QuestionnaireTemplate QuestionnaireTemplate { get; set; } = null!;
    
    /// <summary>
    /// Questions belonging to this section
    /// </summary>
    public ICollection<TemplateQuestion> Questions { get; set; } = new List<TemplateQuestion>();
}
