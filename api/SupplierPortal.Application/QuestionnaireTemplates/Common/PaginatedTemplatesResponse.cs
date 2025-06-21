using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Paginated response for questionnaire templates listing with metadata
/// </summary>
public class PaginatedTemplatesResponse
{
    /// <summary>
    /// List of templates for the current page
    /// </summary>
    public IList<QuestionnaireTemplateResponse> Templates { get; set; } = new List<QuestionnaireTemplateResponse>();

    /// <summary>
    /// Total number of templates matching the filter criteria
    /// </summary>
    public int TotalCount { get; set; }

    /// <summary>
    /// Current page number (1-based)
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// Number of items per page
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total number of pages
    /// </summary>
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

    /// <summary>
    /// Whether there is a previous page
    /// </summary>
    public bool HasPreviousPage => Page > 1;

    /// <summary>
    /// Whether there is a next page
    /// </summary>
    public bool HasNextPage => Page < TotalPages;

    /// <summary>
    /// Applied search term (if any)
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// Applied status filter (if any)
    /// </summary>
    public TemplateStatus? StatusFilter { get; set; }

    /// <summary>
    /// Applied language filter (if any)
    /// </summary>
    public string? LanguageFilter { get; set; }

    /// <summary>
    /// Applied sorting field
    /// </summary>
    public string? SortBy { get; set; }

    /// <summary>
    /// Applied sorting direction
    /// </summary>
    public string? SortDirection { get; set; }
}