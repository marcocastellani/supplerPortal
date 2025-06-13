using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class User : BaseAuditableEntity
{
    public string ExternalId { get; set; } = string.Empty; // Keycloak user ID
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // User, Agent, Supplier, Supervisor, Admin
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public ICollection<UserSupplier> UserSuppliers { get; set; } = new List<UserSupplier>();
    public ICollection<AgentAssignment> AgentAssignments { get; set; } = new List<AgentAssignment>();
}
