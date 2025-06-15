using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class Supplier : SupplyNetworkEntities
{
    public Supplier()
    {
        EntityType = Enums.EntityType.Supplier;
    }
}
