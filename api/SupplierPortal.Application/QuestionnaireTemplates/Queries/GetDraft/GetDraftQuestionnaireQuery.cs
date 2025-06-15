using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetDraft;

/// <summary>
/// Query to get a draft questionnaire template by ID
/// </summary>
public class GetDraftQuestionnaireQuery : IRequest<QuestionnaireTemplateResponse>
{
    public Guid Id { get; set; }

    public GetDraftQuestionnaireQuery(Guid id)
    {
        Id = id;
    }
}
