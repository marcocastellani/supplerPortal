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
    private Mock<IApplicationDbContext> _contextMock;
    private GetUpcomingQuestionnairesQueryHandler _handler;

    [SetUp]
    public void Setup()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _handler = new GetUpcomingQuestionnairesQueryHandler(_contextMock.Object);
    }

    [Test]
    public async Task Handle_WhenUserIdIsNull_ShouldReturnEmptyList()
    {
        // Arrange
        var query = new GetUpcomingQuestionnairesQuery
        {
            UserId = null,
            UserRole = "User",
            WeeksAhead = 4
        };

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEmpty();
    }
}
