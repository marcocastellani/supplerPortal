using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public class SearchSupplyNetworkEntitiesQueryHandler : IRequestHandler<SearchSupplyNetworkEntitiesQuery, List<SupplyNetworkEntitySearchResultDto>>
{
    private readonly IApplicationDbContext _context;

    public SearchSupplyNetworkEntitiesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<SupplyNetworkEntitySearchResultDto>> Handle(SearchSupplyNetworkEntitiesQuery request, CancellationToken cancellationToken)
    {
        // Validate minimum search term length
        if (string.IsNullOrWhiteSpace(request.SearchTerm) || request.SearchTerm.Trim().Length < 3)
        {
            return new List<SupplyNetworkEntitySearchResultDto>();
        }

        var searchTerm = request.SearchTerm.Trim().ToLower();

        var query = _context.Suppliers.AsQueryable();

        // Filter by active status
        if (request.ActiveOnly)
        {
            query = query.Where(e => e.Active);
        }

        // Filter by entity type
        if (request.EntityType.HasValue)
        {
            query = query.Where(e => e.EntityType == request.EntityType.Value);
        }

        // Multi-field search with case-insensitive matching
        query = query.Where(e => 
            (e.LegalName != null && e.LegalName.ToLower().Contains(searchTerm)) ||
            (e.ExternalCode != null && e.ExternalCode.ToLower().Contains(searchTerm)) ||
            (e.ShortName != null && e.ShortName.ToLower().Contains(searchTerm)) ||
            (e.VatCode != null && e.VatCode.ToLower().Contains(searchTerm)) ||
            (e.Email != null && e.Email.ToLower().Contains(searchTerm)) ||
            (e.ContactPersonName != null && e.ContactPersonName.ToLower().Contains(searchTerm)) ||
            (e.City != null && e.City.ToLower().Contains(searchTerm)) ||
            (e.Country != null && e.Country.ToLower().Contains(searchTerm))
        );

        // Order alphabetically by primary name
        query = query.OrderBy(e => e.LegalName);

        // Limit results
        query = query.Take(request.MaxResults);

        // Project to search result DTO
        var results = await query
            .Select(e => new SupplyNetworkEntitySearchResultDto
            {
                Id = e.Id,
                LegalName = e.LegalName,
                ExternalCode = e.ExternalCode,
                ShortName = e.ShortName,
                EntityType = e.EntityType.ToString(),
                VatCode = e.VatCode,
                Email = e.Email,
                ContactPersonName = e.ContactPersonName,
                City = e.City,
                Country = e.Country
            })
            .ToListAsync(cancellationToken);

        return results ?? new List<SupplyNetworkEntitySearchResultDto>();
    }
}
