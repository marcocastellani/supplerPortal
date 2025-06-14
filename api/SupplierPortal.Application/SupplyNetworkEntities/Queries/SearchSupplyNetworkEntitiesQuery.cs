using MediatR;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public class SearchSupplyNetworkEntitiesQuery : IRequest<List<SupplyNetworkEntitySearchResultDto>>
{
    /// <summary>
    /// Search term (minimum 3 characters)
    /// </summary>
    public string SearchTerm { get; set; } = string.Empty;
    
    /// <summary>
    /// Filter by entity type (default: Supplier)
    /// </summary>
    public EntityType? EntityType { get; set; }
    
    /// <summary>
    /// Maximum number of results (default: 15)
    /// </summary>
    public int MaxResults { get; set; } = 15;
    
    /// <summary>
    /// Include only active entities
    /// </summary>
    public bool ActiveOnly { get; set; } = true;
}
