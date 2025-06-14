using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class SupplyNetworkEntitiesConfiguration : IEntityTypeConfiguration<SupplyNetworkEntities>
{
    public void Configure(EntityTypeBuilder<SupplyNetworkEntities> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Name)
            .HasMaxLength(255)
            .IsRequired();
            
        builder.Property(s => s.Code)
            .HasMaxLength(50)
            .IsRequired();
            
        builder.Property(s => s.Email)
            .HasMaxLength(255)
            .IsRequired();

        builder.HasIndex(s => s.Code)
            .IsUnique();
    }
}
