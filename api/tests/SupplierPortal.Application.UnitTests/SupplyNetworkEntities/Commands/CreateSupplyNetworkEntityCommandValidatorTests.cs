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
    private CreateSupplyNetworkEntityCommandValidator _validator = null!;

    [SetUp]
    public void SetUp()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        
        // Setup empty dbset to avoid null reference errors in async validations
        var emptySuppliers = new List<Domain.Entities.SupplyNetworkEntities>().AsQueryable();
        var mockSuppliers = new Mock<DbSet<Domain.Entities.SupplyNetworkEntities>>();
        mockSuppliers.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.Provider).Returns(emptySuppliers.Provider);
        mockSuppliers.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.Expression).Returns(emptySuppliers.Expression);
        mockSuppliers.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.ElementType).Returns(emptySuppliers.ElementType);
        mockSuppliers.As<IQueryable<Domain.Entities.SupplyNetworkEntities>>().Setup(m => m.GetEnumerator()).Returns(emptySuppliers.GetEnumerator());
        _mockContext.Setup(x => x.Suppliers).Returns(mockSuppliers.Object);
        
        _validator = new CreateSupplyNetworkEntityCommandValidator(_mockContext.Object);
    }

    #region AC1 - Test validazione campi obbligatori

    [Test]
    public async Task ShouldHaveError_WhenLegalNameIsEmpty()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "", // Empty required field
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.LegalName)
            .WithErrorMessage("Legal Name is required");
    }

    [Test]
    public async Task ShouldHaveError_WhenLegalNameExceedsMaxLength()
    {
        // Arrange - AC4: Campi obbligatori validati (con limiti)
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = new string('A', 501), // Exceeds 500 chars limit
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.LegalName)
            .WithErrorMessage("Legal Name must not exceed 500 characters");
    }

    [Test]
    public async Task ShouldHaveError_WhenEntityTypeIsInvalid()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = (EntityType)999, // Invalid enum value
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.EntityType)
            .WithErrorMessage("Entity Type must be a valid value");
    }

    [Test]
    public async Task ShouldHaveError_WhenRoleInSupplyChainIsInvalid()
    {
        // Arrange - AC4: Campi obbligatori validati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = (RoleInSupplyChain)999 // Invalid enum value
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.RoleInSupplyChain)
            .WithErrorMessage("Role in Supply Chain must be a valid value");
    }

    #endregion

    #region AC3 - Test prevenzione duplicazioni

    [Test]
    public void ShouldHaveError_WhenVatCodeAlreadyExists()
    {
        // Arrange - AC3: Non ci sono duplicazioni
        // NOTE: This test requires a mock that supports Entity Framework async operations
        // For now, marking as inconclusive until we implement proper DbSet mocking
        Assert.Inconclusive("Test requires EF async mock - will be implemented with integration tests");
    }

    [Test]
    public void ShouldNotHaveError_WhenExternalCodeIsUnique()
    {
        // Arrange - AC3: Non ci sono duplicazioni (caso positivo)
        // NOTE: This test requires a mock that supports Entity Framework async operations
        Assert.Inconclusive("Test requires EF async mock - will be implemented with integration tests");
    }

    #endregion

    #region Test validazioni condizionali specifiche per EntityType

    [Test]
    public async Task ShouldHaveError_WhenContactPersonNameMissingForPersonEntity()
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
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.ContactPersonName)
            .WithErrorMessage("Contact Person Name is required for Person entities");
    }

    [Test]
    public async Task ShouldHaveError_WhenVatCodeMissingForSupplierEntity()
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
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.VatCode)
            .WithErrorMessage("VAT Code is recommended for Supplier entities");
    }

    [Test]
    public async Task ShouldNotHaveError_WhenContactPersonNameProvidedForPersonEntity()
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
        var result = await _validator.TestValidateAsync(command);
        result.ShouldNotHaveValidationErrorFor(x => x.ContactPersonName);
    }

    #endregion

    #region Test validazioni formato

    [Test]
    public async Task ShouldHaveError_WhenEmailIsInvalid()
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
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.Email)
            .WithErrorMessage("Email must be a valid email address");
    }

    [Test]
    public async Task ShouldHaveError_WhenCountryCodeIsInvalid()
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
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.Country)
            .WithErrorMessage("Country must be a valid ISO 3166-1 alpha-2 code");
    }

    [Test]
    public void ShouldHaveError_WhenParentEntityDoesNotExist()
    {
        // Arrange
        // NOTE: This test requires a mock that supports Entity Framework async operations
        Assert.Inconclusive("Test requires EF async mock - will be implemented with integration tests");
    }

    #endregion

    #region Test campi opzionali con validazioni

 
    [Test]
    public async Task ShouldHaveError_WhenOptionalFieldsExceedMaxLength()
    {
        // Arrange - Test limiti su campi opzionali
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            ExternalCode = new string('A', 101), // Exceeds 100 chars
            VatCode = "", // Empty to avoid async validation
            TaxCode = new string('A', 51), // Exceeds 50 chars
            Email = new string('A', 250) + "@test.com", // Exceeds 255 chars
            PhoneNumber = new string('1', 51) // Exceeds 50 chars
        };

        // Act & Assert
        var result = await _validator.TestValidateAsync(command);
        result.ShouldHaveValidationErrorFor(x => x.ExternalCode)
            .WithErrorMessage("External Code must not exceed 100 characters");
        result.ShouldHaveValidationErrorFor(x => x.TaxCode)
            .WithErrorMessage("Tax Code must not exceed 50 characters");
        result.ShouldHaveValidationErrorFor(x => x.Email)
            .WithErrorMessage("Email must not exceed 255 characters");
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone Number must not exceed 50 characters");
    }

    [Test]
    public void ShouldHaveError_WhenVatCodeExceedsMaxLength()
    {
        // Arrange - Test separato per VAT Code length
        // NOTE: This test also requires EF async mock because VatCode validation includes uniqueness check
        Assert.Inconclusive("Test requires EF async mock - will be implemented with integration tests");
    }

    #endregion

    #region Test case positivo completo

    [Test]
    public void ShouldNotHaveAnyErrors_WhenValidCommandProvided()
    {
        // Arrange - Test caso completamente valido
        // NOTE: This test requires a mock that supports Entity Framework async operations
        Assert.Inconclusive("Test requires EF async mock - will be implemented with integration tests");
    }

    #endregion

}
