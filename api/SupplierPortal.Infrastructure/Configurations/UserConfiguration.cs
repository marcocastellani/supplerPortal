using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        
        builder.Property(u => u.ExternalId)
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(u => u.Email)
            .HasMaxLength(255)
            .IsRequired();
            
        builder.Property(u => u.FirstName)
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(u => u.LastName)
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(u => u.Role)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(u => u.ExternalId)
            .IsUnique();
            
        builder.HasIndex(u => u.Email)
            .IsUnique();
    }
}
