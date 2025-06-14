using MediatR;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

public class CreateSupplyNetworkEntityCommand : IRequest<SupplyNetworkEntityDto>
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
    public string Country { get; set; } = string.Empty;
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
    public AccreditationStatus AccreditationStatus { get; set; } = AccreditationStatus.Approved; // Inserimento manuale = già approvato
    public DateTime? AccreditationDate { get; set; }
}
