using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public enum RemediationStatus
{
    Open,
    InProgress,
    Completed,
    Overdue,
    Closed
}

public class Remediation : BaseAuditableEntity
{
    public string Description { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public RemediationStatus Status { get; set; } = RemediationStatus.Open;
    public Guid QuestionnaireId { get; set; }
    public Guid? ResponsibleUserId { get; set; }
    public Guid? ResponsibleAgentId { get; set; }
    
    // Navigation properties
    public Questionnaire Questionnaire { get; set; } = null!;
    public User? ResponsibleUser { get; set; }
    public User? ResponsibleAgent { get; set; }
}
