using MediatR;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public class GetSupplyNetworkEntitiesQuery : IRequest<GetSupplyNetworkEntitiesQueryResult>
{
    // Paginazione
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    
    // Filtri
    public string? SearchTerm { get; set; }
    public EntityType? EntityType { get; set; }
    public AccreditationStatus? AccreditationStatus { get; set; }
    public bool? Active { get; set; }
    public string? Country { get; set; }
    public string[]? Tags { get; set; }
    
    // Ordinamento
    public string SortBy { get; set; } = "LegalName";
    public bool SortDescending { get; set; } = false;
}

public class GetSupplyNetworkEntitiesQueryResult
{
    public IList<SupplyNetworkEntityDto> Items { get; set; } = new List<SupplyNetworkEntityDto>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPreviousPage => Page > 1;
    public bool HasNextPage => Page < TotalPages;
}
