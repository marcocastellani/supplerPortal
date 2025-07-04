using System.Net.Mime;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Authorization;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateSection;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetDraft;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplates;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetDraft;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplates;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Asp.Versioning;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.SaveDraft;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// API Controller for managing questionnaire templates
/// </summary>
[ApiVersion("2025-06-01")]

public class QuestionnaireTemplatesController : MediatrBaseController
{

    /// <summary>
    /// Create a new questionnaire template with multiple target entity types
    /// </summary>
    /// <param name="command">Template creation data including target entity types array</param>
    /// <returns>Created template with sections and entity type associations</returns>
    [HttpPost]
    [RequireRole("administrator", "sustainability_manager")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(QuestionnaireTemplateResponse), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> CreateTemplate(
        CreateQuestionnaireTemplateCommand command)
    {
        try
        {
            var result = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetTemplate), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>
    /// Get a questionnaire template by ID
    /// </summary>
    /// <param name="id">Template ID</param>
    /// <returns>Complete template with sections, questions, and conditions</returns>
    [HttpGet("{id:guid}")]
    [RequireRole("administrator", "sustainability_manager")]
    [ProducesResponseType(typeof(QuestionnaireTemplateResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> GetTemplate(Guid id)
    {
        try
        {
            var query = new GetQuestionnaireTemplateQuery(id);
            var result = await Mediator.Send(query);
            return Ok(result);
        }
        catch (InvalidOperationException)
        {
            return NotFound(new { error = $"Template with ID {id} not found." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    /// <summary>
    /// Get a draft questionnaire template by ID
    /// </summary>
    /// <param name="id">Template ID</param>
    /// <returns>Draft template with all current data</returns>
    [HttpGet("{id:guid}/draft")]
    [RequireRole("administrator", "sustainability_manager")]
    [ProducesResponseType(typeof(QuestionnaireTemplateResponse), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> GetDraft(Guid id)
    {
        try
        {
            var query = new GetDraftQuestionnaireQuery(id);
            var result = await Mediator.Send(query);
            return Ok(result);
        }
        catch (InvalidOperationException)
        {
            return NotFound(new { error = $"Draft template with ID {id} not found." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    /// <summary>
    /// Save draft changes to a template (auto-save functionality)
    /// </summary>
    /// <param name="id">Template ID</param>
    /// <param name="command">Draft save data</param>
    /// <returns>Success confirmation</returns>
    [HttpPut("{id:guid}/auto-save")]
    [RequireRole("administrator", "sustainability_manager")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult> AutoSave(Guid id, SaveDraftCommand command)
    {
        try
        {
            command.TemplateId = id; // Ensure ID consistency
            await Mediator.Send(command);
            return NoContent();
        }
        catch (InvalidOperationException)
        {
            return NotFound(new { error = $"Template with ID {id} not found." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>
    /// Publish/activate a questionnaire template
    /// </summary>
    /// <param name="id">Template ID to publish</param>
    /// <returns>Published template with updated status and version</returns>
    [HttpPost("{id:guid}/publish")]
    [ProducesResponseType(typeof(QuestionnaireTemplateResponse), 200)]
    [ProducesResponseType(typeof(ValidationErrorResponse), 400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<QuestionnaireTemplateResponse>> PublishTemplate(Guid id)
    {
        try
        {
            var command = new PublishTemplateCommand(id);
            var result = await Mediator.Send(command);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            // Check if this is a validation error (contains multiple validation messages)
            if (ex.Message.Contains("Template validation failed:"))
            {
                var errorPart = ex.Message.Replace("Template validation failed: ", "");
                var errors = errorPart.Split("; ").ToList();
                var validationResponse = ValidationErrorResponse.Failed(errors, "Template cannot be published due to validation errors");
                return BadRequest(validationResponse);
            }

            // Single error case (template not found, already active, etc.)
            var singleErrorResponse = ValidationErrorResponse.Failed(ex.Message);
            return BadRequest(singleErrorResponse);
        }
        catch (Exception ex)
        {
            var errorResponse = ValidationErrorResponse.Failed(
                "An unexpected error occurred while publishing the template. Please try again later.",
                "Internal Server Error"
            );

            // Log the actual exception (in a real app, use proper logging)
            // _logger.LogError(ex, "Error publishing template {TemplateId}", id);

            return StatusCode(500, errorResponse);
        }
    }

    /// <summary>
    /// Get all questionnaire templates with search, filtering, pagination and sorting
    /// </summary>
    /// <param name="searchTerm">Search term to filter templates by title (server-side filtering)</param>
    /// <param name="status">Filter by template status (Draft/Active/Archived)</param>
    /// <param name="language">Filter by primary language</param>
    /// <param name="createdFrom">Filter by creation date from</param>
    /// <param name="createdTo">Filter by creation date to</param>
    /// <param name="page">Page number (1-based, default: 1)</param>
    /// <param name="pageSize">Number of items per page (1-100, default: 10)</param>
    /// <param name="sortBy">Field to sort by (title, created, lastmodified, usagecount, status)</param>
    /// <param name="sortDirection">Sort direction (asc/desc, default: asc)</param>
    /// <returns>Paginated list of templates with metadata</returns>
    [HttpGet]
    [RequireRole("administrator", "sustainability_manager")]
    [ProducesResponseType(typeof(PaginatedTemplatesResponse), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<PaginatedTemplatesResponse>> GetTemplates(
        [FromQuery] string? searchTerm = null,
        [FromQuery] TemplateStatus? status = null,
        [FromQuery] string? language = null,
        [FromQuery] DateTime? createdFrom = null,
        [FromQuery] DateTime? createdTo = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? sortBy = null,
        [FromQuery] string? sortDirection = "asc")
    {
        try
        {
            var query = new GetQuestionnaireTemplatesQuery
            {
                SearchTerm = searchTerm,
                Status = status,
                Language = language,
                CreatedFrom = createdFrom,
                CreatedTo = createdTo,
                Page = page,
                PageSize = pageSize,
                SortBy = sortBy,
                SortDirection = sortDirection
            };

            var result = await Mediator.Send(query);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    /// <summary>
    /// Create a new section in a template
    /// </summary>
    /// <param name="id">Template ID</param>
    /// <param name="command">Section creation data</param>
    /// <returns>Created section</returns>
    [HttpPost("{id:guid}/sections")]
    [RequireRole("administrator", "sustainability_manager")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(SectionResponse), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<SectionResponse>> CreateSection(Guid id, CreateSectionCommand command)
    {
        try
        {
            command.TemplateId = id; // Ensure ID consistency
            var result = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetTemplate), new { id = id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    /// <summary>
    /// Assign a questionnaire template to a supply network entity.
    /// Accessible by: Administrator, Supply Chain Operator, Sustainability Manager
    /// </summary>
    /// <param name="command">Assignment data</param>
    /// <returns>Created questionnaire ID</returns>
    [HttpPost("assign")]
    [RequireRole("administrator", "supply_chain_operator", "sustainability_manager")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Guid>> AssignQuestionnaire([FromBody] AssignQuestionnaireCommand command)
    {
        var questionnaireId = await Mediator.Send(command);
        return Created($"/api/questionnaires/{questionnaireId}", questionnaireId);
    }
}
