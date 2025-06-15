namespace Remira.UCP.SupplierPortal.Domain.Enums;

/// <summary>
/// Defines the types of questions available in questionnaires
/// </summary>
public enum QuestionType
{
    /// <summary>
    /// Non-conformity question with severity levels
    /// </summary>
    NonConformity = 1,
    
    /// <summary>
    /// Yes/No question with custom labels
    /// </summary>
    YesNo = 2,
    
    /// <summary>
    /// Multiple choice question with configurable options
    /// </summary>
    MultipleChoice = 3,
    
    /// <summary>
    /// Single option selection question
    /// </summary>
    SingleOption = 4,
    
    /// <summary>
    /// Open text question (used sparingly)
    /// </summary>
    Text = 5
}
