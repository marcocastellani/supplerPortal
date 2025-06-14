using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public enum QuestionnaireStatus
{
    Draft,
    Published,
    InProgress,
    Completed,
    Overdue
}

public enum QuestionnairePriority
{
    Low,
    Medium,
    High
}

public class Questionnaire : BaseAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // e.g. "Safety", "Quality", "Environmental"
    public DateTime DueDate { get; set; }
    public QuestionnaireStatus Status { get; set; } = QuestionnaireStatus.Draft;
    public QuestionnairePriority Priority { get; set; } = QuestionnairePriority.Medium;
    public Guid SupplierId { get; set; }
    public Guid? AssignedUserId { get; set; }
    public Guid? AssignedAgentId { get; set; }
    
    // Navigation properties
    public Supplier Supplier { get; set; } = null!;
    public User? AssignedUser { get; set; }
    public User? AssignedAgent { get; set; }
    public ICollection<Remediation> Remediations { get; set; } = new List<Remediation>();
}
