using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class AgentAssignmentConfiguration : IEntityTypeConfiguration<AgentAssignment>
{
    public void Configure(EntityTypeBuilder<AgentAssignment> builder)
    {
        builder.HasKey(aa => aa.Id);
        
        // Relationships
        builder.HasOne(aa => aa.Agent)
            .WithMany()
            .HasForeignKey(aa => aa.AgentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(aa => aa.User)
            .WithMany(u => u.AgentAssignments)
            .HasForeignKey(aa => aa.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Unique constraint to prevent duplicate assignments
        builder.HasIndex(aa => new { aa.AgentId, aa.UserId })
            .IsUnique();
    }
}
