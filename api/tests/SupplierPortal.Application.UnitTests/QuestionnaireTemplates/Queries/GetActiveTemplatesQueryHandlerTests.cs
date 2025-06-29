using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using SupplierPortal.Application.Interfaces;
using SupplierPortal.Application.QuestionnaireTemplates.Queries.GetActiveTemplates;
using SupplierPortal.Domain.Entities;
using SupplierPortal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace SupplierPortal.Application.UnitTests.QuestionnaireTemplates.Queries;

public class GetActiveTemplatesQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _mockContext;
    private readonly GetActiveTemplatesQueryHandler _handler;

    public GetActiveTemplatesQueryHandlerTests()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _handler = new GetActiveTemplatesQueryHandler(_mockContext.Object);
    }

    [Fact]
    public async Task Handle_ReturnsOnlyActiveTemplates()
    {
        // Arrange
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Active Template 1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Draft Template",
                Status = TemplateStatus.Draft,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Active Template 2",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Site }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Archived Template",
                Status = TemplateStatus.Archived,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(templates));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(2);
        result.Templates.Should().AllSatisfy(t => t.Status.Should().Be(TemplateStatus.Active.ToString()));
        result.Templates.Select(t => t.Title).Should().BeEquivalentTo(new[] { "Active Template 1", "Active Template 2" });
    }

    [Fact]
    public async Task Handle_ReturnsLatestVersionsOnly()
    {
        // Arrange
        var templateBaseId = Guid.NewGuid();
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = templateBaseId,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v2",
                Status = TemplateStatus.Active,
                Version = 2.0m,
                BaseTemplateId = templateBaseId,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v3",
                Status = TemplateStatus.Active,
                Version = 3.0m,
                BaseTemplateId = templateBaseId,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(templates));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        result.Templates.First().Title.Should().Be("Template v3");
        result.Templates.First().Version.Should().Be("3.0");
    }

    [Fact]
    public async Task Handle_HandlesMultipleTemplatesWithDifferentBaseIds()
    {
        // Arrange
        var baseId1 = Guid.NewGuid();
        var baseId2 = Guid.NewGuid();
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template A v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = baseId1,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-5)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template A v2",
                Status = TemplateStatus.Active,
                Version = 2.0m,
                BaseTemplateId = baseId1,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-3)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template B v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = baseId2,
                EntityTypes = new List<EntityType> { EntityType.Site },
                Created = DateTime.UtcNow.AddDays(-4)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template B v2",
                Status = TemplateStatus.Active,
                Version = 2.0m,
                BaseTemplateId = baseId2,
                EntityTypes = new List<EntityType> { EntityType.Site },
                Created = DateTime.UtcNow.AddDays(-1)
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(templates));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(2);
        result.Templates.Should().Contain(t => t.Title == "Template A v2" && t.Version == "2.0");
        result.Templates.Should().Contain(t => t.Title == "Template B v2" && t.Version == "2.0");
    }

    [Fact]
    public async Task Handle_IncludesEntityTypesInResponse()
    {
        // Arrange
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Multi-Entity Template",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site, EntityType.SubSupplier }
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(templates));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        var template = result.Templates.First();
        template.EntityTypes.Should().HaveCount(3);
        template.EntityTypes.Should().BeEquivalentTo(new[] { "Supplier", "Site", "SubSupplier" });
    }

    [Fact]
    public async Task Handle_ReturnsEmptyListWhenNoActiveTemplates()
    {
        // Arrange
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Draft Template",
                Status = TemplateStatus.Draft,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Archived Template",
                Status = TemplateStatus.Archived,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Site }
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(templates));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().BeEmpty();
    }

    [Fact]
    public async Task Handle_IncludesQuestionCountInResponse()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var template = new QuestionnaireTemplate
        {
            Id = templateId,
            Title = "Template with Questions",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier },
            Sections = new List<QuestionnaireSection>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Title = "Section 1",
                    Questions = new List<Question>
                    {
                        new() { Id = Guid.NewGuid(), Text = "Question 1" },
                        new() { Id = Guid.NewGuid(), Text = "Question 2" }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Title = "Section 2",
                    Questions = new List<Question>
                    {
                        new() { Id = Guid.NewGuid(), Text = "Question 3" }
                    }
                }
            }
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(new[] { template }));

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        result.Templates.First().QuestionCount.Should().Be(3);
    }

    private static DbSet<T> CreateDbSet<T>(IEnumerable<T> elements) where T : class
    {
        var queryable = elements.AsQueryable();
        var mockSet = new Mock<DbSet<T>>();
        
        mockSet.As<IAsyncEnumerable<T>>()
            .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
            .Returns(new TestAsyncEnumerator<T>(queryable.GetEnumerator()));
        
        mockSet.As<IQueryable<T>>()
            .Setup(m => m.Provider)
            .Returns(new TestAsyncQueryProvider<T>(queryable.Provider));
        
        mockSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
        mockSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
        mockSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryable.GetEnumerator());
        
        return mockSet.Object;
    }
}