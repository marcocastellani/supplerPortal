using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetActiveTemplates;

/// <summary>
/// Query to get only the latest versions of active questionnaire templates
/// </summary>
public class GetActiveTemplatesQuery : IRequest<List<ActiveTemplateResponse>>
{
    /// <summary>
    /// Optional search term to filter templates by title
    /// </summary>
    public string? SearchTerm { get; set; }
}

/// <summary>
/// Response for active template with metadata
/// </summary>
public class ActiveTemplateResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public List<string> TargetEntityTypes { get; set; } = new();
    public string PrimaryLanguage { get; set; } = string.Empty;
    public List<string> SupportedLanguages { get; set; } = new();
    public int QuestionCount { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastModified { get; set; }
}