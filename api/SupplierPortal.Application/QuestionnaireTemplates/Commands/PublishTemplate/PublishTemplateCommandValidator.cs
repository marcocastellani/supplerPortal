using FluentValidation;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;

/// <summary>
/// Validator for PublishTemplateCommand
/// </summary>
public class PublishTemplateCommandValidator : AbstractValidator<PublishTemplateCommand>
{
    public PublishTemplateCommandValidator()
    {
        RuleFor(x => x.TemplateId)
            .NotEmpty()
            .WithMessage("Template ID is required.");
    }
}