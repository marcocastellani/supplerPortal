using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class UserSupplier : BaseAuditableEntity
{
    public Guid UserId { get; set; }
    public Guid SupplierId { get; set; }
    
    // Navigation properties
    public User User { get; set; } = null!;
    public SupplyNetworkEntities Supplier { get; set; } = null!;
}
