using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class QuestionnaireSectionConfiguration : IEntityTypeConfiguration<QuestionnaireSection>
{
    public void Configure(EntityTypeBuilder<QuestionnaireSection> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Title)
            .HasMaxLength(255)
            .IsRequired();
            
        builder.Property(s => s.Description)
            .HasMaxLength(1000);
            
        builder.Property(s => s.Order)
            .IsRequired();
            
        builder.Property(s => s.TranslationsJson)
            .HasColumnType("nvarchar(max)");

        // Relationships
        builder.HasOne(s => s.QuestionnaireTemplate)
            .WithMany(t => t.Sections)
            .HasForeignKey(s => s.QuestionnaireTemplateId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasMany(s => s.Questions)
            .WithOne(q => q.Section)
            .HasForeignKey(q => q.SectionId)
            .OnDelete(DeleteBehavior.SetNull);

        // Indexes
        builder.HasIndex(s => new { s.QuestionnaireTemplateId, s.Order });
    }
}
