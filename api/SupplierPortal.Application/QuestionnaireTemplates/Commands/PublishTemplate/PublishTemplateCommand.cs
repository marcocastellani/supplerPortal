using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;

/// <summary>
/// Command to publish/activate a questionnaire template
/// </summary>
public class PublishTemplateCommand : IRequest<QuestionnaireTemplateResponse>
{
    /// <summary>
    /// ID of the template to publish
    /// </summary>
    public Guid TemplateId { get; set; }

    public PublishTemplateCommand(Guid templateId)
    {
        TemplateId = templateId;
    }
}