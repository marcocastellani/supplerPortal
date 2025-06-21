using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using AutoMapper;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Response DTO for questionnaire template
/// </summary>
public class QuestionnaireTemplateResponse : IMapFrom<QuestionnaireTemplate>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Obsolete("Use TargetEntityTypes instead")]
    public int TargetEntityTypeId { get; set; }

    /// <summary>
    /// List of target entity types for this template
    /// </summary>
    public List<EntityType> TargetEntityTypes { get; set; } = new();

    public string PrimaryLanguage { get; set; } = string.Empty;
    public int ExpirationMonths { get; set; }
    public CertificateType CertificateType { get; set; }
    public TemplateStatus Status { get; set; }
    public string Version { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastModified { get; set; }
    public string? CreatedBy { get; set; }

    public List<SectionResponse> Sections { get; set; } = new();
    public List<QuestionResponse> Questions { get; set; } = new();
    public List<QuestionConditionResponse> Conditions { get; set; } = new();

    public void Mapping(Profile profile)
    {
        profile.CreateMap<QuestionnaireTemplate, QuestionnaireTemplateResponse>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.TargetEntityTypes, opt => opt.MapFrom(src => src.TargetEntityTypes.Select(te => te.EntityType).ToList()));
    }
}
