using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// Controller for managing supply network entities including suppliers, locations, sub-suppliers, and contacts.
/// </summary>
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

    /// <summary>
    /// Get all child entities of a parent entity
    /// </summary>
    /// <param name="parentId">Parent entity ID</param>
    /// <param name="activeOnly">Filter by active status only</param>
    /// <param name="entityType">Filter by entity type</param>
    /// <returns>List of child entities</returns>
    [HttpGet("{parentId}/children")]
    [ProducesResponseType(typeof(List<SupplyNetworkEntityDto>), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<List<SupplyNetworkEntityDto>>> GetSupplyNetworkEntityChildren(
        [FromRoute] Guid parentId,
        [FromQuery] bool? activeOnly = null,
        [FromQuery] EntityType? entityType = null)
    {
        var query = new GetSupplyNetworkEntityChildrenQuery
        {
            ParentId = parentId,
            ActiveOnly = activeOnly,
            EntityType = entityType
        };

        var result = await Mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Update a single field of a supply network entity
    /// </summary>
    /// <param name="id">Entity ID</param>
    /// <param name="request">Field update request</param>
    /// <returns>Updated entity</returns>
    [HttpPatch("{id:guid}/field")]
    [ProducesResponseType(typeof(SupplyNetworkEntityDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<SupplyNetworkEntityDto>> UpdateEntityField(
        Guid id,
        [FromBody] UpdateEntityFieldRequest request)
    {
        try
        {
            var command = new UpdateSupplyNetworkEntityFieldCommand
            {
                EntityId = id,
                FieldName = request.FieldName,
                FieldValue = request.FieldValue
            };

            var result = await Mediator.Send(command);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
