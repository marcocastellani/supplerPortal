using Remira.UCP.SupplierPortal.Domain.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Represents a question within a questionnaire template
/// </summary>
public class TemplateQuestion : BaseAuditableEntity
{
    /// <summary>
    /// Question text
    /// </summary>
    public string Text { get; set; } = string.Empty;
    
    /// <summary>
    /// Type of question (NonConformity, YesNo, MultipleChoice, Text)
    /// </summary>
    public QuestionType Type { get; set; }
    
    /// <summary>
    /// Whether the question is required to be answered
    /// </summary>
    public bool IsRequired { get; set; } = true;
    
    /// <summary>
    /// Display order within the section or template
    /// </summary>
    public int Order { get; set; }
    
    /// <summary>
    /// Optional help text for the question
    /// </summary>
    public string? HelpText { get; set; }
    
    /// <summary>
    /// Whether document upload is enabled for this question
    /// </summary>
    public bool AllowDocumentUpload { get; set; } = false;
    
    /// <summary>
    /// Maximum number of documents that can be uploaded
    /// </summary>
    public int MaxDocuments { get; set; } = 5;
    
    /// <summary>
    /// Whether document upload is required
    /// </summary>
    public bool RequireDocuments { get; set; } = false;
    
    /// <summary>
    /// Question-specific configuration stored as JSON
    /// (e.g., multiple choice options, severity levels, custom labels)
    /// </summary>
    public string? ConfigurationJson { get; set; }
    
    /// <summary>
    /// ID of the parent questionnaire template
    /// </summary>
    public Guid QuestionnaireTemplateId { get; set; }
    
    /// <summary>
    /// Optional ID of the section this question belongs to
    /// </summary>
    public Guid? SectionId { get; set; }
    
    /// <summary>
    /// Translations for question text, help text and configuration stored as JSON
    /// Key: language code, Value: { text: string, helpText?: string, configurationJson?: string }
    /// </summary>
    public string? TranslationsJson { get; set; }
    
    // Navigation properties
    
    /// <summary>
    /// Parent questionnaire template
    /// </summary>
    public QuestionnaireTemplate QuestionnaireTemplate { get; set; } = null!;
    
    /// <summary>
    /// Section this question belongs to (if any)
    /// </summary>
    public QuestionnaireSection? Section { get; set; }
    
    /// <summary>
    /// Conditions where this question is the trigger
    /// </summary>
    public ICollection<QuestionCondition> TriggeredConditions { get; set; } = new List<QuestionCondition>();
    
    /// <summary>
    /// Conditions where this question is the target
    /// </summary>
    public ICollection<QuestionCondition> TargetConditions { get; set; } = new List<QuestionCondition>();
}
