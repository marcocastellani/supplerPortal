using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;

public class CreateSupplyNetworkEntityCommandValidator : AbstractValidator<CreateSupplyNetworkEntityCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateSupplyNetworkEntityCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(x => x.LegalName)
            .NotEmpty()
            .WithMessage("Legal Name is required")
            .MaximumLength(500)
            .WithMessage("Legal Name must not exceed 500 characters");

        RuleFor(x => x.EntityType)
            .IsInEnum()
            .WithMessage("Entity Type must be a valid value");

        RuleFor(x => x.RoleInSupplyChain)
            .IsInEnum()
            .WithMessage("Role in Supply Chain must be a valid value");

        RuleFor(x => x.ExternalCode)
            .MaximumLength(100)
            .WithMessage("External Code must not exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.ExternalCode));

        RuleFor(x => x.VatCode)
            .MaximumLength(50)
            .WithMessage("VAT Code must not exceed 50 characters")
            .MustAsync(BeUniqueVatCode)
            .WithMessage("VAT Code must be unique")
            .When(x => !string.IsNullOrEmpty(x.VatCode));

        RuleFor(x => x.TaxCode)
            .MaximumLength(50)
            .WithMessage("Tax Code must not exceed 50 characters");

        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email must be a valid email address")
            .MaximumLength(255)
            .WithMessage("Email must not exceed 255 characters")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Country)
            .Length(2)
            .WithMessage("Country must be a valid ISO 3166-1 alpha-2 code")
            .When(x => !string.IsNullOrEmpty(x.Country));

        RuleFor(x => x.PhoneNumber)
            .MaximumLength(50)
            .WithMessage("Phone Number must not exceed 50 characters");

        RuleFor(x => x.ParentId)
            .MustAsync(ParentEntityExists)
            .WithMessage("Parent entity does not exist")
            .When(x => x.ParentId.HasValue);

        // Regole condizionali basate su EntityType
        RuleFor(x => x.ContactPersonName)
            .NotEmpty()
            .WithMessage("Contact Person Name is required for Person entities")
            .When(x => x.EntityType == EntityType.Person);

        RuleFor(x => x.VatCode)
            .NotEmpty()
            .WithMessage("VAT Code is recommended for Supplier entities")
            .When(x => x.EntityType == EntityType.Supplier);
    }
 

    private async Task<bool> BeUniqueVatCode(string vatCode, CancellationToken cancellationToken)
    {
        return !await _context.Suppliers
            .AnyAsync(s => s.VatCode == vatCode, cancellationToken);
    }

    private async Task<bool> ParentEntityExists(Guid? parentId, CancellationToken cancellationToken)
    {
        if (!parentId.HasValue) return true;
        
        return await _context.Suppliers
            .AnyAsync(s => s.Id == parentId.Value, cancellationToken);
    }
}
