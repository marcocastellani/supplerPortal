namespace Remira.UCP.SupplierPortal.Domain.Enums;

/// <summary>
/// Defines the status of a questionnaire template
/// </summary>
public enum TemplateStatus
{
    /// <summary>
    /// Template is being created or modified
    /// </summary>
    Draft = 1,
    
    /// <summary>
    /// Template is active and can be assigned
    /// </summary>
    Active = 2,
    
    /// <summary>
    /// Template is no longer in use
    /// </summary>
    Archived = 3
}
