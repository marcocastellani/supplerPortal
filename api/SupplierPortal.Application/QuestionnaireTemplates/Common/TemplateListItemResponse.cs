using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Lightweight response DTO for template listing (without full details)
/// </summary>
public class TemplateListItemResponse : IMapFrom<QuestionnaireTemplate>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// List of target entity types for this template
    /// </summary>
    public List<EntityType> TargetEntityTypes { get; set; } = new();

    public string PrimaryLanguage { get; set; } = string.Empty;
    public CertificateType CertificateType { get; set; }
    public TemplateStatus Status { get; set; }
    public string Version { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastModified { get; set; }
    public string? CreatedBy { get; set; }

    /// <summary>
    /// Number of questionnaire instances created from this template
    /// </summary>
    public int UsageCount { get; set; }

    /// <summary>
    /// Number of sections in this template
    /// </summary>
    public int SectionCount { get; set; }

    /// <summary>
    /// Number of questions in this template
    /// </summary>
    public int QuestionCount { get; set; }
}