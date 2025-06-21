using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiVersion("2025-06-01")]
public class SupplyNetworkValidationController : MediatrBaseController
{
    /// <summary>
    /// Validate if external code is unique
    /// </summary>
    /// <param name="externalCode">External code to validate</param>
    /// <returns>Validation result</returns>
    [HttpGet("external-code/{externalCode}")]
    [ProducesResponseType(200)]
    public async Task<ActionResult> ValidateExternalCode(string externalCode)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            SearchTerm = externalCode,
            PageSize = 1
        };

        var result = await Mediator.Send(query);
        var exists = result.Items.Any(x => x.ExternalCode.Equals(externalCode, StringComparison.OrdinalIgnoreCase));

        return Ok(new { isUnique = !exists });
    }

    /// <summary>
    /// Validate if VAT code is unique
    /// </summary>
    /// <param name="vatCode">VAT code to validate</param>
    /// <returns>Validation result</returns>
    [HttpGet("vat-code/{vatCode}")]
    [ProducesResponseType(200)]
    public async Task<ActionResult> ValidateVatCode(string vatCode)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            PageSize = 100 // Might need to increase if many entities
        };

        var result = await Mediator.Send(query);
        var exists = result.Items.Any(x => x.VatCode.Equals(vatCode, StringComparison.OrdinalIgnoreCase));

        return Ok(new { isUnique = !exists });
    }
}