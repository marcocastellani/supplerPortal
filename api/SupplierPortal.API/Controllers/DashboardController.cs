using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// Controller for dashboard-related operations and data retrieval.
/// </summary>
[ApiVersion("2025-06-01")]
public class DashboardController : MediatrBaseController
{
    /// <summary>
    /// Gets a list of upcoming questionnaires for the dashboard.
    /// </summary>
    /// <param name="userId">Optional user ID to filter questionnaires for a specific user.</param>
    /// <param name="userRole">The role of the user (default: "User").</param>
    /// <param name="weeksAhead">Number of weeks ahead to look for upcoming questionnaires (default: 4).</param>
    /// <returns>A list of upcoming questionnaire DTOs.</returns>
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
