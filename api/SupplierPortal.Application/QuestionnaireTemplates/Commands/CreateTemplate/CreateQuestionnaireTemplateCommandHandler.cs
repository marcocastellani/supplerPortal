using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Text.Json;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;

/// <summary>
/// Handler for creating a new questionnaire template
/// </summary>
public class CreateQuestionnaireTemplateCommandHandler : IRequestHandler<CreateQuestionnaireTemplateCommand, QuestionnaireTemplateResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;

    public CreateQuestionnaireTemplateCommandHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService,
        IDateTime dateTime)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
        _dateTime = dateTime;
    }

    public async Task<QuestionnaireTemplateResponse> Handle(CreateQuestionnaireTemplateCommand request, CancellationToken cancellationToken)
    {
        // Create the main template entity
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            TargetEntityTypeId = request.TargetEntityTypeId,
            PrimaryLanguage = request.PrimaryLanguage,
            ExpirationMonths = request.ExpirationMonths,
            CertificateType = request.CertificateType,
            Status = TemplateStatus.Draft,
            Version = "1.0"
        };

        _context.QuestionnaireTemplates.Add(template);

        // Create sections if provided
        foreach (var sectionDto in request.Sections)
        {
            var section = new QuestionnaireSection
            {
                Id = Guid.NewGuid(),
                Title = sectionDto.Title,
                Description = sectionDto.Description,
                Order = sectionDto.Order,
                QuestionnaireTemplateId = template.Id,
                TranslationsJson = sectionDto.Translations != null 
                    ? JsonSerializer.Serialize(sectionDto.Translations) 
                    : null
            };

            _context.QuestionnaireSections.Add(section);
        }

        await _context.SaveChangesAsync(cancellationToken);

        // Map to response
        var response = _mapper.Map<QuestionnaireTemplateResponse>(template);
        
        // Load and map sections
        var sections = await _context.QuestionnaireSections
            .Where(s => s.QuestionnaireTemplateId == template.Id)
            .OrderBy(s => s.Order)
            .ToListAsync(cancellationToken);

        response.Sections = _mapper.Map<List<SectionResponse>>(sections);

        // Parse translations for sections
        foreach (var section in response.Sections)
        {
            var sectionEntity = sections.First(s => s.Id == section.Id);
            if (!string.IsNullOrEmpty(sectionEntity.TranslationsJson))
            {
                section.Translations = JsonSerializer.Deserialize<Dictionary<string, object>>(sectionEntity.TranslationsJson);
            }
        }

        return response;
    }
}
