using Remira.UCP.SupplierPortal.Domain.Common;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class Supplier : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();
    public ICollection<UserSupplier> UserSuppliers { get; set; } = new List<UserSupplier>();
}
