using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class QuestionnaireTemplateConfiguration : IEntityTypeConfiguration<QuestionnaireTemplate>
{
    public void Configure(EntityTypeBuilder<QuestionnaireTemplate> builder)
    {
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Title)
            .HasMaxLength(255)
            .IsRequired();
            
        builder.Property(t => t.Description)
            .HasMaxLength(1000);
            
        builder.Property(t => t.PrimaryLanguage)
            .HasMaxLength(10)
            .IsRequired();
            
        builder.Property(t => t.Version)
            .HasMaxLength(50)
            .IsRequired();
            
        builder.Property(t => t.CertificateType)
            .HasConversion<int>()
            .IsRequired();
            
        builder.Property(t => t.Status)
            .HasConversion<int>()
            .IsRequired();
            
        builder.Property(t => t.ExpirationMonths)
            .IsRequired();
            
        builder.Property(t => t.TargetEntityTypeId)
            .IsRequired();

        // Relationships
        builder.HasMany(t => t.Sections)
            .WithOne(s => s.QuestionnaireTemplate)
            .HasForeignKey(s => s.QuestionnaireTemplateId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasMany(t => t.Questions)
            .WithOne(q => q.QuestionnaireTemplate)
            .HasForeignKey(q => q.QuestionnaireTemplateId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasMany(t => t.QuestionnaireInstances)
            .WithOne(q => q.Template)
            .HasForeignKey(q => q.TemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(t => t.Status);
        builder.HasIndex(t => t.Created);
        builder.HasIndex(t => new { t.Title, t.Status });
    }
}
