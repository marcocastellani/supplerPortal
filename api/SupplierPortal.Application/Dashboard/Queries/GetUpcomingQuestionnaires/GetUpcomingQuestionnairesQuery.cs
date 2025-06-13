using MediatR;

namespace Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

public class GetUpcomingQuestionnairesQuery : IRequest<List<UpcomingQuestionnaireDto>>
{
    public Guid? UserId { get; set; }
    public string UserRole { get; set; } = string.Empty;
    public int WeeksAhead { get; set; } = 4;
}
