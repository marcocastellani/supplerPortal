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
            .Include(t => t.Sections)
                .ThenInclude(s => s.Questions)
            .Where(t => t.Status == TemplateStatus.Active)
            .AsQueryable();

        // Get all active templates
        var activeTemplates = await query.ToListAsync(cancellationToken);

        // Group by BaseTemplateId to get template families
        // Templates without BaseTemplateId are considered their own base
        var templateGroups = activeTemplates
            .GroupBy(t => t.BaseTemplateId ?? t.Id)
            .ToList();

        // Get the latest version from each group
        var latestTemplates = templateGroups
            .Select(group => group.OrderByDescending(t => t.Version).ThenByDescending(t => t.Created).First())
            .ToList();

        // Map to response
        var response = latestTemplates.Select(t => new ActiveTemplateResponse
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description ?? string.Empty,
            Version = t.Version.ToString("F1"),
            TargetEntityTypes = t.EntityTypes.Select(et => et.ToString()).ToList(),
            PrimaryLanguage = string.Empty, // TODO: Add to entity if needed
            SupportedLanguages = new List<string>(), // TODO: Add language support
            QuestionCount = t.Sections?.Sum(s => s.Questions?.Count ?? 0) ?? 0,
            Created = t.Created,
            LastModified = t.LastModified
        })
        .OrderBy(t => t.Title)
        .ToList();

        return response;
    }
}