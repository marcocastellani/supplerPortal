using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplate;

/// <summary>
/// Query to get a questionnaire template by ID
/// </summary>
public class GetQuestionnaireTemplateQuery : IRequest<QuestionnaireTemplateResponse>
{
    public Guid Id { get; set; }

    public GetQuestionnaireTemplateQuery(Guid id)
    {
        Id = id;
    }
}
