using MediatR;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;

/// <summary>
/// Command to publish a questionnaire template (make it available for use)
/// </summary>
public class PublishTemplateCommand : IRequest<Unit>
{
    public Guid TemplateId { get; set; }
}