namespace Remira.UCP.SupplierPortal.Domain.Enums;

/// <summary>
/// Defines the type of certificate required for questionnaire completion
/// </summary>
public enum CertificateType
{
    /// <summary>
    /// Supply network entity can self-assess
    /// </summary>
    SelfAssessment = 1,
    
    /// <summary>
    /// Requires inspector validation
    /// </summary>
    InspectorRequired = 2,
    
    /// <summary>
    /// Both managers and inspectors can complete
    /// </summary>
    Both = 3
}
