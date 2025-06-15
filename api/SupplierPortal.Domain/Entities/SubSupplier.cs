using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class SubSupplier : SupplyNetworkEntities
{
    public SubSupplier()
    {
        EntityType = Enums.EntityType.SubSupplier;
    }
}
