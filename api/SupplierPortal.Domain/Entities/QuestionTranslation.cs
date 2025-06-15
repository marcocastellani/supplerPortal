using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents translations for template questions
/// </summary>
public class QuestionTranslation : BaseAuditableEntity
{
    /// <summary>
    /// ID of the question being translated
    /// </summary>
    public Guid QuestionId { get; set; }
    
    /// <summary>
    /// Language code (e.g., "en", "it", "fr")
    /// </summary>
    public string LanguageCode { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated question text
    /// </summary>
    public string Text { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated help text
    /// </summary>
    public string? HelpText { get; set; }
    
    /// <summary>
    /// Translated configuration (e.g., translated multiple choice options)
    /// </summary>
    public string? ConfigurationJson { get; set; }
    
    // Navigation properties
    
    /// <summary>
    /// Question being translated
    /// </summary>
    public TemplateQuestion Question { get; set; } = null!;
}
