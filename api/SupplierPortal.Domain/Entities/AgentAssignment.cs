using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class AgentAssignment : BaseAuditableEntity
{
    public Guid AgentId { get; set; }
    public Guid UserId { get; set; }
    
    // Navigation properties
    public User Agent { get; set; } = null!;
    public User User { get; set; } = null!;
}
