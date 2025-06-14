using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class SupplyNetworkEntitiesConfiguration : IEntityTypeConfiguration<SupplyNetworkEntities>
{
    public void Configure(EntityTypeBuilder<SupplyNetworkEntities> builder)
    {
        builder.HasKey(s => s.Id);
        
        // Identificazione
        builder.Property(s => s.ExternalCode)
            .HasMaxLength(100)
            .IsRequired(false);
            
        builder.Property(s => s.EntityType)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();
        
        // Denominazione
        builder.Property(s => s.LegalName)
            .HasMaxLength(500)
            .IsRequired();
            
        builder.Property(s => s.ShortName)
            .HasMaxLength(255)
            .IsRequired(false);
        
        // Dati fiscali
        builder.Property(s => s.VatCode)
            .HasMaxLength(50)
            .IsRequired(false);
            
        builder.Property(s => s.TaxCode)
            .HasMaxLength(50)
            .IsRequired(false);
        
        // Indirizzo
        builder.Property(s => s.Country)
            .HasMaxLength(2) // ISO alpha-2
            .IsRequired(false);
            
        builder.Property(s => s.Region)
            .HasMaxLength(255)
            .IsRequired(false);
            
        builder.Property(s => s.City)
            .HasMaxLength(255)
            .IsRequired(false);
            
        builder.Property(s => s.Address)
            .HasMaxLength(1000)
            .IsRequired(false);
            
        builder.Property(s => s.ZipCode)
            .HasMaxLength(20)
            .IsRequired(false);
        
        // Contatti
        builder.Property(s => s.Email)
            .HasMaxLength(255)
            .IsRequired(false);
            
        builder.Property(s => s.PhoneNumber)
            .HasMaxLength(50)
            .IsRequired(false);
            
        builder.Property(s => s.ContactPersonName)
            .HasMaxLength(255)
            .IsRequired(false);
        
        // Supply Chain
        builder.Property(s => s.RoleInSupplyChain)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();
            
        builder.Property(s => s.Tags)
            .HasConversion(
                v => string.Join(';', v),
                v => v.Split(';', StringSplitOptions.RemoveEmptyEntries))
            .HasMaxLength(2000)
            .IsRequired(false);
        
        // Stato
        builder.Property(s => s.AccreditationStatus)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();

        // Indici
        builder.HasIndex(s => s.ExternalCode);
        builder.HasIndex(s => s.LegalName);
        builder.HasIndex(s => s.VatCode);
        builder.HasIndex(s => s.AccreditationStatus);
        builder.HasIndex(s => s.EntityType);
        
        // Backward compatibility - manteniamo gli indici esistenti
        builder.HasIndex(s => s.LegalName)
            .HasDatabaseName("IX_Suppliers_Name");
            
        // Self-referencing relationship
        builder.HasOne(s => s.Parent)
            .WithMany(s => s.Children)
            .HasForeignKey(s => s.ParentId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
