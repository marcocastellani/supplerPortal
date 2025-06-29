using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

/// <summary>
/// Entity for tracking user role assignments
/// </summary>
public class UserRole : BaseAuditableEntity
{
    /// <summary>
    /// User identifier (email or ID from authentication system)
    /// </summary>
    public string UserId { get; set; } = string.Empty;
    
    /// <summary>
    /// Role name (administrator, supply_chain_operator, etc.)
    /// </summary>
    public string Role { get; set; } = string.Empty;
    
    /// <summary>
    /// Organization ID the role is assigned for
    /// </summary>
    public string OrganizationId { get; set; } = string.Empty;
    
    /// <summary>
    /// Whether the role assignment is active
    /// </summary>
    public bool IsActive { get; set; } = true;
    
    /// <summary>
    /// Date when the role was assigned
    /// </summary>
    public DateTime AssignedDate { get; set; }
    
    /// <summary>
    /// Date when the role expires (null for permanent assignment)
    /// </summary>
    public DateTime? ExpiryDate { get; set; }
    
    /// <summary>
    /// Additional metadata about the role assignment
    /// </summary>
    public string? Metadata { get; set; }
}