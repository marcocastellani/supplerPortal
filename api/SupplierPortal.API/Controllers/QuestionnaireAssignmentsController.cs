using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetActiveTemplates;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// API Controller for managing questionnaire assignments
/// </summary>
[ApiVersion("2025-06-01")]
[Authorize] // Requires authentication
public class QuestionnaireAssignmentsController : MediatrBaseController
{
    /// <summary>
    /// Assign a questionnaire template to multiple supply network entities
    /// </summary>
    /// <param name="command">Assignment details including template, entities, and parameters</param>
    /// <returns>Assignment results with assigned and skipped entities</returns>
    [HttpPost]
    [Authorize(Roles = "Admin,SustainabilityManager")] // Only Admin and Sustainability Manager can assign
    [ProducesResponseType(typeof(AssignQuestionnaireResult), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<AssignQuestionnaireResult>> AssignQuestionnaire(
        AssignQuestionnaireCommand command)
    {
        try
        {
            // Log audit trail for assignment
            var userId = User.Identity?.Name ?? "Unknown";
            var entityCount = command.EntityIds?.Count ?? 0;
            
            // TODO: In production, integrate with proper audit logging service
            Logger.LogInformation(
                "User {UserId} initiating questionnaire assignment of template {TemplateId} to {EntityCount} entities",
                userId, command.TemplateId, entityCount);

            var result = await Mediator.Send(command);
            
            // Log results
            Logger.LogInformation(
                "Assignment completed: {AssignedCount} assigned, {SkippedCount} skipped",
                result.AssignedCount, result.SkippedCount);

            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            Logger.LogWarning(ex, "Invalid operation during assignment");
            return BadRequest(new { error = ex.Message });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error during questionnaire assignment");
            return StatusCode(500, new { error = "An error occurred during assignment. Please try again." });
        }
    }

    /// <summary>
    /// Get all active questionnaire templates (latest versions only)
    /// </summary>
    /// <param name="searchTerm">Optional search term to filter templates by title</param>
    /// <returns>List of active templates with metadata</returns>
    [HttpGet("templates/active")]
    [ProducesResponseType(typeof(List<ActiveTemplateResponse>), 200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<List<ActiveTemplateResponse>>> GetActiveTemplates(
        [FromQuery] string? searchTerm = null)
    {
        try
        {
            var query = new GetActiveTemplatesQuery
            {
                SearchTerm = searchTerm
            };

            var result = await Mediator.Send(query);
            return Ok(result);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving active templates");
            return StatusCode(500, new { error = "An error occurred while retrieving templates." });
        }
    }
}