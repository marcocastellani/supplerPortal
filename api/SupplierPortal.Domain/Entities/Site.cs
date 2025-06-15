using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class Site : SupplyNetworkEntities
{
    public Site()
    {
        EntityType = Enums.EntityType.Site;
    }
}
