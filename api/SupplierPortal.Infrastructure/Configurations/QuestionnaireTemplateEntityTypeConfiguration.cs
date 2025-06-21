using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class QuestionnaireTemplateEntityTypeConfiguration : IEntityTypeConfiguration<QuestionnaireTemplateEntityType>
{
    public void Configure(EntityTypeBuilder<QuestionnaireTemplateEntityType> builder)
    {
        builder.HasKey(te => te.Id);

        builder.Property(te => te.EntityType)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(te => te.QuestionnaireTemplateId)
            .IsRequired();

        // Unique constraint on (TemplateId, EntityType) combination
        builder.HasIndex(te => new { te.QuestionnaireTemplateId, te.EntityType })
            .IsUnique()
            .HasDatabaseName("IX_QuestionnaireTemplateEntityType_Template_EntityType");

        // Relationship with QuestionnaireTemplate
        builder.HasOne(te => te.QuestionnaireTemplate)
            .WithMany(t => t.TargetEntityTypes)
            .HasForeignKey(te => te.QuestionnaireTemplateId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}