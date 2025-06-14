using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public class GetSupplyNetworkEntitiesQueryHandler : IRequestHandler<GetSupplyNetworkEntitiesQuery, GetSupplyNetworkEntitiesQueryResult>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSupplyNetworkEntitiesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetSupplyNetworkEntitiesQueryResult> Handle(GetSupplyNetworkEntitiesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Suppliers
            .Include(s => s.Parent)
            .AsQueryable();

        // Filtri
        if (!string.IsNullOrEmpty(request.SearchTerm))
        {
            var searchLower = request.SearchTerm.ToLower();
            query = query.Where(s => 
                s.LegalName.ToLower().Contains(searchLower) ||
                s.ShortName.ToLower().Contains(searchLower) ||
                s.ExternalCode.ToLower().Contains(searchLower) ||
                s.Email.ToLower().Contains(searchLower));
        }

        if (request.EntityType.HasValue)
        {
            query = query.Where(s => s.EntityType == request.EntityType.Value);
        }

        if (request.AccreditationStatus.HasValue)
        {
            query = query.Where(s => s.AccreditationStatus == request.AccreditationStatus.Value);
        }

        if (request.Active.HasValue)
        {
            query = query.Where(s => s.Active == request.Active.Value);
        }

        if (!string.IsNullOrEmpty(request.Country))
        {
            query = query.Where(s => s.Country == request.Country);
        }

        if (request.Tags != null && request.Tags.Length > 0)
        {
            foreach (var tag in request.Tags)
            {
                query = query.Where(s => s.Tags.Contains(tag));
            }
        }

        // Ordinamento
        query = request.SortBy.ToLower() switch
        {
            "legalname" => request.SortDescending 
                ? query.OrderByDescending(s => s.LegalName)
                : query.OrderBy(s => s.LegalName),
            "externalcode" => request.SortDescending
                ? query.OrderByDescending(s => s.ExternalCode)
                : query.OrderBy(s => s.ExternalCode),
            "entitytype" => request.SortDescending
                ? query.OrderByDescending(s => s.EntityType)
                : query.OrderBy(s => s.EntityType),
            "accreditationstatus" => request.SortDescending
                ? query.OrderByDescending(s => s.AccreditationStatus)
                : query.OrderBy(s => s.AccreditationStatus),
            "created" => request.SortDescending
                ? query.OrderByDescending(s => s.Created)
                : query.OrderBy(s => s.Created),
            "country" => request.SortDescending
                ? query.OrderByDescending(s => s.Country)
                : query.OrderBy(s => s.Country),
            _ => query.OrderBy(s => s.LegalName)
        };

        // Conteggio totale
        var totalCount = await query.CountAsync(cancellationToken);

        // Paginazione
        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ProjectTo<SupplyNetworkEntityDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new GetSupplyNetworkEntitiesQueryResult
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
