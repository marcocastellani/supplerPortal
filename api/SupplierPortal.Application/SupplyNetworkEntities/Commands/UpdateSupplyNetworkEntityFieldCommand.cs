using MediatR;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

/// <summary>
/// Command to update a single field of a supply network entity [SF]
/// </summary>
public class UpdateSupplyNetworkEntityFieldCommand : IRequest<SupplyNetworkEntityDto>
{
    public Guid EntityId { get; set; }
    public string FieldName { get; set; } = default!;
    public object? FieldValue { get; set; }
}
