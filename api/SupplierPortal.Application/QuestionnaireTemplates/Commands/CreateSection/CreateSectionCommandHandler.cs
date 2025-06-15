using MediatR;
using AutoMapper;
using System.Text.Json;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateSection;

/// <summary>
/// Handler for creating a new section in a template
/// </summary>
public class CreateSectionCommandHandler : IRequestHandler<CreateSectionCommand, SectionResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateSectionCommandHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SectionResponse> Handle(CreateSectionCommand request, CancellationToken cancellationToken)
    {
        var section = new QuestionnaireSection
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            Order = request.Order,
            QuestionnaireTemplateId = request.TemplateId,
            TranslationsJson = request.Translations != null
                ? JsonSerializer.Serialize(request.Translations)
                : null
        };

        _context.QuestionnaireSections.Add(section);
        await _context.SaveChangesAsync(cancellationToken);

        var response = _mapper.Map<SectionResponse>(section);
        
        // Parse translations
        if (!string.IsNullOrEmpty(section.TranslationsJson))
        {
            response.Translations = JsonSerializer.Deserialize<Dictionary<string, object>>(section.TranslationsJson);
        }

        return response;
    }
}
