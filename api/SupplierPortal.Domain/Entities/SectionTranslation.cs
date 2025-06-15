using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents translations for questionnaire sections
/// </summary>
public class SectionTranslation : BaseAuditableEntity
{
    /// <summary>
    /// ID of the section being translated
    /// </summary>
    public Guid SectionId { get; set; }
    
    /// <summary>
    /// Language code (e.g., "en", "it", "fr")
    /// </summary>
    public string LanguageCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated title
    /// </summary>
    public string Title { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated description
    /// </summary>
    public string? Description { get; set; }
    
    // Navigation properties
    
    /// <summary>
    /// Section being translated
    /// </summary>
    public QuestionnaireSection Section { get; set; } = null!;
}
