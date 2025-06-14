using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.Dashboard.Queries;

[TestFixture]
public class GetUpcomingQuestionnairesQueryHandlerTests
{
    [Test]
    public void GetUpcomingQuestionnairesQuery_Properties_ShouldBeSetCorrectly()
    {
        // Arrange & Act
        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = Guid.NewGuid(),
            UserRole = "User",
            WeeksAhead = 4
        };

        // Assert
        query.Should().NotBeNull();
        query.UserId.Should().NotBeNull();
        query.UserRole.Should().Be("User");
        query.WeeksAhead.Should().Be(4);
    }

    [Test]
    public void GetUpcomingQuestionnairesQuery_DefaultWeeksAhead_ShouldBe4()
    {
        // Arrange & Act
        var query = new GetUpcomingQuestionnairesQuery();

        // Assert
        query.WeeksAhead.Should().Be(4);
    }

    [Test]
    public void UpcomingQuestionnaireDto_Properties_ShouldBeInitialized()
    {
        // Arrange & Act
        var dto = new UpcomingQuestionnaireDto
        {
            Id = Guid.NewGuid(),
            Title = "Test Questionnaire",
            Type = "Compliance",
            Status = "Published",
            Priority = "High",
            DueDate = DateTime.Now.AddDays(7),
            SupplierName = "Test Supplier",
            SupplierCode = "TS001",
            DaysToDeadline = 7,
            IsOverdue = false
        };

        // Assert
        dto.Should().NotBeNull();
        dto.Title.Should().Be("Test Questionnaire");
        dto.Type.Should().Be("Compliance");
        dto.Status.Should().Be("Published");
        dto.Priority.Should().Be("High");
        dto.SupplierName.Should().Be("Test Supplier");
        dto.SupplierCode.Should().Be("TS001");
        dto.DaysToDeadline.Should().Be(7);
        dto.IsOverdue.Should().BeFalse();
    }

    [Test]
    public void UpcomingQuestionnaireDto_OverdueScenario_ShouldBeTrue()
    {
        // Arrange & Act
        var dto = new UpcomingQuestionnaireDto
        {
            Id = Guid.NewGuid(),
            Title = "Overdue Questionnaire",
            DueDate = DateTime.Now.AddDays(-1),
            DaysToDeadline = -1,
            IsOverdue = true
        };

        // Assert
        dto.IsOverdue.Should().BeTrue();
        dto.DaysToDeadline.Should().BeNegative();
    }
}
