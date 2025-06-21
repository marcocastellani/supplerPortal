using MediatR;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;

/// <summary>
/// Command to create a new questionnaire template
/// </summary>
public class CreateQuestionnaireTemplateCommand : IRequest<QuestionnaireTemplateResponse>
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Obsolete("Use TargetEntityTypes instead")]
    public int TargetEntityTypeId { get; set; }

    /// <summary>
    /// List of target entity types for this template (minimum 1 required)
    /// </summary>
    public List<EntityType> TargetEntityTypes { get; set; } = new();

    public string PrimaryLanguage { get; set; } = "en";
    public int ExpirationMonths { get; set; }
    public CertificateType CertificateType { get; set; }
    public List<CreateSectionDto> Sections { get; set; } = new();
}

/// <summary>
/// DTO for creating a section within a template
/// </summary>
public class CreateSectionDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public Dictionary<string, object>? Translations { get; set; }
}
