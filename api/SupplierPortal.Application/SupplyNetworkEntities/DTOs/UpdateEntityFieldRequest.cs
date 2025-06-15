namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

/// <summary>
/// Request DTO for updating a single entity field [SF]
/// </summary>
public class UpdateEntityFieldRequest
{
    public string FieldName { get; set; } = default!;
    public object? FieldValue { get; set; }
}
