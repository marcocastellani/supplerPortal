using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class TemplateQuestionConfiguration : IEntityTypeConfiguration<TemplateQuestion>
{
    public void Configure(EntityTypeBuilder<TemplateQuestion> builder)
    {
        builder.HasKey(q => q.Id);
        
        builder.Property(q => q.Text)
            .HasMaxLength(1000)
            .IsRequired();
            
        builder.Property(q => q.Type)
            .HasConversion<int>()
            .IsRequired();
            
        builder.Property(q => q.HelpText)
            .HasMaxLength(2000);
            
        builder.Property(q => q.Order)
            .IsRequired();
            
        builder.Property(q => q.IsRequired)
            .IsRequired();
            
        builder.Property(q => q.AllowDocumentUpload)
            .IsRequired();
            
        builder.Property(q => q.MaxDocuments)
            .IsRequired();
            
        builder.Property(q => q.RequireDocuments)
            .IsRequired();
            
        builder.Property(q => q.ConfigurationJson)
            .HasColumnType("nvarchar(max)");
            
        builder.Property(q => q.TranslationsJson)
            .HasColumnType("nvarchar(max)");

        // Relationships
        builder.HasOne(q => q.QuestionnaireTemplate)
            .WithMany(t => t.Questions)
            .HasForeignKey(q => q.QuestionnaireTemplateId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasOne(q => q.Section)
            .WithMany(s => s.Questions)
            .HasForeignKey(q => q.SectionId)
            .OnDelete(DeleteBehavior.SetNull);
            
        builder.HasMany(q => q.TriggeredConditions)
            .WithOne(c => c.TriggerQuestion)
            .HasForeignKey(c => c.TriggerQuestionId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasMany(q => q.TargetConditions)
            .WithOne(c => c.TargetQuestion)
            .HasForeignKey(c => c.TargetQuestionId)
            .OnDelete(DeleteBehavior.NoAction); // Prevent circular cascade

        // Indexes
        builder.HasIndex(q => new { q.QuestionnaireTemplateId, q.Order });
        builder.HasIndex(q => new { q.SectionId, q.Order });
        builder.HasIndex(q => q.Type);
    }
}
