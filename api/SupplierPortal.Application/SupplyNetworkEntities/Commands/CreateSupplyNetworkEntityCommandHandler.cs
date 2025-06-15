using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

public class CreateSupplyNetworkEntityCommandHandler : IRequestHandler<CreateSupplyNetworkEntityCommand, SupplyNetworkEntityDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;

    public CreateSupplyNetworkEntityCommandHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService,
        IDateTime dateTime)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
        _dateTime = dateTime;
    }

    public async Task<SupplyNetworkEntityDto> Handle(CreateSupplyNetworkEntityCommand request, CancellationToken cancellationToken)
    {
        // Validazione duplicati
   
        if (!string.IsNullOrEmpty(request.VatCode))
        {
            var existingByVat = await _context.SupplyNetworkEntities
                .FirstOrDefaultAsync(s => s.VatCode == request.VatCode, cancellationToken);
            
            if (existingByVat != null)
                throw new InvalidOperationException($"An entity with VAT Code '{request.VatCode}' already exists.");
        }

        // Validazione Parent Entity se specificata
        if (request.ParentId.HasValue)
        {
            var parentExists = await _context.SupplyNetworkEntities
                .AnyAsync(s => s.Id == request.ParentId.Value, cancellationToken);
            
            if (!parentExists)
                throw new InvalidOperationException($"Parent entity with ID '{request.ParentId.Value}' does not exist.");
        }

        // Creazione entità
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            Id = Guid.NewGuid(),
            ExternalCode = request.ExternalCode,
            EntityType = request.EntityType,
            ParentId = request.ParentId,
            LegalName = request.LegalName,
            ShortName = request.ShortName,
            VatCode = request.VatCode,
            TaxCode = request.TaxCode,
            Country = request.Country,
            Region = request.Region,
            City = request.City,
            Address = request.Address,
            ZipCode = request.ZipCode,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            ContactPersonName = request.ContactPersonName,
            RoleInSupplyChain = request.RoleInSupplyChain,
            Tags = request.Tags,
            Active = request.Active,
            AccreditationStatus = request.AccreditationStatus,
            AccreditationDate = request.AccreditationDate ?? (request.AccreditationStatus == Domain.Enums.AccreditationStatus.Approved ? _dateTime.Now : null)
            // Created e CreatedBy sono gestiti dall'AuditableEntitySaveChangesInterceptor
        };

        _context.SupplyNetworkEntities.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        // Recupero l'entità con le relazioni per il mapping
        var createdEntity = await _context.SupplyNetworkEntities
            .Include(s => s.Parent)
            .FirstOrDefaultAsync(s => s.Id == entity.Id, cancellationToken);

        return _mapper.Map<SupplyNetworkEntityDto>(createdEntity);
    }
}
