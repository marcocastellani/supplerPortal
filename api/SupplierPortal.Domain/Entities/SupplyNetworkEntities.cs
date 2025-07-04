using Remira.UCP.SupplierPortal.Domain.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Domain.Entities;

public class SupplyNetworkEntities : BaseAuditableEntity
{
    // Identificazione
    public string ExternalCode { get; set; } = string.Empty;
    public EntityType EntityType { get; set; }
    public Guid? ParentId { get; set; }
    
    // Denominazione
    public string LegalName { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    
    // Dati fiscali
    public string VatCode { get; set; } = string.Empty;
    public string TaxCode { get; set; } = string.Empty;
    
    // Indirizzo
    public string Country { get; set; } = string.Empty; // ISO 3166-1 alpha-2
    public string Region { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string ZipCode { get; set; } = string.Empty;
    
    // Contatti
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string ContactPersonName { get; set; } = string.Empty;
    
    // Supply Chain
    public RoleInSupplyChain RoleInSupplyChain { get; set; }
    public string[] Tags { get; set; } = Array.Empty<string>();
    
    // Stato
    public bool Active { get; set; } = true;
    public AccreditationStatus AccreditationStatus { get; set; } = AccreditationStatus.Draft;
    public DateTime? AccreditationDate { get; set; }
    public DateTime? DeactivationDate { get; set; }
    
    // Backward compatibility properties (deprecati ma mantenuti per non rompere il DB)
    [Obsolete("Use LegalName instead")]
    public string Name => LegalName;
    
    [Obsolete("Use ExternalCode instead")]
    public string Code => ExternalCode;
    
    [Obsolete("Use Active instead")]
    public bool IsActive => Active;
    
    // Navigation properties
    public SupplyNetworkEntities? Parent { get; set; }
    public ICollection<SupplyNetworkEntities> Children { get; set; } = new List<SupplyNetworkEntities>();
    public ICollection<Questionnaire> Questionnaires { get; set; } = new List<Questionnaire>();
    public ICollection<UserSupplier> UserSuppliers { get; set; } = new List<UserSupplier>();
}
