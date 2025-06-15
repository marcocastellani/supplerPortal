using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using AutoMapper;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Response DTO for questionnaire section
/// </summary>
public class SectionResponse : IMapFrom<QuestionnaireSection>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public Guid QuestionnaireTemplateId { get; set; }
    public Dictionary<string, object>? Translations { get; set; }
    
    public List<QuestionResponse> Questions { get; set; } = new();

    public void Mapping(Profile profile)
    {
        profile.CreateMap<QuestionnaireSection, SectionResponse>()
            .ForMember(dest => dest.Translations, opt => opt.Ignore()); // Will be handled in handler
    }
}
