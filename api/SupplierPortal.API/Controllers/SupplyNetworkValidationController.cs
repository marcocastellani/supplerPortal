using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Asp.Versioning;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiVersion("2025-06-01")]
[Route("api/supplynetworkentities/validate")]
public class SupplyNetworkValidationController : MediatrBaseController
{
    private readonly IApplicationDbContext _context;

    public SupplyNetworkValidationController(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Validate if external code is unique
    /// </summary>
    /// <param name="externalCode">External code to validate</param>
    /// <param name="excludeId">Optional entity ID to exclude from validation (for updates)</param>
    /// <returns>Validation result</returns>
    [HttpGet("external-code/{externalCode}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult> ValidateExternalCode(string externalCode, [FromQuery] Guid? excludeId = null)
    {
        if (string.IsNullOrWhiteSpace(externalCode))
        {
            return BadRequest(new { message = "External code cannot be empty" });
        }

        // Direct database query for exact matching - no pagination needed for validation
        var existsQuery = _context.SupplyNetworkEntities
            .Where(s => s.ExternalCode.ToLower() == externalCode.ToLower());

        // Exclude specific entity when updating
        if (excludeId.HasValue)
        {
            existsQuery = existsQuery.Where(s => s.Id != excludeId.Value);
        }

        var exists = await existsQuery.AnyAsync();

        return Ok(new { isUnique = !exists });
    }

    /// <summary>
    /// Validate if VAT code is unique
    /// </summary>
    /// <param name="vatCode">VAT code to validate</param>
    /// <param name="excludeId">Optional entity ID to exclude from validation (for updates)</param>
    /// <returns>Validation result</returns>
    [HttpGet("vat-code/{vatCode}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult> ValidateVatCode(string vatCode, [FromQuery] Guid? excludeId = null)
    {
        if (string.IsNullOrWhiteSpace(vatCode))
        {
            return BadRequest(new { message = "VAT code cannot be empty" });
        }

        // Direct database query for exact matching - check ALL entities, no pagination
        var existsQuery = _context.SupplyNetworkEntities
            .Where(s => s.VatCode.ToLower() == vatCode.ToLower());

        // Exclude specific entity when updating
        if (excludeId.HasValue)
        {
            existsQuery = existsQuery.Where(s => s.Id != excludeId.Value);
        }

        var exists = await existsQuery.AnyAsync();

        return Ok(new { isUnique = !exists });
    }

    /// <summary>
    /// Validate if legal name is unique
    /// </summary>
    /// <param name="legalName">Legal name to validate</param>
    /// <param name="excludeId">Optional entity ID to exclude from validation (for updates)</param>
    /// <returns>Validation result</returns>
    [HttpGet("legal-name/{legalName}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult> ValidateLegalName(string legalName, [FromQuery] Guid? excludeId = null)
    {
        if (string.IsNullOrWhiteSpace(legalName))
        {
            return BadRequest(new { message = "Legal name cannot be empty" });
        }

        // Direct database query for exact matching - check ALL entities, no pagination
        var existsQuery = _context.SupplyNetworkEntities
            .Where(s => s.LegalName.ToLower() == legalName.ToLower());

        // Exclude specific entity when updating
        if (excludeId.HasValue)
        {
            existsQuery = existsQuery.Where(s => s.Id != excludeId.Value);
        }

        var exists = await existsQuery.AnyAsync();

        return Ok(new { isUnique = !exists });
    }
}