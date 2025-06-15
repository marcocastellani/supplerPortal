using MediatR;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

/// <summary>
/// Query to get all children entities of a parent entity
/// </summary>
public class GetSupplyNetworkEntityChildrenQuery : IRequest<List<SupplyNetworkEntityDto>>
{
    /// <summary>
    /// Parent entity ID
    /// </summary>
    public Guid ParentId { get; set; }

    /// <summary>
    /// Whether to include only active entities
    /// </summary>
    public bool? ActiveOnly { get; set; }

    /// <summary>
    /// Optional entity type filter
    /// </summary>
    public Domain.Enums.EntityType? EntityType { get; set; }
}
