using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplates;

/// <summary>
/// Handler for getting questionnaire templates with search, filtering, pagination and sorting
/// </summary>
public class GetQuestionnaireTemplatesQueryHandler : IRequestHandler<GetQuestionnaireTemplatesQuery, PaginatedTemplatesResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetQuestionnaireTemplatesQueryHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedTemplatesResponse> Handle(GetQuestionnaireTemplatesQuery request, CancellationToken cancellationToken)
    {
        // Validate query parameters [IV]
        if (!request.IsValid(out string errorMessage))
        {
            throw new ArgumentException(errorMessage);
        }

        // Start with base query including related data for mapping
        var query = _context.QuestionnaireTemplates
            .Include(t => t.TargetEntityTypes)
            .AsQueryable();

        // Apply search filter [SF]
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.Trim().ToLowerInvariant();
            query = query.Where(t => t.Title.ToLower().Contains(searchTerm) ||
                                   t.Description.ToLower().Contains(searchTerm));
        }

        // Apply status filter
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }

        // Apply language filter
        if (!string.IsNullOrWhiteSpace(request.Language))
        {
            query = query.Where(t => t.PrimaryLanguage == request.Language);
        }

        // Apply date range filters [REH]
        if (request.CreatedFrom.HasValue)
        {
            query = query.Where(t => t.Created >= request.CreatedFrom.Value);
        }

        if (request.CreatedTo.HasValue)
        {
            query = query.Where(t => t.Created <= request.CreatedTo.Value);
        }

        // Apply sorting [DRY]
        query = ApplySorting(query, request.SortBy, request.SortDirection);

        // Get total count before pagination
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination
        var skip = (request.Page - 1) * request.PageSize;
        var paginatedQuery = query
            .Skip(skip)
            .Take(request.PageSize);

        // Execute query and get templates
        var templates = await paginatedQuery.ToListAsync(cancellationToken);

        // Map to list items and calculate usage counts in batches for performance [PA]
        var templateIds = templates.Select(t => t.Id).ToList();

        // Get usage counts (number of questionnaire instances per template)
        var usageCounts = await _context.Questionnaires
            .Where(q => q.TemplateId.HasValue && templateIds.Contains(q.TemplateId.Value))
            .GroupBy(q => q.TemplateId!.Value)
            .Select(g => new { TemplateId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TemplateId, x => x.Count, cancellationToken);

        // Get section counts
        var sectionCounts = await _context.QuestionnaireSections
            .Where(s => templateIds.Contains(s.QuestionnaireTemplateId))
            .GroupBy(s => s.QuestionnaireTemplateId)
            .Select(g => new { TemplateId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TemplateId, x => x.Count, cancellationToken);

        // Get question counts
        var questionCounts = await _context.TemplateQuestions
            .Where(q => templateIds.Contains(q.QuestionnaireTemplateId))
            .GroupBy(q => q.QuestionnaireTemplateId)
            .Select(g => new { TemplateId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.TemplateId, x => x.Count, cancellationToken);

        // Map templates to response DTOs
        var templateResponses = templates.Select(template =>
        {
            var response = _mapper.Map<QuestionnaireTemplateResponse>(template);

            // Don't load full sections, questions, and conditions for listing - performance optimization [PA]
            response.Sections = new List<SectionResponse>();
            response.Questions = new List<QuestionResponse>();
            response.Conditions = new List<QuestionConditionResponse>();

            return response;
        }).ToList();

        // Create response with metadata [CDiP]
        var response = new PaginatedTemplatesResponse
        {
            Templates = templateResponses,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize,
            SearchTerm = request.SearchTerm,
            StatusFilter = request.Status,
            LanguageFilter = request.Language,
            SortBy = request.SortBy,
            SortDirection = request.SortDirection
        };

        return response;
    }

    /// <summary>
    /// Applies sorting to the query based on the sort field and direction [DRY]
    /// </summary>
    private static IQueryable<Domain.Entities.QuestionnaireTemplate> ApplySorting(
        IQueryable<Domain.Entities.QuestionnaireTemplate> query,
        string? sortBy,
        string? sortDirection)
    {
        var isDescending = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);

        return sortBy?.ToLowerInvariant() switch
        {
            "title" => isDescending
                ? query.OrderByDescending(t => t.Title)
                : query.OrderBy(t => t.Title),

            "created" => isDescending
                ? query.OrderByDescending(t => t.Created)
                : query.OrderBy(t => t.Created),

            "lastmodified" => isDescending
                ? query.OrderByDescending(t => t.LastModified ?? t.Created)
                : query.OrderBy(t => t.LastModified ?? t.Created),

            "status" => isDescending
                ? query.OrderByDescending(t => t.Status)
                : query.OrderBy(t => t.Status),

            "usagecount" => isDescending
                ? query.OrderByDescending(t => t.QuestionnaireInstances.Count())
                : query.OrderBy(t => t.QuestionnaireInstances.Count()),

            // Default sort by title
            _ => query.OrderBy(t => t.Title)
        };
    }
}