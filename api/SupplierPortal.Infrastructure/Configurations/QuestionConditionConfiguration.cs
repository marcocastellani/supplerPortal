using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Infrastructure.Configurations;

public class QuestionConditionConfiguration : IEntityTypeConfiguration<QuestionCondition>
{
    public void Configure(EntityTypeBuilder<QuestionCondition> builder)
    {
        builder.HasKey(c => c.Id);
        
        builder.Property(c => c.ConditionType)
            .HasMaxLength(50)
            .IsRequired();
            
        builder.Property(c => c.TriggerValue)
            .HasMaxLength(1000);
            
        builder.Property(c => c.Action)
            .HasMaxLength(20)
            .IsRequired();
            
        builder.Property(c => c.Description)
            .HasMaxLength(500);

        // Relationships
        builder.HasOne(c => c.TriggerQuestion)
            .WithMany(q => q.TriggeredConditions)
            .HasForeignKey(c => c.TriggerQuestionId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasOne(c => c.TargetQuestion)
            .WithMany(q => q.TargetConditions)
            .HasForeignKey(c => c.TargetQuestionId)
            .OnDelete(DeleteBehavior.NoAction); // Prevent circular cascade

        // Indexes
        builder.HasIndex(c => c.TriggerQuestionId);
        builder.HasIndex(c => c.TargetQuestionId);
        builder.HasIndex(c => c.ConditionType);
    }
}
