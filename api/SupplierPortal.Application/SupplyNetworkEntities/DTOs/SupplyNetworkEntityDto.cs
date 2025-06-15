using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

/// <summary>
/// DTO for supply network entity responses
/// </summary>
public class SupplyNetworkEntityDto : IMapFrom<Domain.Entities.SupplyNetworkEntities>
{
    public Guid Id { get; set; }
    
    // Identificazione
    public string ExternalCode { get; set; } = string.Empty;
    public EntityType EntityType { get; set; }
    public Guid? ParentId { get; set; }
    public string? ParentName { get; set; }
    
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
    public bool Active { get; set; }
    public AccreditationStatus AccreditationStatus { get; set; }
    public DateTime? AccreditationDate { get; set; }
    public DateTime? DeactivationDate { get; set; }
    
    // Audit
    public DateTime Created { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public string? LastModifiedBy { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.SupplyNetworkEntities, SupplyNetworkEntityDto>()
            .ForMember(d => d.ParentName, opt => opt.MapFrom(s => s.Parent != null ? s.Parent.LegalName : null));

        // Mappatura Command -> Entity per evitare duplicazioni nel handler
        profile.CreateMap<CreateSupplyNetworkEntityCommand, Domain.Entities.SupplyNetworkEntities>()
            .ForMember(d => d.Id, opt => opt.Ignore()) // Generated in handler
            .ForMember(d => d.Parent, opt => opt.Ignore()) // Navigation property
            .ForMember(d => d.Created, opt => opt.Ignore()) // Set in handler
            .ForMember(d => d.CreatedBy, opt => opt.Ignore()) // Set in handler  
            .ForMember(d => d.LastModified, opt => opt.Ignore()) // Set in handler
            .ForMember(d => d.LastModifiedBy, opt => opt.Ignore()); // Set in handler
    }
}
