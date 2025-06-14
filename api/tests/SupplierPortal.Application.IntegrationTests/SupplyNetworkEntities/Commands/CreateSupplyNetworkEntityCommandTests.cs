using FluentAssertions;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.Utilities.Errors.Exceptions;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.SupplyNetworkEntities.Commands;

using static Testing;

[TestFixture]
public class CreateSupplyNetworkEntityCommandTests : BaseTestFixture
{
    [Test]
    public async Task ShouldCreateSupplyNetworkEntity_WhenValidDataProvided()
    {
        // Arrange
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Test Supplier Ltd",
            ShortName = "Test Supplier",
            ExternalCode = "TEST001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Region = "California",
            City = "San Francisco",
            Address = "123 Test Street",
            ZipCode = "94102",
            Email = "test@supplier.com",
            PhoneNumber = "+1-555-123-4567",
            ContactPersonName = "John Doe",
            VatCode = "VAT123456",
            TaxCode = "TAX123456",
            Active = true,
            Tags = new[] { "tech", "automotive" }
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().NotBeEmpty();
        result.LegalName.Should().Be(command.LegalName);
        result.ShortName.Should().Be(command.ShortName);
        result.ExternalCode.Should().Be(command.ExternalCode);
        result.EntityType.Should().Be(command.EntityType);
        result.RoleInSupplyChain.Should().Be(command.RoleInSupplyChain);
        result.AccreditationStatus.Should().Be(command.AccreditationStatus);
        result.Country.Should().Be(command.Country);
        result.Email.Should().Be(command.Email);
        result.Active.Should().Be(command.Active);
        result.Tags.Should().BeEquivalentTo(command.Tags);

        // Verify entity is actually saved in database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity.Should().NotBeNull();
        entity!.LegalName.Should().Be(command.LegalName);
        entity.ExternalCode.Should().Be(command.ExternalCode);
    }

    [Test]
    public async Task ShouldCreateSubEntity_WhenValidParentProvided()
    {
        // Arrange - Create parent entity first
        var parentEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Parent Company",
            ShortName = "Parent Co",
            ExternalCode = "PARENT001",
            EntityType = EntityType.CompanyGroup,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Region = "California",
            City = "Los Angeles",
            Address = "456 Parent Ave",
            ZipCode = "90210",
            Email = "parent@company.com",
            PhoneNumber = "+1-555-987-6543",
            ContactPersonName = "Jane Smith",
            VatCode = "PARVAT001",
            TaxCode = "PARTAX001",
            Active = true,
            Tags = Array.Empty<string>()
        };

        await AddAsync(parentEntity);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Sub Entity Ltd",
            ShortName = "Sub Entity",
            ExternalCode = "SUB001",
            EntityType = EntityType.Site,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Region = "California",
            City = "San Diego",
            Address = "789 Sub Street",
            ZipCode = "92101",
            Email = "sub@entity.com",
            PhoneNumber = "+1-555-456-7890",
            ContactPersonName = "Bob Johnson",
            VatCode = "SUBVAT001",
            TaxCode = "SUBTAX001",
            Active = true,
            Tags = new[] { "manufacturing" },
            ParentId = parentEntity.Id
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.ParentId.Should().Be(parentEntity.Id);
        
        // Verify entity is actually saved in database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity.Should().NotBeNull();
        entity!.ParentId.Should().Be(parentEntity.Id);
    }

    [Test]
    public async Task ShouldThrowException_WhenDuplicateExternalCodeProvided()
    {
        // Arrange - Create entity with external code first
        var existingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Existing Supplier",
            ShortName = "Existing",
            ExternalCode = "DUPLICATE001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Region = "Texas",
            City = "Dallas",
            Address = "100 Existing St",
            ZipCode = "75201",
            Email = "existing@supplier.com",
            PhoneNumber = "+1-555-111-2222",
            ContactPersonName = "Existing Person",
            VatCode = "EXVAT001",
            TaxCode = "EXTAX001",
            Active = true,
            Tags = Array.Empty<string>()
        };

        await AddAsync(existingEntity);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "New Supplier Ltd",
            ShortName = "New Supplier",
            ExternalCode = "DUPLICATE001", // Same as existing
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Tannery,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Email = "new@supplier.com",
            Active = true
        };

        // Act & Assert - Should fail due to validation
        await FluentActions.Invoking(() => SendAsync(command))
            .Should().ThrowAsync<CustomValidationException>();
    }

    [Test]
    public async Task ShouldThrowException_WhenDuplicateVatCodeProvided()
    {
        // Arrange - Create entity with VAT code first
        var existingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Existing VAT Supplier",
            ShortName = "VAT Existing",
            ExternalCode = "VAT001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "IT",
            Region = "Lombardy",
            City = "Milan",
            Address = "Via Roma 1",
            ZipCode = "20100",
            Email = "vat@supplier.com",
            PhoneNumber = "+39-02-1234567",
            ContactPersonName = "Giuseppe Rossi",
            VatCode = "IT12345678901",
            TaxCode = "ITTAX001",
            Active = true,
            Tags = Array.Empty<string>()
        };

        await AddAsync(existingEntity);

        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "New VAT Supplier Ltd",
            ShortName = "New VAT Supplier",
            ExternalCode = "NEWVAT001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Tannery,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "IT",
            Email = "newvat@supplier.com",
            VatCode = "IT12345678901", // Same as existing
            Active = true
        };

        // Act & Assert - Should fail due to validation
        await FluentActions.Invoking(() => SendAsync(command))
            .Should().ThrowAsync<CustomValidationException>();
    }

    [Test]
    public async Task ShouldCreateEntity_WhenOptionalFieldsAreEmpty()
    {
        // Arrange - Minimal required fields only
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Minimal Supplier",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Draft,
            Country = "DE", // Must be exactly 2 chars
            VatCode = "DE123456789", // Required for Supplier
            Active = true
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.LegalName.Should().Be(command.LegalName);
        result.EntityType.Should().Be(command.EntityType);
        result.RoleInSupplyChain.Should().Be(command.RoleInSupplyChain);
        result.AccreditationStatus.Should().Be(command.AccreditationStatus);
        result.Country.Should().Be(command.Country);
        result.Active.Should().Be(command.Active);
        
        // Optional fields should be null or empty
        result.ExternalCode.Should().BeNullOrEmpty();
        result.Email.Should().BeNullOrEmpty();
        result.Tags.Should().BeEmpty();
        
        // But VatCode should be present (required for Supplier)
        result.VatCode.Should().Be("DE123456789");
    }

    [Test]
    public async Task ShouldThrowException_WhenInvalidParentEntityIdProvided()
    {
        // Arrange
        var nonExistentParentId = Guid.NewGuid();
        
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Invalid Parent Child",
            EntityType = EntityType.Site,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Draft,
            Country = "US",
            VatCode = "US987654321", // Add required VAT code  
            Active = true,
            ParentId = nonExistentParentId
        };

        // Act & Assert - Should fail due to validation  
        await FluentActions.Invoking(() => SendAsync(command))
            .Should().ThrowAsync<CustomValidationException>();
    }
}
