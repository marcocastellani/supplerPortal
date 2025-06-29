using FluentAssertions;
using SupplierPortal.Application.QuestionnaireTemplates.Queries.GetActiveTemplates;
using SupplierPortal.Domain.Entities;
using SupplierPortal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace SupplierPortal.Application.IntegrationTests.QuestionnaireAssignments;

[Collection("Sequential")]
public class GetActiveTemplatesTests : BaseIntegrationTest
{
    public GetActiveTemplatesTests(IntegrationTestWebAppFactory factory)
        : base(factory)
    {
    }

    [Fact]
    public async Task Should_ReturnOnlyActiveTemplates()
    {
        // Arrange
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Active Template 1",
                Description = "Active template description",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Sections = new List<QuestionnaireSection>
                {
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Section 1",
                        Order = 1,
                        Questions = new List<Question>
                        {
                            new() { Id = Guid.NewGuid(), Text = "Question 1", Order = 1 },
                            new() { Id = Guid.NewGuid(), Text = "Question 2", Order = 2 }
                        }
                    }
                }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Draft Template",
                Description = "Draft template description",
                Status = TemplateStatus.Draft,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Site }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Active Template 2",
                Description = "Another active template",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Archived Template",
                Description = "Archived template description",
                Status = TemplateStatus.Archived,
                Version = 1.0m,
                EntityTypes = new List<EntityType> { EntityType.SubSupplier }
            }
        };

        await AddRangeAsync(templates);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(2);
        result.Templates.Should().OnlyContain(t => t.Status == "Active");
        result.Templates.Select(t => t.Title).Should().BeEquivalentTo(new[] { "Active Template 1", "Active Template 2" });
    }

    [Fact]
    public async Task Should_ReturnLatestVersionOnly()
    {
        // Arrange
        var baseTemplateId = Guid.NewGuid();
        var templates = new List<QuestionnaireTemplate>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = baseTemplateId,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-30)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v2",
                Status = TemplateStatus.Active,
                Version = 2.0m,
                BaseTemplateId = baseTemplateId,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-20)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Template v3",
                Status = TemplateStatus.Active,
                Version = 3.0m,
                BaseTemplateId = baseTemplateId,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-10),
                Sections = new List<QuestionnaireSection>
                {
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Section 1",
                        Questions = new List<Question>
                        {
                            new() { Id = Guid.NewGuid(), Text = "Q1" },
                            new() { Id = Guid.NewGuid(), Text = "Q2" },
                            new() { Id = Guid.NewGuid(), Text = "Q3" }
                        }
                    }
                }
            }
        };

        await AddRangeAsync(templates);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        result.Templates.First().Title.Should().Be("Template v3");
        result.Templates.First().Version.Should().Be("3.0");
        result.Templates.First().QuestionCount.Should().Be(3);
    }

    [Fact]
    public async Task Should_HandleMultipleTemplateGroups()
    {
        // Arrange
        var baseId1 = Guid.NewGuid();
        var baseId2 = Guid.NewGuid();
        
        var templates = new List<QuestionnaireTemplate>
        {
            // Group 1 - versions
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sustainability v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = baseId1,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-20)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sustainability v2",
                Status = TemplateStatus.Active,
                Version = 2.0m,
                BaseTemplateId = baseId1,
                EntityTypes = new List<EntityType> { EntityType.Supplier },
                Created = DateTime.UtcNow.AddDays(-10),
                Sections = new List<QuestionnaireSection>
                {
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Environmental",
                        Questions = new List<Question>
                        {
                            new() { Id = Guid.NewGuid(), Text = "Q1" },
                            new() { Id = Guid.NewGuid(), Text = "Q2" }
                        }
                    }
                }
            },
            // Group 2 - versions
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Quality Audit v1",
                Status = TemplateStatus.Active,
                Version = 1.0m,
                BaseTemplateId = baseId2,
                EntityTypes = new List<EntityType> { EntityType.Site },
                Created = DateTime.UtcNow.AddDays(-15)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Quality Audit v1.5",
                Status = TemplateStatus.Active,
                Version = 1.5m,
                BaseTemplateId = baseId2,
                EntityTypes = new List<EntityType> { EntityType.Site },
                Created = DateTime.UtcNow.AddDays(-5),
                Sections = new List<QuestionnaireSection>
                {
                    new()
                    {
                        Id = Guid.NewGuid(),
                        Title = "Quality Checks",
                        Questions = new List<Question>
                        {
                            new() { Id = Guid.NewGuid(), Text = "Q1" },
                            new() { Id = Guid.NewGuid(), Text = "Q2" },
                            new() { Id = Guid.NewGuid(), Text = "Q3" },
                            new() { Id = Guid.NewGuid(), Text = "Q4" }
                        }
                    }
                }
            }
        };

        await AddRangeAsync(templates);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(2);
        
        var sustainability = result.Templates.First(t => t.Title.Contains("Sustainability"));
        sustainability.Title.Should().Be("Sustainability v2");
        sustainability.Version.Should().Be("2.0");
        sustainability.QuestionCount.Should().Be(2);
        
        var quality = result.Templates.First(t => t.Title.Contains("Quality"));
        quality.Title.Should().Be("Quality Audit v1.5");
        quality.Version.Should().Be("1.5");
        quality.QuestionCount.Should().Be(4);
    }

    [Fact]
    public async Task Should_IncludeEntityTypesInResponse()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Multi-Entity Template",
            Description = "Template for multiple entity types",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site, EntityType.SubSupplier },
            CreatedBy = "Test User"
        };

        await AddAsync(template);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        
        var templateResponse = result.Templates.First();
        templateResponse.EntityTypes.Should().HaveCount(3);
        templateResponse.EntityTypes.Should().BeEquivalentTo(new[] { "Supplier", "Site", "SubSupplier" });
        templateResponse.CreatedBy.Should().Be("Test User");
    }

    [Fact]
    public async Task Should_ReturnEmptyList_WhenNoActiveTemplates()
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

        await AddRangeAsync(templates);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().BeEmpty();
    }

    [Fact]
    public async Task Should_HandleTemplatesWithoutSections()
    {
        // Arrange
        var template = new QuestionnaireTemplate
        {
            Id = Guid.NewGuid(),
            Title = "Template Without Questions",
            Description = "A template with no sections or questions",
            Status = TemplateStatus.Active,
            Version = 1.0m,
            EntityTypes = new List<EntityType> { EntityType.Supplier },
            Sections = new List<QuestionnaireSection>() // Empty sections
        };

        await AddAsync(template);

        var query = new GetActiveTemplatesQuery();

        // Act
        var result = await SendAsync(query);

        // Assert
        result.Should().NotBeNull();
        result.Templates.Should().HaveCount(1);
        result.Templates.First().QuestionCount.Should().Be(0);
    }
}