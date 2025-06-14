using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiVersion("2024-10-01")]
public class DashboardController : MediatrBaseController
{
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

        var result = await Mediator.Send(query);
        return Ok(result);
    }
}
