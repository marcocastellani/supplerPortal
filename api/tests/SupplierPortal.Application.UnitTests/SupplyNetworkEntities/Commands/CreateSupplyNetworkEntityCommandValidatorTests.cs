using FluentAssertions;
using FluentValidation.TestHelper;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.SupplyNetworkEntities.Commands;

[TestFixture]
public class CreateSupplyNetworkEntityCommandValidatorTests
{
    private Mock<IApplicationDbContext> _mockContext = null!;
    private Mock<DbSet<Domain.Entities.SupplyNetworkEntities>> _mockDbSet = null!;
    private CreateSupplyNetworkEntityCommandValidator _validator = null!;

    [SetUp]
    public void SetUp()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockDbSet = new Mock<DbSet<Domain.Entities.SupplyNetworkEntities>>();
        _mockContext.Setup(x => x.Suppliers).Returns(_mockDbSet.Object);
        _validator = new CreateSupplyNetworkEntityCommandValidator(_mockContext.Object);
    }

    #region AC1 - Test validazione campi obbligatori

    [Test]
    public void ShouldHaveError_WhenLegalNameIsEmpty()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "", // Empty required field
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.LegalName)
            .WithErrorMessage("Legal Name is required");
    }

    [Test]
    public void ShouldHaveError_WhenLegalNameExceedsMaxLength()
    {
        // Arrange - AC4: Campi obbligatori validati (con limiti)
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = new string('A', 501), // Exceeds 500 chars limit
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.LegalName)
            .WithErrorMessage("Legal Name must not exceed 500 characters");
    }

    [Test]
    public void ShouldHaveError_WhenEntityTypeIsInvalid()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = (EntityType)999, // Invalid enum value
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.EntityType)
            .WithErrorMessage("Entity Type must be a valid value");
    }

    [Test]
    public void ShouldHaveError_WhenRoleInSupplyChainIsInvalid()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = (RoleInSupplyChain)999 // Invalid enum value
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.RoleInSupplyChain)
            .WithErrorMessage("Role in Supply Chain must be a valid value");
    }

    #endregion

    #region AC3 - Test prevenzione duplicazioni


    [Test]
    public async Task ShouldHaveError_WhenVatCodeAlreadyExists()
    {
        // Arrange - AC3: Non ci sono duplicazioni
        var existingEntities = new List<Domain.Entities.SupplyNetworkEntities>
        {
            new() { Id = Guid.NewGuid(), VatCode = "IT12345678901" }
        }.AsQueryable();

        SetupDbSetQueryable(_mockDbSet, existingEntities);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            VatCode = "IT12345678901"
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.VatCode)
            .WithErrorMessage("VAT Code must be unique");
    }

    [Test]
    public async Task ShouldNotHaveError_WhenExternalCodeIsUnique()
    {
        // Arrange - AC3: Non ci sono duplicazioni (caso positivo)
        var emptyEntities = new List<Domain.Entities.SupplyNetworkEntities>().AsQueryable();
        SetupDbSetQueryable(_mockDbSet, emptyEntities);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            ExternalCode = "UNIQUE001"
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldNotHaveValidationErrorFor(x => x.ExternalCode);
    }

    #endregion

    #region Test validazioni condizionali specifiche per EntityType

    [Test]
    public void ShouldHaveError_WhenContactPersonNameMissingForPersonEntity()
    {
        // Arrange - Regole condizionali: Person deve avere ContactPersonName
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "John Doe",
            EntityType = EntityType.Person, // Person type
            RoleInSupplyChain = RoleInSupplyChain.ContactPerson,
            ContactPersonName = "" // Missing for Person
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.ContactPersonName)
            .WithErrorMessage("Contact Person Name is required for Person entities");
    }

    [Test]
    public void ShouldHaveError_WhenVatCodeMissingForSupplierEntity()
    {
        // Arrange - Regole condizionali: Supplier dovrebbe avere VatCode
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Supplier Company",
            EntityType = EntityType.Supplier, // Supplier type
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            VatCode = "" // Missing for Supplier
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.VatCode)
            .WithErrorMessage("VAT Code is recommended for Supplier entities");
    }

    [Test]
    public void ShouldNotHaveError_WhenContactPersonNameProvidedForPersonEntity()
    {
        // Arrange - Caso positivo per Person
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "John Doe",
            EntityType = EntityType.Person,
            RoleInSupplyChain = RoleInSupplyChain.ContactPerson,
            ContactPersonName = "John Doe" // Provided for Person
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.ContactPersonName);
    }

    #endregion

    #region Test validazioni formato

    [Test]
    public void ShouldHaveError_WhenEmailIsInvalid()
    {
        // Arrange
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Email = "invalid-email" // Invalid email format
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.Email)
            .WithErrorMessage("Email must be a valid email address");
    }

    [Test]
    public void ShouldHaveError_WhenCountryCodeIsInvalid()
    {
        // Arrange
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "USA" // Should be 2 chars (US)
        };

        // Act & Assert
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.Country)
            .WithErrorMessage("Country must be a valid ISO 3166-1 alpha-2 code");
    }

    [Test]
    public async Task ShouldHaveError_WhenParentEntityDoesNotExist()
    {
        // Arrange
        var emptyEntities = new List<Domain.Entities.SupplyNetworkEntities>().AsQueryable();
        SetupDbSetQueryable(_mockDbSet, emptyEntities);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Sub Entity",
            EntityType = EntityType.Site,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            ParentId = Guid.NewGuid() // Non-existent parent
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.ParentId)
            .WithErrorMessage("Parent entity does not exist");
    }

    #endregion

    #region Test campi opzionali con validazioni

 
    [Test]
    public async Task ShouldHaveError_WhenOptionalFieldsExceedMaxLength()
    {
        // Arrange - Test limiti su campi opzionali
        var emptyEntities = new List<Domain.Entities.SupplyNetworkEntities>().AsQueryable();
        SetupDbSetQueryable(_mockDbSet, emptyEntities);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            ExternalCode = new string('A', 101), // Exceeds 100 chars
            VatCode = new string('A', 51), // Exceeds 50 chars
            TaxCode = new string('A', 51), // Exceeds 50 chars
            Email = new string('A', 250) + "@test.com", // Exceeds 255 chars
            PhoneNumber = new string('1', 51) // Exceeds 50 chars
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.ExternalCode)
            .WithErrorMessage("External Code must not exceed 100 characters");
        result.ShouldHaveValidationErrorFor(x => x.VatCode)
            .WithErrorMessage("VAT Code must not exceed 50 characters");
        result.ShouldHaveValidationErrorFor(x => x.TaxCode)
            .WithErrorMessage("Tax Code must not exceed 50 characters");
        result.ShouldHaveValidationErrorFor(x => x.Email)
            .WithErrorMessage("Email must not exceed 255 characters");
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone Number must not exceed 50 characters");
    }

    #endregion

    #region Test case positivo completo

    [Test]
    public async Task ShouldNotHaveAnyErrors_WhenValidCommandProvided()
    {
        // Arrange - Test caso completamente valido
        var emptyEntities = new List<Domain.Entities.SupplyNetworkEntities>().AsQueryable();
        SetupDbSetQueryable(_mockDbSet, emptyEntities);

        var command = new CreateSupplyNetworkEntityCommand
        {
            // Required fields
            LegalName = "Valid Supplier Ltd",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            
            // Optional fields with valid values
            ExternalCode = "VALID001",
            ShortName = "Valid Supplier",
            VatCode = "IT12345678901",
            TaxCode = "ITTAX001",
            Country = "IT", // Valid ISO code
            Region = "Lombardy",
            City = "Milan",
            Address = "Via Roma 1",
            ZipCode = "20100",
            Email = "contact@validsupplier.com", // Valid email
            PhoneNumber = "+39-02-1234567",
            ContactPersonName = "Mario Rossi",
            Active = true,
            AccreditationStatus = AccreditationStatus.Approved
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldNotHaveAnyValidationErrors();
    }

    #endregion

    private static void SetupDbSetQueryable(Mock<DbSet<Domain.Entities.SupplyNetworkEntities>> mockSet, IQueryable<Domain.Entities.SupplyNetworkEntities> data)
    {
        mockSet.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.Provider).Returns(data.Provider);
        mockSet.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.Expression).Returns(data.Expression);
        mockSet.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.ElementType).Returns(data.ElementType);
        mockSet.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
    }
}
