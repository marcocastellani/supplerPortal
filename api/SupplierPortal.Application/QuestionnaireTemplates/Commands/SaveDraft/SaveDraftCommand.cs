using MediatR;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.SaveDraft;

/// <summary>
/// Command to save template draft (auto-save functionality)
/// </summary>
public class SaveDraftCommand : IRequest<Unit>
{
    public Guid TemplateId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? ExpirationMonths { get; set; }
    public CertificateType? CertificateType { get; set; }
    public List<UpdateSectionDto>? Sections { get; set; }
    public List<UpdateQuestionDto>? Questions { get; set; }
}

/// <summary>
/// DTO for updating a section
/// </summary>
public class UpdateSectionDto
{
    public Guid? Id { get; set; } // Null for new sections
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public Dictionary<string, object>? Translations { get; set; }
    public bool IsDeleted { get; set; } = false;
}

/// <summary>
/// DTO for updating a question
/// </summary>
public class UpdateQuestionDto
{
    public Guid? Id { get; set; } // Null for new questions
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public bool IsRequired { get; set; } = true;
    public int Order { get; set; }
    public string? HelpText { get; set; }
    public bool AllowDocumentUpload { get; set; } = false;
    public int MaxDocuments { get; set; } = 5;
    public bool RequireDocuments { get; set; } = false;
    public object? Configuration { get; set; }
    public Guid? SectionId { get; set; }
    public Dictionary<string, object>? Translations { get; set; }
    public bool IsDeleted { get; set; } = false;
}
