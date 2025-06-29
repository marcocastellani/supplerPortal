using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;
using SupplierPortal.Domain.Entities;
using SupplierPortal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace SupplierPortal.Application.IntegrationTests.QuestionnaireAssignments;

[Collection("Sequential")]
public class AssignQuestionnaireTests : BaseIntegrationTest
{
    public AssignQuestionnaireTests(IntegrationTestWebAppFactory factory)
        : base(factory)
    {
    }

    [Fact]
    public async Task Should_AssignQuestionnaire_ToMultipleEntities()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Description = "Test Description",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site }
        };

        var entities = new List<SupplyNetworkEntity>
        {
            new()
            {
                Id = Guid.NewGuid(),
                LegalName = "Supplier 1",
                EntityType = EntityType.Supplier,
                IsActive = true,
                Email = "supplier1@test.com"
            },
            new()
            {
                Id = Guid.NewGuid(),
                LegalName = "Site 1",
                EntityType = EntityType.Site,
                IsActive = true,
                Email = "site1@test.com"
            }
        };

        await AddAsync(template);
        await AddRangeAsync(entities);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = entities.Select(e => e.Id).ToList(),
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High",
            Notes = "Please complete ASAP",
            SendNotifications = true
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.TotalEntities.Should().Be(2);
        result.AssignedCount.Should().Be(2);
        result.SkippedCount.Should().Be(0);
        result.AssignedEntities.Should().HaveCount(2);

        // Verify questionnaires were created in database
        var questionnaires = await FindAsync<Questionnaire>(q => q.TemplateId == template.Id);
        questionnaires.Should().HaveCount(2);
        
        foreach (var questionnaire in questionnaires)
        {
            questionnaire.DueDate.Should().BeCloseTo(command.DueDate.Value, TimeSpan.FromSeconds(1));
            questionnaire.Priority.Should().Be(command.Priority);
            questionnaire.Notes.Should().Be(command.Notes);
            questionnaire.Status.Should().Be(QuestionnaireStatus.NotStarted);
        }
    }

    [Fact]
    public async Task Should_SkipEntities_WithActiveQuestionnaires()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entity1 = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Supplier with Active Questionnaire",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        var entity2 = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Supplier without Questionnaire",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        var existingQuestionnaire = new Questionnaire
        {
            Id = Guid.NewGuid(),
            TemplateId = template.Id,
            EntityId = entity1.Id,
            Status = QuestionnaireStatus.InProgress,
            DueDate = DateTime.UtcNow.AddDays(15)
        };

        await AddAsync(template);
        await AddAsync(entity1);
        await AddAsync(entity2);
        await AddAsync(existingQuestionnaire);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = new List<Guid> { entity1.Id, entity2.Id },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Medium"
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.TotalEntities.Should().Be(2);
        result.AssignedCount.Should().Be(1);
        result.SkippedCount.Should().Be(1);
        
        result.AssignedEntities.Should().HaveCount(1);
        result.AssignedEntities.First().EntityName.Should().Be(entity2.LegalName);
        
        result.SkippedEntities.Should().HaveCount(1);
        result.SkippedEntities.First().EntityName.Should().Be(entity1.LegalName);
        result.SkippedEntities.First().Reason.Should().Contain("already has an active questionnaire");
    }

    [Fact]
    public async Task Should_OnlyAssignToActiveEntities()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var activeEntity = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Active Supplier",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        var inactiveEntity = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Inactive Supplier",
            EntityType = EntityType.Supplier,
            IsActive = false
        };

        await AddAsync(template);
        await AddAsync(activeEntity);
        await AddAsync(inactiveEntity);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = new List<Guid> { activeEntity.Id, inactiveEntity.Id },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Low"
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.AssignedCount.Should().Be(1);
        result.AssignedEntities.Should().HaveCount(1);
        result.AssignedEntities.First().EntityName.Should().Be(activeEntity.LegalName);

        // Verify only active entity got questionnaire
        var questionnaires = await FindAsync<Questionnaire>(q => q.TemplateId == template.Id);
        questionnaires.Should().HaveCount(1);
        questionnaires.First().EntityId.Should().Be(activeEntity.Id);
    }

    [Fact]
    public async Task Should_Throw_WhenTemplateNotActive()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Draft Template",
            Status = TemplateStatus.Draft, // Not active
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entity = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Test Supplier",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        await AddAsync(template);
        await AddAsync(entity);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = new List<Guid> { entity.Id },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Medium"
        };

        // Act & Assert
        await FluentActions.Invoking(() => SendAsync(command))
            .Should()
            .ThrowAsync<Common.Exceptions.NotFoundException>()
            .WithMessage($"*{template.Id}*");
    }

    [Fact]
    public async Task Should_Handle_LargeNumberOfEntities()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Bulk Assignment Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entities = new List<SupplyNetworkEntity>();
        for (int i = 0; i < 100; i++)
        {
            entities.Add(new SupplyNetworkEntity
            {
                Id = Guid.NewGuid(),
                LegalName = $"Supplier {i + 1}",
                EntityType = EntityType.Supplier,
                IsActive = true,
                Email = $"supplier{i + 1}@test.com"
            });
        }

        await AddAsync(template);
        await AddRangeAsync(entities);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = entities.Select(e => e.Id).ToList(),
            DueDate = DateTime.UtcNow.AddDays(60),
            Priority = "Medium",
            Notes = "Bulk assignment test",
            SendNotifications = false
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.TotalEntities.Should().Be(100);
        result.AssignedCount.Should().Be(100);
        result.SkippedCount.Should().Be(0);
        result.AssignedEntities.Should().HaveCount(100);

        // Verify all questionnaires were created
        var questionnaires = await FindAsync<Questionnaire>(q => q.TemplateId == template.Id);
        questionnaires.Should().HaveCount(100);
    }

    [Fact]
    public async Task Should_PopulateEntityNames_InResponse()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entity = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Test Supplier Name",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        await AddAsync(template);
        await AddAsync(entity);

        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = new List<Guid> { entity.Id },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High"
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        result.Should().NotBeNull();
        result.AssignedEntities.Should().HaveCount(1);
        result.AssignedEntities.First().EntityName.Should().Be("Test Supplier Name");
        result.AssignedEntities.First().EntityId.Should().Be(entity.Id);
        result.AssignedEntities.First().QuestionnaireId.Should().NotBeEmpty();
    }

    [Fact]
    public async Task Should_SaveNotes_WhenProvided()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier }
        };

        var entity = new SupplyNetworkEntity
        {
            Id = Guid.NewGuid(),
            LegalName = "Test Supplier",
            EntityType = EntityType.Supplier,
            IsActive = true
        };

        await AddAsync(template);
        await AddAsync(entity);

        var testNotes = "This is a test note with special instructions for completing the questionnaire.";
        
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = template.Id,
            EntityIds = new List<Guid> { entity.Id },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Medium",
            Notes = testNotes,
            SendNotifications = false
        };

        // Act
        var result = await SendAsync(command);

        // Assert
        var questionnaire = await FindAsync<Questionnaire>(
            q => q.TemplateId == template.Id && q.EntityId == entity.Id);
        
        questionnaire.Should().HaveCount(1);
        questionnaire.First().Notes.Should().Be(testNotes);
    }
}