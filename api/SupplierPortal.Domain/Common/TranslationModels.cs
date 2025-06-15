namespace Remira.UCP.SupplierPortal.Domain.Common;

/// <summary>
/// Translation model for section translations stored as JSON
/// </summary>
public class SectionTranslationModel
{
    /// <summary>
    /// Translated section title
    /// </summary>
    public string Title { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated section description
    /// </summary>
    public string? Description { get; set; }
}

/// <summary>
/// Translation model for question translations stored as JSON
/// </summary>
public class QuestionTranslationModel
{
    /// <summary>
    /// Translated question text
    /// </summary>
    public string Text { get; set; } = string.Empty;
    
    /// <summary>
    /// Translated help text
    /// </summary>
    public string? HelpText { get; set; }
    
    /// <summary>
    /// Translated configuration (e.g., multiple choice options)
    /// </summary>
    public string? ConfigurationJson { get; set; }
}
