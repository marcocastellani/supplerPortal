using MediatR;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Queries.GetTemplates;

/// <summary>
/// Query to get questionnaire templates with search, filtering, pagination and sorting
/// </summary>
public class GetQuestionnaireTemplatesQuery : IRequest<PaginatedTemplatesResponse>
{
    /// <summary>
    /// Search term to filter templates by title (server-side filtering)
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// Filter by template status
    /// </summary>
    public TemplateStatus? Status { get; set; }

    /// <summary>
    /// Filter by primary language
    /// </summary>
    public string? Language { get; set; }

    /// <summary>
    /// Filter by creation date from
    /// </summary>
    public DateTime? CreatedFrom { get; set; }

    /// <summary>
    /// Filter by creation date to
    /// </summary>
    public DateTime? CreatedTo { get; set; }

    /// <summary>
    /// Page number (1-based)
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Number of items per page (1-100)
    /// </summary>
    public int PageSize { get; set; } = 10;

    /// <summary>
    /// Field to sort by
    /// </summary>
    public string? SortBy { get; set; }

    /// <summary>
    /// Sort direction (asc/desc)
    /// </summary>
    public string? SortDirection { get; set; } = "asc";

    /// <summary>
    /// Valid sort fields
    /// </summary>
    public static readonly string[] ValidSortFields =
    {
        "title",
        "created",
        "lastmodified",
        "usagecount",
        "status"
    };

    /// <summary>
    /// Validates the query parameters
    /// </summary>
    public bool IsValid(out string errorMessage)
    {
        errorMessage = string.Empty;

        if (Page < 1)
        {
            errorMessage = "Page must be greater than 0";
            return false;
        }

        if (PageSize < 1 || PageSize > 100)
        {
            errorMessage = "PageSize must be between 1 and 100";
            return false;
        }

        if (!string.IsNullOrEmpty(SortBy) && !ValidSortFields.Contains(SortBy.ToLowerInvariant()))
        {
            errorMessage = $"Invalid sort field. Valid fields are: {string.Join(", ", ValidSortFields)}";
            return false;
        }

        if (!string.IsNullOrEmpty(SortDirection) &&
            !SortDirection.Equals("asc", StringComparison.OrdinalIgnoreCase) &&
            !SortDirection.Equals("desc", StringComparison.OrdinalIgnoreCase))
        {
            errorMessage = "Sort direction must be 'asc' or 'desc'";
            return false;
        }

        if (CreatedFrom.HasValue && CreatedTo.HasValue && CreatedFrom > CreatedTo)
        {
            errorMessage = "CreatedFrom must be earlier than CreatedTo";
            return false;
        }

        return true;
    }
}