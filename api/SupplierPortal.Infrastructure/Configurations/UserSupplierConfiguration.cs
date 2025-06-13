using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class UserSupplierConfiguration : IEntityTypeConfiguration<UserSupplier>
{
    public void Configure(EntityTypeBuilder<UserSupplier> builder)
    {
        builder.HasKey(us => us.Id);
        
        // Relationships
        builder.HasOne(us => us.User)
            .WithMany(u => u.UserSuppliers)
            .HasForeignKey(us => us.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(us => us.Supplier)
            .WithMany(s => s.UserSuppliers)
            .HasForeignKey(us => us.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique constraint to prevent duplicate assignments
        builder.HasIndex(us => new { us.UserId, us.SupplierId })
            .IsUnique();
    }
}
