using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;

public class GetSupplyNetworkEntityByIdQueryHandler : IRequestHandler<GetSupplyNetworkEntityByIdQuery, SupplyNetworkEntityDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSupplyNetworkEntityByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SupplyNetworkEntityDto?> Handle(GetSupplyNetworkEntityByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.SupplyNetworkEntities
            .Include(s => s.Parent)
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

        return entity == null ? null : _mapper.Map<SupplyNetworkEntityDto>(entity);
    }
}
