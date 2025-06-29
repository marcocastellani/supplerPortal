using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using SupplierPortal.Application.Interfaces;
using SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;
using SupplierPortal.Domain.Entities;
using SupplierPortal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace SupplierPortal.Application.UnitTests.QuestionnaireTemplates.Commands;

public class AssignQuestionnaireCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _mockContext;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<ILogger<AssignQuestionnaireCommandHandler>> _mockLogger;
    private readonly AssignQuestionnaireCommandHandler _handler;

    public AssignQuestionnaireCommandHandlerTests()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockMapper = new Mock<IMapper>();
        _mockLogger = new Mock<ILogger<AssignQuestionnaireCommandHandler>>();
        _handler = new AssignQuestionnaireCommandHandler(
            _mockContext.Object,
            _mockMapper.Object,
            _mockLogger.Object);
    }

    [Fact]
    public async Task Handle_WithValidData_AssignsQuestionnairesToEntities()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var entityIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() };
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = templateId,
            EntityIds = entityIds,
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High",
            Notes = "Test assignment",
            SendNotifications = true
        };

        var template = new QuestionnaireTemplate
        {
            Id = templateId,
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entities = entityIds.Select(id => new SupplyNetworkEntity
        {
            Id = id,
            LegalName = $"Entity {id}",
            EntityType = EntityType.Supplier,
            IsActive = true
        }).ToList();

        var questionnaires = new List<Questionnaire>();
        var existingQuestionnaires = new List<Questionnaire>();

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(new[] { template }));
        _mockContext.Setup(x => x.SupplyNetworkEntities)
            .Returns(CreateDbSet(entities));
        _mockContext.Setup(x => x.Questionnaires)
            .Returns(CreateDbSet(existingQuestionnaires));
        _mockContext.Setup(x => x.Questionnaires.AddAsync(It.IsAny<Questionnaire>(), It.IsAny<CancellationToken>()))
            .Callback<Questionnaire, CancellationToken>((q, _) => questionnaires.Add(q))
            .Returns((Questionnaire q, CancellationToken _) => new ValueTask<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Questionnaire>>());
        _mockContext.Setup(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(questionnaires.Count);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.TotalEntities.Should().Be(2);
        result.AssignedCount.Should().Be(2);
        result.SkippedCount.Should().Be(0);
        result.AssignedEntities.Should().HaveCount(2);
        result.SkippedEntities.Should().BeEmpty();

        questionnaires.Should().HaveCount(2);
        questionnaires.Should().AllSatisfy(q =>
        {
            q.TemplateId.Should().Be(templateId);
            q.DueDate.Should().Be(command.DueDate);
            q.Priority.Should().Be(command.Priority);
            q.Notes.Should().Be(command.Notes);
            q.Status.Should().Be(QuestionnaireStatus.NotStarted);
        });
    }

    [Fact]
    public async Task Handle_WithInactiveTemplate_ThrowsNotFoundException()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = templateId,
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High"
        };

        var template = new QuestionnaireTemplate
        {
            Id = templateId,
            Status = TemplateStatus.Draft // Not active
        };

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(new[] { template }));

        // Act & Assert
        await Assert.ThrowsAsync<Common.Exceptions.NotFoundException>(
            () => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_WithExistingActiveQuestionnaires_SkipsEntities()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var entityId1 = Guid.NewGuid();
        var entityId2 = Guid.NewGuid();
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = templateId,
            EntityIds = new List<Guid> { entityId1, entityId2 },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Medium"
        };

        var template = new QuestionnaireTemplate
        {
            Id = templateId,
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entities = new List<SupplyNetworkEntity>
        {
            new() { Id = entityId1, LegalName = "Entity 1", EntityType = EntityType.Supplier, IsActive = true },
            new() { Id = entityId2, LegalName = "Entity 2", EntityType = EntityType.Supplier, IsActive = true }
        };

        var existingQuestionnaires = new List<Questionnaire>
        {
            new()
            {
                Id = Guid.NewGuid(),
                TemplateId = templateId,
                EntityId = entityId1,
                Status = QuestionnaireStatus.InProgress // Active questionnaire
            }
        };

        var newQuestionnaires = new List<Questionnaire>();

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(new[] { template }));
        _mockContext.Setup(x => x.SupplyNetworkEntities)
            .Returns(CreateDbSet(entities));
        _mockContext.Setup(x => x.Questionnaires)
            .Returns(CreateDbSet(existingQuestionnaires));
        _mockContext.Setup(x => x.Questionnaires.AddAsync(It.IsAny<Questionnaire>(), It.IsAny<CancellationToken>()))
            .Callback<Questionnaire, CancellationToken>((q, _) => newQuestionnaires.Add(q))
            .Returns((Questionnaire q, CancellationToken _) => new ValueTask<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Questionnaire>>());
        _mockContext.Setup(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(newQuestionnaires.Count);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.TotalEntities.Should().Be(2);
        result.AssignedCount.Should().Be(1);
        result.SkippedCount.Should().Be(1);
        result.AssignedEntities.Should().HaveCount(1);
        result.SkippedEntities.Should().HaveCount(1);

        result.SkippedEntities.First().EntityId.Should().Be(entityId1);
        result.SkippedEntities.First().Reason.Should().Contain("already has an active questionnaire");

        newQuestionnaires.Should().HaveCount(1);
        newQuestionnaires.First().EntityId.Should().Be(entityId2);
    }

    [Fact]
    public async Task Handle_WithInactiveEntities_FiltersThemOut()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var activeEntityId = Guid.NewGuid();
        var inactiveEntityId = Guid.NewGuid();
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = templateId,
            EntityIds = new List<Guid> { activeEntityId, inactiveEntityId },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Low"
        };

        var template = new QuestionnaireTemplate
        {
            Id = templateId,
            Status = TemplateStatus.Active,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entities = new List<SupplyNetworkEntity>
        {
            new() { Id = activeEntityId, LegalName = "Active Entity", EntityType = EntityType.Supplier, IsActive = true },
            new() { Id = inactiveEntityId, LegalName = "Inactive Entity", EntityType = EntityType.Supplier, IsActive = false }
        };

        var questionnaires = new List<Questionnaire>();

        _mockContext.Setup(x => x.QuestionnaireTemplates)
            .Returns(CreateDbSet(new[] { template }));
        _mockContext.Setup(x => x.SupplyNetworkEntities)
            .Returns(CreateDbSet(entities));
        _mockContext.Setup(x => x.Questionnaires)
            .Returns(CreateDbSet(new List<Questionnaire>()));
        _mockContext.Setup(x => x.Questionnaires.AddAsync(It.IsAny<Questionnaire>(), It.IsAny<CancellationToken>()))
            .Callback<Questionnaire, CancellationToken>((q, _) => questionnaires.Add(q))
            .Returns((Questionnaire q, CancellationToken _) => new ValueTask<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<Questionnaire>>());
        _mockContext.Setup(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(questionnaires.Count);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.AssignedCount.Should().Be(1);
        result.AssignedEntities.Should().HaveCount(1);
        result.AssignedEntities.First().EntityId.Should().Be(activeEntityId);
        questionnaires.Should().HaveCount(1);
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