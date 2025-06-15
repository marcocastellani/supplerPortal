using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Response DTO for question condition
/// </summary>
public class QuestionConditionResponse : IMapFrom<QuestionCondition>
{
    public Guid Id { get; set; }
    public Guid TriggerQuestionId { get; set; }
    public Guid TargetQuestionId { get; set; }
    public string ConditionType { get; set; } = string.Empty;
    public string? TriggerValue { get; set; }
    public string Action { get; set; } = string.Empty;
    public string? Description { get; set; }
}
