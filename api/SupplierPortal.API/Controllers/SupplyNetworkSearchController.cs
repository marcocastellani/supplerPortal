using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiVersion("2025-06-01")]
public class SupplyNetworkSearchController : MediatrBaseController
{
    /// <summary>
    /// Search supply network entities with typeahead functionality
    /// </summary>
    /// <param name="searchTerm">Search term (minimum 3 characters)</param>
    /// <param name="entityType">Filter by entity type (default: Supplier)</param>
    /// <param name="maxResults">Maximum number of results (default: 15)</param>
    /// <param name="activeOnly">Include only active entities (default: true)</param>
    /// <returns>List of matching entities</returns>
    [HttpGet]
    [ProducesResponseType(typeof(List<SupplyNetworkEntitySearchResultDto>), 200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<List<SupplyNetworkEntitySearchResultDto>>> SearchSupplyNetworkEntities(
        [FromQuery] string searchTerm,
        [FromQuery] EntityType? entityType = null,
        [FromQuery] int maxResults = 15,
        [FromQuery] bool activeOnly = true)
    {
        // Set default entity type to Supplier if not specified
        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = searchTerm ?? string.Empty,
            EntityType = entityType ?? EntityType.Supplier,
            MaxResults = Math.Min(maxResults, 50), // Cap at 50 for performance
            ActiveOnly = activeOnly
        };

        var result = await Mediator.Send(query);
        return Ok(result);
    }
}