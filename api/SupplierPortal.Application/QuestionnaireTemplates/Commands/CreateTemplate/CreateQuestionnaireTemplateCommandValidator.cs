using FluentValidation;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;

/// <summary>
/// Validator for CreateQuestionnaireTemplateCommand
/// </summary>
public class CreateQuestionnaireTemplateCommandValidator : AbstractValidator<CreateQuestionnaireTemplateCommand>
{
    public CreateQuestionnaireTemplateCommandValidator()
    {
        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .MaximumLength(1000).WithMessage("Description must not exceed 1000 characters.");

        RuleFor(v => v.TargetEntityTypes)
            .NotEmpty().WithMessage("At least one target entity type must be selected.")
            .Must(types => types.Count > 0).WithMessage("At least one target entity type must be selected.")
            .Must(types => types.All(t => Enum.IsDefined(typeof(EntityType), t)))
            .WithMessage("All selected entity types must be valid.");

        RuleFor(v => v.PrimaryLanguage)
            .NotEmpty().WithMessage("Primary language is required.")
            .Must(lang => new[] { "en", "de", "it", "fr", "es" }.Contains(lang))
            .WithMessage("Primary language must be a supported language code.");

        RuleFor(v => v.ExpirationMonths)
            .GreaterThan(0).WithMessage("Expiration months must be greater than 0.")
            .LessThanOrEqualTo(60).WithMessage("Expiration months must not exceed 60 months.");

        RuleFor(v => v.CertificateType)
            .IsInEnum().WithMessage("Certificate type must be a valid value.");
    }
}