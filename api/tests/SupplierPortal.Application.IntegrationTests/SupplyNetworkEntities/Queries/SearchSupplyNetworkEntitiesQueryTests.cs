using FluentAssertions;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.SupplyNetworkEntities.Queries;

using static Testing;

[TestFixture]
public class SearchSupplyNetworkEntitiesQueryTests : BaseTestFixture
{
    [Test]
    public async Task ShouldReturnSearchResults_WhenSearchTermMatchesLegalName()
    {
        // Arrange - Create test entities
        var matchingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Advanced Manufacturing Solutions",
            ShortName = "AMS",
            ExternalCode = "AMS001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Region = "California",
            City = "San Francisco",
            Address = "123 Industrial Ave",
            ZipCode = "94102",
            Email = "info@advanced-manufacturing.com",
            PhoneNumber = "+1-555-123-4567",
            ContactPersonName = "John Smith",
            VatCode = "VAT001",
            TaxCode = "TAX001",
            Active = true,
            Tags = new[] { "manufacturing", "automotive" }
        };

        var nonMatchingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Different Company Ltd",
            ShortName = "DCL",
            ExternalCode = "DCL001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Tannery,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "UK",
            Region = "London",
            City = "London",
            Address = "456 Business St",
            ZipCode = "SW1A 1AA",
            Email = "info@different-company.co.uk",
            PhoneNumber = "+44-20-1234-5678",
            ContactPersonName = "Jane Doe",
            VatCode = "GB123456789",
            TaxCode = "UKTAX001",
            Active = true,
            Tags = new[] { "textiles" }
        };

        await AddAsync(matchingEntity);
        await AddAsync(nonMatchingEntity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "Advanced Manufacturing",
            MaxResults = 15
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().LegalName.Should().Be("Advanced Manufacturing Solutions");
        result.First().DisplayText.Should().Contain("Advanced Manufacturing Solutions");
    }

    [Test]
    public async Task ShouldReturnSearchResults_WhenSearchTermMatchesExternalCode()
    {
        // Arrange
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Company",
            ShortName = "TC",
            ExternalCode = "UNIQUE123",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "DE",
            Region = "Bavaria",
            City = "Munich",
            Address = "Teststrasse 1",
            ZipCode = "80331",
            Email = "test@company.de",
            PhoneNumber = "+49-89-123-4567",
            ContactPersonName = "Hans Mueller",
            VatCode = "DE123456789",
            TaxCode = "DETAX001",
            Active = true,
            Tags = Array.Empty<string>()
        };

        await AddAsync(entity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "UNIQUE123",
            MaxResults = 15
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().ExternalCode.Should().Be("UNIQUE123");
        result.First().DisplayText.Should().Contain("UNIQUE123");
    }

    [Test]
    public async Task ShouldReturnSearchResults_WhenSearchTermMatchesEmail()
    {
        // Arrange
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Email Test Company",
            ShortName = "ETC",
            ExternalCode = "ETC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "FR",
            Region = "Île-de-France",
            City = "Paris",
            Address = "Rue de Test 1",
            ZipCode = "75001",
            Email = "contact@email-test-company.fr",
            PhoneNumber = "+33-1-23-45-67-89",
            ContactPersonName = "Marie Dupont",
            VatCode = "FR123456789",
            TaxCode = "FRTAX001",
            Active = true,
            Tags = Array.Empty<string>()
        };

        await AddAsync(entity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "email-test-company",
            MaxResults = 15
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().Email.Should().Be("contact@email-test-company.fr");
        result.First().DisplayText.Should().Contain("Email Test Company");
        result.First().DisplayText.Should().Contain("(ETC001)");
        result.First().DisplayText.Should().Contain("[Paris, FR]");
    }

    [Test]
    public async Task ShouldReturnLimitedResults_WhenMaxResultsSpecified()
    {
        // Arrange - Create 20 entities that match search term
        var entities = new List<Domain.Entities.SupplyNetworkEntities>();
        for (int i = 1; i <= 20; i++)
        {
            entities.Add(new Domain.Entities.SupplyNetworkEntities
            {
                LegalName = $"Manufacturing Company {i:D2}",
                ShortName = $"MC{i:D2}",
                ExternalCode = $"MC{i:D3}",
                EntityType = EntityType.Supplier,
                RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
                AccreditationStatus = AccreditationStatus.Approved,
                Country = "US",
                Region = "Texas",
                City = "Houston",
                Address = $"Industrial Blvd {i}",
                ZipCode = "77001",
                Email = $"info@manufacturing{i}.com",
                PhoneNumber = $"+1-713-{i:D3}-0000",
                ContactPersonName = $"Manager {i}",
                VatCode = $"VAT{i:D3}",
                TaxCode = $"TAX{i:D3}",
                Active = true,
                Tags = Array.Empty<string>()
            });
        }

        await AddRangeAsync(entities);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "Manufacturing",
            MaxResults = 10
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(10); // Limited by MaxResults
        result.All(r => r.LegalName.Contains("Manufacturing")).Should().BeTrue();
    }

    [Test]
    public async Task ShouldReturnEmptyResults_WhenSearchTermTooShort()
    {
        // Arrange
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Company",
            ShortName = "TC",
            ExternalCode = "TC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(entity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "Te", // Only 2 characters - should be rejected
            MaxResults = 15
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEmpty(); // No results for short search term
    }

    [Test]
    public async Task ShouldReturnEmptyResults_WhenNoMatchingEntities()
    {
        // Arrange
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Real Company",
            ShortName = "RC",
            ExternalCode = "RC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(entity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "NonExistentCompany",
            MaxResults = 15
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEmpty();
    }

    [Test]
    public async Task ShouldReturnActiveEntitiesOnly_WhenActiveOnlyIsTrue()
    {
        // Arrange
        var activeEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Active Search Company",
            ShortName = "ASC",
            ExternalCode = "ASC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var inactiveEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Inactive Search Company",
            ShortName = "ISC",
            ExternalCode = "ISC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = false,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(activeEntity);
        await AddAsync(inactiveEntity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "Search Company",
            MaxResults = 15,
            ActiveOnly = true
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.Single().LegalName.Should().Be("Active Search Company");
    }

    [Test]
    public async Task ShouldReturnBothActiveAndInactive_WhenActiveOnlyIsFalse()
    {
        // Arrange
        var activeEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Active Both Company",
            ShortName = "ABC",
            ExternalCode = "ABC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var inactiveEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Inactive Both Company",
            ShortName = "IBC",
            ExternalCode = "IBC001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = false,
            Region = "", City = "", Address = "", ZipCode = "", Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(activeEntity);
        await AddAsync(inactiveEntity);

        var query = new SearchSupplyNetworkEntitiesQuery
        {
            SearchTerm = "Both Company",
            MaxResults = 15,
            ActiveOnly = false
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(2);
        result.Should().Contain(r => r.LegalName == "Active Both Company");
        result.Should().Contain(r => r.LegalName == "Inactive Both Company");
    }
}
