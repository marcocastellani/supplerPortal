using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.SaveDraft;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateSection;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetDraft;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// API Controller for managing questionnaire templates
/// </summary>
[ApiVersion("2025-06-01")]
public class QuestionnaireTemplatesController : MediatrBaseController
{
    /// <summary>
    /// Create a new questionnaire template
    /// </summary>
    /// <param name="command">Template creation data</param>
    /// <returns>Created template with sections</returns>
    [HttpPost]
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
    /// Create a new section in a template
    /// </summary>
    /// <param name="id">Template ID</param>
    /// <param name="command">Section creation data</param>
    /// <returns>Created section</returns>
    [HttpPost("{id:guid}/sections")]
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
}
