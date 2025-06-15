using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateSection;

/// <summary>
/// Command to create a new section in a template
/// </summary>
public class CreateSectionCommand : IRequest<SectionResponse>
{
    public Guid TemplateId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public Dictionary<string, object>? Translations { get; set; }
}
