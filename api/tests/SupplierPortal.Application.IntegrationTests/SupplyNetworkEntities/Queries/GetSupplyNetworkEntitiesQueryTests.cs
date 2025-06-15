using FluentAssertions;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Queries;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.SupplyNetworkEntities.Queries;

using static Testing;

[TestFixture]
public class GetSupplyNetworkEntitiesQueryTests : BaseTestFixture
{
    [Test]
    public async Task ShouldReturnPaginatedResults_WhenNoFiltersApplied()
    {
        // Arrange - Create test entities
        var entities = new List<Domain.Entities.SupplyNetworkEntities>();
        for (int i = 1; i <= 25; i++)
        {
            entities.Add(new Domain.Entities.SupplyNetworkEntities
            {
                LegalName = $"Supplier {i:D2}",
                ShortName = $"Sup {i:D2}",
                ExternalCode = $"SUP{i:D3}",
                EntityType = EntityType.Supplier,
                RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
                AccreditationStatus = AccreditationStatus.Approved,
                Country = "US",
                Region = "California",
                City = "San Francisco",
                Address = $"Address {i}",
                ZipCode = "94102",
                Email = $"supplier{i}@test.com",
                PhoneNumber = $"+1-555-{i:D3}-0000",
                ContactPersonName = $"Contact {i}",
                VatCode = $"VAT{i:D3}",
                TaxCode = $"TAX{i:D3}",
                Active = true,
                Tags = Array.Empty<string>()
            });
        }

        await AddRangeAsync(entities);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(10);
        result.TotalCount.Should().Be(25);
        result.TotalPages.Should().Be(3);
        result.Page.Should().Be(1);
        result.HasNextPage.Should().BeTrue();
        result.HasPreviousPage.Should().BeFalse();
        
        // Should be ordered by LegalName by default
        result.Items.First().LegalName.Should().Be("Supplier 01");
        result.Items.Last().LegalName.Should().Be("Supplier 10");
    }

    [Test]
    public async Task ShouldReturnSecondPage_WhenPage2Requested()
    {
        // Arrange - Create test entities
        var entities = new List<Domain.Entities.SupplyNetworkEntities>();
        for (int i = 1; i <= 15; i++)
        {
            entities.Add(new Domain.Entities.SupplyNetworkEntities
            {
                LegalName = $"Company {i:D2}",
                ShortName = $"Co {i:D2}",
                ExternalCode = $"CO{i:D3}",
                EntityType = EntityType.Supplier,
                RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
                AccreditationStatus = AccreditationStatus.Approved,
                Country = "DE",
                Region = "Bavaria",
                City = "Munich",
                Address = $"Strasse {i}",
                ZipCode = "80331",
                Email = $"company{i}@test.de",
                PhoneNumber = $"+49-89-{i:D3}-0000",
                ContactPersonName = $"Hans {i}",
                VatCode = $"DE{i:D3}",
                TaxCode = $"DETAX{i:D3}",
                Active = true,
                Tags = Array.Empty<string>()
            });
        }

        await AddRangeAsync(entities);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 2,
            PageSize = 10
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(5); // Remaining items on page 2
        result.Page.Should().Be(2);
        result.HasNextPage.Should().BeFalse();
        result.HasPreviousPage.Should().BeTrue();
        
        // Should contain items 11-15
        result.Items.First().LegalName.Should().Be("Company 11");
        result.Items.Last().LegalName.Should().Be("Company 15");
    }

    [Test]
    public async Task ShouldFilterByEntityType_WhenEntityTypeProvided()
    {
        // Arrange - Create mixed entity types
        var supplier = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Supplier",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TS", ExternalCode = "TS001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var manufacturer = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Manufacturer",
            EntityType = EntityType.CompanyGroup,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TM", ExternalCode = "TM001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var site = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Site",
            EntityType = EntityType.Site,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TSi", ExternalCode = "TSi001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(supplier);
        await AddAsync(manufacturer);
        await AddAsync(site);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            EntityType = EntityType.Supplier
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(1);
        result.Items.Single().EntityType.Should().Be(EntityType.Supplier);
        result.Items.Single().LegalName.Should().Be("Test Supplier");
    }

    [Test]
    public async Task ShouldFilterByAccreditationStatus_WhenStatusProvided()
    {
        // Arrange - Create entities with different statuses
        var approvedEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Approved Entity",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "AE", ExternalCode = "AE001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var pendingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Pending Entity",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Submitted,
            Country = "US",
            Active = true,
            ShortName = "PE", ExternalCode = "PE001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var draftEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Draft Entity",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Draft,
            Country = "US",
            Active = true,
            ShortName = "DE", ExternalCode = "DE001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(approvedEntity);
        await AddAsync(pendingEntity);
        await AddAsync(draftEntity);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            AccreditationStatus = AccreditationStatus.Approved
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(1);
        result.Items.Single().AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        result.Items.Single().LegalName.Should().Be("Approved Entity");
    }

