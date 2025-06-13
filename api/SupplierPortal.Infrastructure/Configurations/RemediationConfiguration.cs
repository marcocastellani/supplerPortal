using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class RemediationConfiguration : IEntityTypeConfiguration<Remediation>
{
    public void Configure(EntityTypeBuilder<Remediation> builder)
    {
        builder.HasKey(r => r.Id);
        
        builder.Property(r => r.Description)
            .HasMaxLength(1000)
            .IsRequired();
            
        builder.Property(r => r.Notes)
            .HasMaxLength(2000);

        builder.Property(r => r.Status)
            .HasConversion<string>();

        // Relationships
        builder.HasOne(r => r.Questionnaire)
            .WithMany(q => q.Remediations)
            .HasForeignKey(r => r.QuestionnaireId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(r => r.ResponsibleUser)
            .WithMany()
            .HasForeignKey(r => r.ResponsibleUserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(r => r.ResponsibleAgent)
            .WithMany()
            .HasForeignKey(r => r.ResponsibleAgentId)
            .OnDelete(DeleteBehavior.NoAction);

        // Indexes for performance
        builder.HasIndex(r => r.DueDate);
        builder.HasIndex(r => r.Status);
        builder.HasIndex(r => r.QuestionnaireId);
    }
}
