using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using AutoMapper;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Response DTO for template question
/// </summary>
public class QuestionResponse : IMapFrom<TemplateQuestion>
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public bool IsRequired { get; set; }
    public int Order { get; set; }
    public string? HelpText { get; set; }
    public bool AllowDocumentUpload { get; set; }
    public int MaxDocuments { get; set; }
    public bool RequireDocuments { get; set; }
    public object? Configuration { get; set; }
    public Guid QuestionnaireTemplateId { get; set; }
    public Guid? SectionId { get; set; }
    public Dictionary<string, object>? Translations { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<TemplateQuestion, QuestionResponse>()
            .ForMember(dest => dest.Configuration, opt => opt.Ignore()) // Will be handled in handler
            .ForMember(dest => dest.Translations, opt => opt.Ignore()); // Will be handled in handler
    }
}
