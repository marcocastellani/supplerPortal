using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class QuestionnaireConfiguration : IEntityTypeConfiguration<Questionnaire>
{
    public void Configure(EntityTypeBuilder<Questionnaire> builder)
    {
        builder.HasKey(q => q.Id);
        
        builder.Property(q => q.Title)
            .HasMaxLength(255)
            .IsRequired();
            
        builder.Property(q => q.Description)
            .HasMaxLength(1000);
            
        builder.Property(q => q.Type)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(q => q.Status)
            .HasConversion<string>();

        // Relationships
        builder.HasOne(q => q.Supplier)
            .WithMany(s => s.Questionnaires)
            .HasForeignKey(q => q.SupplierId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(q => q.AssignedUser)
            .WithMany()
            .HasForeignKey(q => q.AssignedUserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(q => q.AssignedAgent)
            .WithMany()
            .HasForeignKey(q => q.AssignedAgentId)
            .OnDelete(DeleteBehavior.NoAction);

        // Indexes for performance
        builder.HasIndex(q => q.DueDate);
        builder.HasIndex(q => q.Status);
        builder.HasIndex(q => q.SupplierId);
    }
}
