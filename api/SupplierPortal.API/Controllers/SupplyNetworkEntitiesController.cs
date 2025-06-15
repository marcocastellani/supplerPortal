using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[ApiVersion("2025-06-01")] 
public class SupplyNetworkEntitiesController : MediatrBaseController
{
    /// <summary>
    /// Get a paginated list of supply network entities with optional filtering
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="searchTerm">Search term for name, code, or email</param>
    /// <param name="entityType">Filter by entity type</param>
    /// <param name="accreditationStatus">Filter by accreditation status</param>
    /// <param name="active">Filter by active status</param>
    /// <param name="country">Filter by country code</param>
    /// <param name="tags">Filter by tags (comma-separated)</param>
    /// <param name="sortBy">Sort field (default: LegalName)</param>
    /// <param name="sortDescending">Sort direction (default: false)</param>
    /// <returns>Paginated list of supply network entities</returns>
    [HttpGet]
    [ProducesResponseType(typeof(GetSupplyNetworkEntitiesQueryResult), 200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<GetSupplyNetworkEntitiesQueryResult>> GetSupplyNetworkEntities(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] EntityType? entityType = null,
        [FromQuery] AccreditationStatus? accreditationStatus = null,
        [FromQuery] bool? active = null,
        [FromQuery] string? country = null,
        [FromQuery] string? tags = null,
        [FromQuery] string sortBy = "LegalName",
        [FromQuery] bool sortDescending = false)
    {
        // Validazione parametri
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;
        if (pageSize > 100) pageSize = 100;

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = page,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            EntityType = entityType,
            AccreditationStatus = accreditationStatus,
            Active = active,
            Country = country,
            Tags = string.IsNullOrEmpty(tags) ? null : tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            SortBy = sortBy,
            SortDescending = sortDescending
        };

        var result = await Mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Create a new supply network entity manually (for already accredited entities)
    /// </summary>
    /// <param name="command">Entity creation data</param>
    /// <returns>Created entity</returns>
    [HttpPost]
    [ProducesResponseType(typeof(SupplyNetworkEntityDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    public async Task<ActionResult<SupplyNetworkEntityDto>> CreateSupplyNetworkEntity(
        [FromBody] CreateSupplyNetworkEntityCommand command)
    {
        try
        {
            var result = await Mediator.Send(command);
            return CreatedAtAction(nameof(GetSupplyNetworkEntity), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Get a single supply network entity by ID
    /// </summary>
    /// <param name="id">Entity ID</param>
    /// <returns>Supply network entity</returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(SupplyNetworkEntityDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<SupplyNetworkEntityDto>> GetSupplyNetworkEntity(Guid id)
    {
        var query = new GetSupplyNetworkEntityByIdQuery(id);
        var entity = await Mediator.Send(query);

        if (entity == null)
            return NotFound();

        return Ok(entity);
    }

    /// <summary>
    /// Get available enum values for form dropdowns
    /// </summary>
    /// <returns>Enum values</returns>
    [HttpGet("enums")]
    [ProducesResponseType(200)]
    public ActionResult GetEnumValues()
    {
        return Ok(new
        {
            EntityTypes = Enum.GetNames<EntityType>().Select(name => new { Value = name, Display = name }).ToArray(),
            RolesInSupplyChain = Enum.GetNames<RoleInSupplyChain>().Select(name => new { Value = name, Display = name }).ToArray(),
            AccreditationStatuses = Enum.GetNames<AccreditationStatus>().Select(name => new { Value = name, Display = name }).ToArray()
        });
    }

    /// <summary>
    /// Validate if external code is unique
    /// </summary>
    /// <param name="externalCode">External code to validate</param>
    /// <returns>Validation result</returns>
    [HttpGet("validate/external-code/{externalCode}")]
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
    [HttpGet("validate/vat-code/{vatCode}")]
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

    /// <summary>
    /// Search supply network entities with typeahead functionality
    /// </summary>
    /// <param name="searchTerm">Search term (minimum 3 characters)</param>
    /// <param name="entityType">Filter by entity type (default: Supplier)</param>
    /// <param name="maxResults">Maximum number of results (default: 15)</param>
    /// <param name="activeOnly">Include only active entities (default: true)</param>
    /// <returns>List of matching entities</returns>
    [HttpGet("search")]
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

    /// <summary>
    /// Get a paginated list of suppliers with optional filtering
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="searchTerm">Search term for name, code, or email</param>
    /// <param name="accreditationStatus">Filter by accreditation status</param>
    /// <param name="active">Filter by active status</param>
    /// <param name="country">Filter by country code</param>
    /// <param name="tags">Filter by tags (comma-separated)</param>
    /// <param name="sortBy">Sort field (default: LegalName)</param>
    /// <param name="sortDescending">Sort direction (default: false)</param>
    /// <returns>Paginated list of suppliers</returns>
    [HttpGet("suppliers")]
    [ProducesResponseType(typeof(GetSupplyNetworkEntitiesQueryResult), 200)]
    public async Task<ActionResult<GetSupplyNetworkEntitiesQueryResult>> GetSuppliers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] AccreditationStatus? accreditationStatus = null,
        [FromQuery] bool? active = null,
        [FromQuery] string? country = null,
        [FromQuery] string? tags = null,
        [FromQuery] string sortBy = "LegalName",
        [FromQuery] bool sortDescending = false)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = page,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            EntityType = EntityType.Supplier,
            AccreditationStatus = accreditationStatus,
            Active = active,
            Country = country,
            Tags = string.IsNullOrEmpty(tags) ? null : tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            SortBy = sortBy,
            SortDescending = sortDescending
        };
        var result = await Mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Get a paginated list of locations with optional filtering
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="searchTerm">Search term for name, code, or email</param>
    /// <param name="accreditationStatus">Filter by accreditation status</param>
    /// <param name="active">Filter by active status</param>
    /// <param name="country">Filter by country code</param>
    /// <param name="tags">Filter by tags (comma-separated)</param>
    /// <param name="sortBy">Sort field (default: LegalName)</param>
    /// <param name="sortDescending">Sort direction (default: false)</param>
    /// <returns>Paginated list of locations</returns>
    [HttpGet("locations")]
    [ProducesResponseType(typeof(GetSupplyNetworkEntitiesQueryResult), 200)]
    public async Task<ActionResult<GetSupplyNetworkEntitiesQueryResult>> GetLocations(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] AccreditationStatus? accreditationStatus = null,
        [FromQuery] bool? active = null,
        [FromQuery] string? country = null,
        [FromQuery] string? tags = null,
        [FromQuery] string sortBy = "LegalName",
        [FromQuery] bool sortDescending = false)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = page,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            EntityType = EntityType.Site,
            AccreditationStatus = accreditationStatus,
            Active = active,
            Country = country,
            Tags = string.IsNullOrEmpty(tags) ? null : tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            SortBy = sortBy,
            SortDescending = sortDescending
        };
        var result = await Mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Get a paginated list of subsuppliers with optional filtering
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="searchTerm">Search term for name, code, or email</param>
    /// <param name="accreditationStatus">Filter by accreditation status</param>
    /// <param name="active">Filter by active status</param>
    /// <param name="country">Filter by country code</param>
    /// <param name="tags">Filter by tags (comma-separated)</param>
    /// <param name="sortBy">Sort field (default: LegalName)</param>
    /// <param name="sortDescending">Sort direction (default: false)</param>
    /// <returns>Paginated list of subsuppliers</returns>
    [HttpGet("subsuppliers")]
    [ProducesResponseType(typeof(GetSupplyNetworkEntitiesQueryResult), 200)]
    public async Task<ActionResult<GetSupplyNetworkEntitiesQueryResult>> GetSubSuppliers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] AccreditationStatus? accreditationStatus = null,
        [FromQuery] bool? active = null,
        [FromQuery] string? country = null,
        [FromQuery] string? tags = null,
        [FromQuery] string sortBy = "LegalName",
        [FromQuery] bool sortDescending = false)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = page,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            EntityType = EntityType.SubSupplier,
            AccreditationStatus = accreditationStatus,
            Active = active,
            Country = country,
            Tags = string.IsNullOrEmpty(tags) ? null : tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            SortBy = sortBy,
            SortDescending = sortDescending
        };
        var result = await Mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Get a paginated list of contacts with optional filtering
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 20, max: 100)</param>
    /// <param name="searchTerm">Search term for name, code, or email</param>
    /// <param name="accreditationStatus">Filter by accreditation status</param>
    /// <param name="active">Filter by active status</param>
    /// <param name="country">Filter by country code</param>
    /// <param name="tags">Filter by tags (comma-separated)</param>
    /// <param name="sortBy">Sort field (default: LegalName)</param>
    /// <param name="sortDescending">Sort direction (default: false)</param>
    /// <returns>Paginated list of contacts</returns>
    [HttpGet("contacts")]
    [ProducesResponseType(typeof(GetSupplyNetworkEntitiesQueryResult), 200)]
    public async Task<ActionResult<GetSupplyNetworkEntitiesQueryResult>> GetContacts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? searchTerm = null,
        [FromQuery] AccreditationStatus? accreditationStatus = null,
        [FromQuery] bool? active = null,
        [FromQuery] string? country = null,
        [FromQuery] string? tags = null,
        [FromQuery] string sortBy = "LegalName",
        [FromQuery] bool sortDescending = false)
    {
        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = page,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            EntityType = EntityType.Person,
            AccreditationStatus = accreditationStatus,
            Active = active,
            Country = country,
            Tags = string.IsNullOrEmpty(tags) ? null : tags.Split(',', StringSplitOptions.RemoveEmptyEntries),
            SortBy = sortBy,
            SortDescending = sortDescending
        };
        var result = await Mediator.Send(query);
        return Ok(result);
    }
}
