using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class Person : SupplyNetworkEntities
{
    public Person()
    {
        EntityType = Enums.EntityType.Person;
    }
}
