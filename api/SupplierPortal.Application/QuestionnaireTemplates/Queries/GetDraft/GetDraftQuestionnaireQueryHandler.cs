using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Text.Json;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetDraft;

/// <summary>
/// Handler for getting a draft questionnaire template by ID
/// </summary>
public class GetDraftQuestionnaireQueryHandler : IRequestHandler<GetDraftQuestionnaireQuery, QuestionnaireTemplateResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetDraftQuestionnaireQueryHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<QuestionnaireTemplateResponse> Handle(GetDraftQuestionnaireQuery request, CancellationToken cancellationToken)
    {
        var template = await _context.QuestionnaireTemplates
            .Where(t => t.Id == request.Id && t.Status == TemplateStatus.Draft)
            .FirstOrDefaultAsync(cancellationToken);

        if (template == null)
        {
            throw new InvalidOperationException($"Draft template with ID {request.Id} not found.");
        }

        // Map template to response
        var response = _mapper.Map<QuestionnaireTemplateResponse>(template);

        // Load and map sections
        var sections = await _context.QuestionnaireSections
            .Where(s => s.QuestionnaireTemplateId == template.Id)
            .OrderBy(s => s.Order)
            .ToListAsync(cancellationToken);

        response.Sections = _mapper.Map<List<SectionResponse>>(sections);

        // Parse section translations
        foreach (var section in response.Sections)
        {
            var sectionEntity = sections.First(s => s.Id == section.Id);
            if (!string.IsNullOrEmpty(sectionEntity.TranslationsJson))
            {
                section.Translations = JsonSerializer.Deserialize<Dictionary<string, object>>(sectionEntity.TranslationsJson);
            }
        }

        // Load and map questions
        var questions = await _context.TemplateQuestions
            .Where(q => q.QuestionnaireTemplateId == template.Id)
            .OrderBy(q => q.Order)
            .ToListAsync(cancellationToken);

        response.Questions = _mapper.Map<List<QuestionResponse>>(questions);

        // Parse question configurations and translations
        foreach (var question in response.Questions)
        {
            var questionEntity = questions.First(q => q.Id == question.Id);

            if (!string.IsNullOrEmpty(questionEntity.ConfigurationJson))
            {
                question.Configuration = JsonSerializer.Deserialize<object>(questionEntity.ConfigurationJson);
            }

            if (!string.IsNullOrEmpty(questionEntity.TranslationsJson))
            {
                question.Translations = JsonSerializer.Deserialize<Dictionary<string, object>>(questionEntity.TranslationsJson);
            }
        }

        // Load and map conditions (fix LINQ translation issue)
        var questionIds = questions.Select(q => q.Id).ToList();
        var conditions = await _context.QuestionConditions
            .Where(c => questionIds.Contains(c.TriggerQuestionId) || questionIds.Contains(c.TargetQuestionId))
            .ToListAsync(cancellationToken);

        response.Conditions = _mapper.Map<List<QuestionConditionResponse>>(conditions);

        return response;
    }
}