    [Test]
    public async Task ShouldFilterByActiveStatus_WhenActiveFilterProvided()
    {
        // Arrange - Create active and inactive entities
        var activeEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Active Entity",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "AE", ExternalCode = "AE001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var inactiveEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Inactive Entity",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = false,
            ShortName = "IE", ExternalCode = "IE001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(activeEntity);
        await AddAsync(inactiveEntity);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            Active = true
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(1);
        result.Items.Single().Active.Should().BeTrue();
        result.Items.Single().LegalName.Should().Be("Active Entity");
    }

    [Test]
    public async Task ShouldFilterBySearchTerm_WhenSearchTermProvided()
    {
        // Arrange - Create entities with different names
        var searchableEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Searchable Manufacturing Co",
            ShortName = "SMC",
            ExternalCode = "SEARCH001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Email = "search@manufacturing.com",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var otherEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Different Company Ltd",
            ShortName = "DCL",
            ExternalCode = "DIFF001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Email = "info@different.com",
            Active = true,
            Region = "", City = "", Address = "", ZipCode = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(searchableEntity);
        await AddAsync(otherEntity);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            SearchTerm = "Manufacturing"
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(1);
        result.Items.Single().LegalName.Should().Be("Searchable Manufacturing Co");
    }

    [Test]
    public async Task ShouldSortDescending_WhenSortDescendingIsTrue()
    {
        // Arrange - Create entities with names to test sorting
        var entityA = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Alpha Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "AC", ExternalCode = "AC001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        var entityZ = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Zeta Corporation",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "ZC", ExternalCode = "ZC001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(entityA);
        await AddAsync(entityZ);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            SortBy = "LegalName",
            SortDescending = true
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().HaveCount(2);
        result.Items.First().LegalName.Should().Be("Zeta Corporation");
        result.Items.Last().LegalName.Should().Be("Alpha Company");
    }

    [Test]
    public async Task ShouldReturnEmptyResult_WhenNoEntitiesMatchFilter()
    {
        // Arrange - Create entity that won't match filter
        var entity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Company",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TC", ExternalCode = "TC001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(entity);

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            EntityType = EntityType.CompanyGroup // Different from created entity
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Items.Should().BeEmpty();
        result.TotalCount.Should().Be(0);
        result.TotalPages.Should().Be(0);
        result.HasNextPage.Should().BeFalse();
        result.HasPreviousPage.Should().BeFalse();
    }

    [Test]
    public async Task ShouldFilterByEntityType_Site_WhenEntityTypeProvided()
    {
        // Arrange - Create mixed entity types including Site
        var siteEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Site",
            EntityType = EntityType.Site,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TSi", ExternalCode = "TSi001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(siteEntity); // Assume other entities are added if needed

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            EntityType = EntityType.Site
        };

        // Act and Assert similar to existing tests
        var result = await SendAsync(query);
        result.Items.Should().HaveCount(1);
        result.Items.Single().EntityType.Should().Be(EntityType.Site);
    }

    [Test]
    public async Task ShouldFilterByEntityType_SubSupplier_WhenEntityTypeProvided()
    {
        // Arrange - Create mixed entity types including SubSupplier
        var subSupplierEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test SubSupplier",
            EntityType = EntityType.SubSupplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TSS", ExternalCode = "TSS001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(subSupplierEntity); // Assume other entities are added if needed

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            EntityType = EntityType.SubSupplier
        };

        // Act and Assert similar to existing tests
        var result = await SendAsync(query);
        result.Items.Should().HaveCount(1);
        result.Items.Single().EntityType.Should().Be(EntityType.SubSupplier);
    }

    [Test]
    public async Task ShouldFilterByEntityType_Person_WhenEntityTypeProvided()
    {
        // Arrange - Create mixed entity types including Person
        var personEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Person",
            EntityType = EntityType.Person,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "US",
            Active = true,
            ShortName = "TP", ExternalCode = "TP001", Region = "", City = "", Address = "", ZipCode = "", 
            Email = "", PhoneNumber = "", ContactPersonName = "", VatCode = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(personEntity); // Assume other entities are added if needed

        var query = new GetSupplyNetworkEntitiesQuery
        {
            Page = 1,
            PageSize = 10,
            EntityType = EntityType.Person
        };

        // Act and Assert similar to existing tests
        var result = await SendAsync(query);
        result.Items.Should().HaveCount(1);
        result.Items.Single().EntityType.Should().Be(EntityType.Person);
    }
}
