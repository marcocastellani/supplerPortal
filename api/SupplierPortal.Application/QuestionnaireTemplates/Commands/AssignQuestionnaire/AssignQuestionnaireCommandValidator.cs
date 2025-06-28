using FluentValidation;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;

/// <summary>
/// Validator for AssignQuestionnaireCommand
/// </summary>
public class AssignQuestionnaireCommandValidator : AbstractValidator<AssignQuestionnaireCommand>
{
    public AssignQuestionnaireCommandValidator()
    {
        RuleFor(v => v.TemplateId)
            .NotEmpty().WithMessage("Template ID is required.");

        RuleFor(v => v.DueDate)
            .GreaterThan(DateTime.UtcNow).WithMessage("Due date must be in the future.");

        RuleFor(v => v.Priority)
            .IsInEnum().WithMessage("Priority must be a valid value.");

        RuleFor(v => v.EntityTypeFilter)
            .Must(types => types == null || types.All(t => Enum.IsDefined(typeof(EntityType), t)))
            .WithMessage("All entity types must be valid values.")
            .When(v => v.EntityTypeFilter != null);

        RuleFor(v => v.EntityIds)
            .Must(ids => ids == null || ids.All(id => id != Guid.Empty))
            .WithMessage("All entity IDs must be valid (non-empty) GUIDs.")
            .When(v => v.EntityIds != null);

        RuleFor(v => v.AssignedUserId)
            .NotEqual(Guid.Empty).WithMessage("Assigned User ID must be a valid GUID.")
            .When(v => v.AssignedUserId.HasValue);

        RuleFor(v => v.AssignedAgentId)
            .NotEqual(Guid.Empty).WithMessage("Assigned Agent ID must be a valid GUID.")
            .When(v => v.AssignedAgentId.HasValue);

        RuleFor(v => v.Notes)
            .MaximumLength(1000).WithMessage("Notes must not exceed 1000 characters.")
            .When(v => !string.IsNullOrEmpty(v.Notes));
    }
}