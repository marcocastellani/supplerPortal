using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetActiveTemplates;

/// <summary>
/// Handler for getting active questionnaire templates (latest versions only)
/// </summary>
public class GetActiveTemplatesQueryHandler : IRequestHandler<GetActiveTemplatesQuery, List<ActiveTemplateResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetActiveTemplatesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ActiveTemplateResponse>> Handle(GetActiveTemplatesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.QuestionnaireTemplates
            .Include(t => t.TargetEntityTypes)
            .Include(t => t.Sections)
                .ThenInclude(s => s.Questions)
            .Where(t => t.Status == TemplateStatus.Active)
            .AsQueryable();

        // Apply search filter if provided
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(t => t.Title.ToLower().Contains(searchTerm) ||
                                    t.Description.ToLower().Contains(searchTerm));
        }

        // Get all active templates
        var activeTemplates = await query.ToListAsync(cancellationToken);

        // Group by base template (assuming templates with same title are versions of each other)
        // In a real implementation, you might have a BaseTemplateId or similar field
        var groupedTemplates = activeTemplates
            .GroupBy(t => t.Title.Split(" - v")[0]) // Assuming version is appended as " - v1.0"
            .Select(g => g.OrderByDescending(t => t.Version).First()) // Get latest version
            .ToList();

        // Map to response
        var response = groupedTemplates.Select(t => new ActiveTemplateResponse
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            Version = t.Version,
            TargetEntityTypes = t.TargetEntityTypes.Select(te => te.EntityType.ToString()).ToList(),
            PrimaryLanguage = t.PrimaryLanguage,
            SupportedLanguages = GetSupportedLanguages(t),
            QuestionCount = t.Sections.Sum(s => s.Questions.Count),
            Created = t.Created,
            LastModified = t.LastModified
        })
        .OrderBy(t => t.Title)
        .ToList();

        return response;
    }

    private List<string> GetSupportedLanguages(Domain.Entities.QuestionnaireTemplate template)
    {
        // Get unique languages from all translations
        var languages = new HashSet<string> { template.PrimaryLanguage };

        // Add languages from sections and questions
        foreach (var section in template.Sections)
        {
            if (section.Translations != null)
            {
                foreach (var lang in section.Translations.Keys)
                {
                    languages.Add(lang);
                }
            }

            foreach (var question in section.Questions)
            {
                if (question.Translations != null)
                {
                    foreach (var lang in question.Translations.Keys)
                    {
                        languages.Add(lang);
                    }
                }
            }
        }

        return languages.OrderBy(l => l).ToList();
    }
}