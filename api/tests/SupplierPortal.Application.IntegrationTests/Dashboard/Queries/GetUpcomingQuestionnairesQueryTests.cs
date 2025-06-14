using FluentAssertions;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Dashboard.Queries;

using static Testing;

[TestFixture]
public class GetUpcomingQuestionnairesQueryTests : BaseTestFixture
{
    [Test]
    public async Task ShouldReturnOnlyQuestionnairesForAssignedSuppliers()
    {
        // Arrange
        var user = new User
        {
            ExternalId = "test-user-1",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User",
            Role = "User",
            IsActive = true
        };
        
        var supplier1 = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Supplier 1",
            ExternalCode = "SUP001",
            Email = "supplier1@example.com",
            Active = true,
            EntityType = Domain.Enums.EntityType.Supplier,
            RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
            AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
            Country = "US",
            ShortName = "Supplier 1",
            VatCode = "",
            TaxCode = "",
            Region = "",
            City = "",
            Address = "",
            ZipCode = "",
            PhoneNumber = "",
            ContactPersonName = "",
            Tags = Array.Empty<string>()
        };
        
        var supplier2 = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Supplier 2", 
            ExternalCode = "SUP002",
            Email = "supplier2@example.com",
            Active = true,
            EntityType = Domain.Enums.EntityType.Supplier,
            RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
            AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
            Country = "US",
            ShortName = "Supplier 2",
            VatCode = "",
            TaxCode = "",
            Region = "",
            City = "",
            Address = "",
            ZipCode = "",
            PhoneNumber = "",
            ContactPersonName = "",
            Tags = Array.Empty<string>()
        };

        await AddAsync(user);
        await AddAsync(supplier1);
        await AddAsync(supplier2);

        // Assign only supplier1 to user
        var userSupplier = new UserSupplier
        {
            UserId = user.Id,
            SupplierId = supplier1.Id
        };
        await AddAsync(userSupplier);

        // Create questionnaires for both suppliers
        var questionnaire1 = new Questionnaire
        {
            Title = "Safety Questionnaire",
            Type = "Safety",
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(14),
            SupplierId = supplier1.Id,
            AssignedUserId = user.Id
        };
        
        var questionnaire2 = new Questionnaire
        {
            Title = "Quality Questionnaire",
            Type = "Quality", 
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(7),
            SupplierId = supplier2.Id // Not assigned to user
        };

        await AddAsync(questionnaire1);
        await AddAsync(questionnaire2);

        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = user.Id,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().Title.Should().Be("Safety Questionnaire");
        result.First().SupplierName.Should().Be("Supplier 1");
    }

    [Test]
    public async Task ShouldReturnQuestionnairesWithinSpecifiedWeeks()
    {
        // Arrange
        var user = new User
        {
            ExternalId = "test-user-2",
            Email = "test2@example.com",
            FirstName = "Test",
            LastName = "User 2",
            Role = "User",
            IsActive = true
        };
        
        var supplier = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Supplier",
            ExternalCode = "TEST001",
            Email = "test@supplier.com",
            Active = true,
            EntityType = Domain.Enums.EntityType.Supplier,
            RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
            AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
            Country = "US",
            ShortName = "Test Supplier",
            VatCode = "",
            TaxCode = "",
            Region = "",
            City = "",
            Address = "",
            ZipCode = "",
            PhoneNumber = "",
            ContactPersonName = "",
            Tags = Array.Empty<string>()
        };

        await AddAsync(user);
        await AddAsync(supplier);

        var userSupplier = new UserSupplier
        {
            UserId = user.Id,
            SupplierId = supplier.Id
        };
        await AddAsync(userSupplier);

        // Questionnaire within 4 weeks
        var questionnaire1 = new Questionnaire
        {
            Title = "Within Range",
            Type = "Safety",
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(20),
            SupplierId = supplier.Id,
            AssignedUserId = user.Id
        };
        
        // Questionnaire beyond 4 weeks
        var questionnaire2 = new Questionnaire
        {
            Title = "Beyond Range",
            Type = "Quality",
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(35),
            SupplierId = supplier.Id,
            AssignedUserId = user.Id
        };

        await AddAsync(questionnaire1);
        await AddAsync(questionnaire2);

        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = user.Id,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().Title.Should().Be("Within Range");
    }

    [Test]
    public async Task ShouldOrderByDueDateAscending()
    {
        // Arrange
        var user = new User
        {
            ExternalId = "test-user-3",
            Email = "test3@example.com",
            FirstName = "Test",
            LastName = "User 3",
            Role = "User",
            IsActive = true
        };
        
        var supplier = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Supplier",
            ExternalCode = "TEST002",
            Email = "test2@supplier.com",
            Active = true,
            EntityType = Domain.Enums.EntityType.Supplier,
            RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
            AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
            Country = "US",
            ShortName = "Test Supplier",
            VatCode = "",
            TaxCode = "",
            Region = "",
            City = "",
            Address = "",
            ZipCode = "",
            PhoneNumber = "",
            ContactPersonName = "",
            Tags = Array.Empty<string>()
        };

        await AddAsync(user);
        await AddAsync(supplier);

        var userSupplier = new UserSupplier
        {
            UserId = user.Id,
            SupplierId = supplier.Id
        };
        await AddAsync(userSupplier);

        // Create questionnaires with different due dates
        var questionnaire1 = new Questionnaire
        {
            Title = "Later Questionnaire",
            Type = "Safety",
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(21),
            SupplierId = supplier.Id,
            AssignedUserId = user.Id
        };
        
        var questionnaire2 = new Questionnaire
        {
            Title = "Earlier Questionnaire",
            Type = "Quality",
            Status = QuestionnaireStatus.Published,
            DueDate = DateTime.Now.AddDays(7),
            SupplierId = supplier.Id,
            AssignedUserId = user.Id
        };

        await AddAsync(questionnaire1);
        await AddAsync(questionnaire2);

        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = user.Id,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(2);
        result.First().Title.Should().Be("Earlier Questionnaire");
        result.Last().Title.Should().Be("Later Questionnaire");
    }

    [Test]
    public async Task ShouldCalculateDaysToDeadlineCorrectly()
    {
        // Arrange
        var user = new User
        {
            ExternalId = "test-user-4",
            Email = "test4@example.com",
            FirstName = "Test",
            LastName = "User 4", 
            Role = "User",
            IsActive = true
        };
        
        var supplier = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "Test Supplier",
            ExternalCode = "TEST003",
            Email = "test3@supplier.com",
            Active = true,
            EntityType = Domain.Enums.EntityType.Supplier,
            RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
            AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
            Country = "US",
            ShortName = "Test Supplier",
            VatCode = "",
            TaxCode = "",
            Region = "",
            City = "",
            Address = "",
            ZipCode = "",
            PhoneNumber = "",
            ContactPersonName = "",
            Tags = Array.Empty<string>()
        };

        await AddAsync(user);
        await AddAsync(supplier);

        var userSupplier = new UserSupplier
        {
            UserId = user.Id,
            SupplierId = supplier.Id
        };
        await AddAsync(userSupplier);

        var dueDate = DateTime.Now.AddDays(10);
        var questionnaire = new Questionnaire
        {
            Title = "Test Questionnaire",
            Type = "Safety",
            Status = QuestionnaireStatus.Published,
            DueDate = dueDate,
            SupplierId = supplier.Id,
            AssignedUserId = user.Id
        };

        await AddAsync(questionnaire);

        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = user.Id,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(1);
        result.First().DaysToDeadline.Should().Be(10);
        result.First().IsOverdue.Should().BeFalse();
    }

    [Test]
    public async Task ShouldReturnEmptyListWhenNoAssignedSuppliers()
    {
        // Arrange
        var user = new User
        {
            ExternalId = "test-user-5",
            Email = "test5@example.com",
            FirstName = "Test",
            LastName = "User 5",
            Role = "User",
            IsActive = true
        };

        await AddAsync(user);

        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = user.Id,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEmpty();
    }
}
