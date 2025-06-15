using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

/// <summary>
/// Handler for getting child entities of a parent entity
/// </summary>
public class GetSupplyNetworkEntityChildrenQueryHandler 
    : IRequestHandler<GetSupplyNetworkEntityChildrenQuery, List<SupplyNetworkEntityDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<GetSupplyNetworkEntityChildrenQueryHandler> _logger;

    public GetSupplyNetworkEntityChildrenQueryHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ILogger<GetSupplyNetworkEntityChildrenQueryHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<List<SupplyNetworkEntityDto>> Handle(
        GetSupplyNetworkEntityChildrenQuery request,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting children for parent entity {ParentId}", request.ParentId);

        var query = _context.SupplyNetworkEntities
            .Where(e => e.ParentId == request.ParentId);

        // Apply active filter if specified
        if (request.ActiveOnly == true)
        {
            query = query.Where(e => e.Active);
        }

        // Apply entity type filter if specified
        if (request.EntityType.HasValue)
        {
            query = query.Where(e => e.EntityType == request.EntityType.Value);
        }

        var entities = await query
            .OrderBy(e => e.LegalName)
            .ToListAsync(cancellationToken);

        _logger.LogInformation("Found {Count} children for parent entity {ParentId}", 
            entities.Count, request.ParentId);

        return _mapper.Map<List<SupplyNetworkEntityDto>>(entities);
    }
}
