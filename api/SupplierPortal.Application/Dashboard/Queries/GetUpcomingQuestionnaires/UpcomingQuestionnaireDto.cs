namespace Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

public class UpcomingQuestionnaireDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }
    public string SupplierName { get; set; } = string.Empty;
    public string SupplierCode { get; set; } = string.Empty;
    public int DaysToDeadline { get; set; }
    public bool IsOverdue { get; set; }
}
