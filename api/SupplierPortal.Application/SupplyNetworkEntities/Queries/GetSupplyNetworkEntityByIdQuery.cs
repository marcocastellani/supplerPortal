using MediatR;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public record GetSupplyNetworkEntityByIdQuery(Guid Id) : IRequest<SupplyNetworkEntityDto?>;
