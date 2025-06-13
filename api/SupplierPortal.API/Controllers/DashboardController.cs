using MediatR;
using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ISender _mediator;

    public DashboardController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("questionnaires")]
    public async Task<ActionResult<List<UpcomingQuestionnaireDto>>> GetUpcomingQuestionnaires(
        [FromQuery] Guid? userId = null,
        [FromQuery] string userRole = "User",
        [FromQuery] int weeksAhead = 4)
    {
        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = userId,
            UserRole = userRole,
            WeeksAhead = weeksAhead
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
