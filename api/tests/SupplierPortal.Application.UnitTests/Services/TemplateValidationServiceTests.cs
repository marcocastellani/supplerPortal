using NUnit.Framework;
using Moq;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.Services;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.Services;

/// <summary>
/// Unit tests for TemplateValidationService
/// </summary>
[TestFixture]
public class TemplateValidationServiceTests
{
    private Mock<IApplicationDbContext> _mockContext;
    private TemplateValidationService _service;
    private Mock<DbSet<QuestionnaireTemplate>> _mockTemplateDbSet;
    private Mock<DbSet<TemplateQuestion>> _mockQuestionDbSet;
    private Mock<DbSet<QuestionnaireTemplateEntityType>> _mockEntityTypeDbSet;
    private Mock<DbSet<QuestionCondition>> _mockConditionDbSet;

    [SetUp]
    public void Setup()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockTemplateDbSet = new Mock<DbSet<QuestionnaireTemplate>>();
        _mockQuestionDbSet = new Mock<DbSet<TemplateQuestion>>();
        _mockEntityTypeDbSet = new Mock<DbSet<QuestionnaireTemplateEntityType>>();
        _mockConditionDbSet = new Mock<DbSet<QuestionCondition>>();

        _mockContext.Setup(x => x.QuestionnaireTemplates).Returns(_mockTemplateDbSet.Object);
        _mockContext.Setup(x => x.TemplateQuestions).Returns(_mockQuestionDbSet.Object);
        _mockContext.Setup(x => x.QuestionnaireTemplateEntityTypes).Returns(_mockEntityTypeDbSet.Object);
        _mockContext.Setup(x => x.QuestionConditions).Returns(_mockConditionDbSet.Object);

        _service = new TemplateValidationService(_mockContext.Object);
    }

    [Test]
    public async Task ValidateForActivationAsync_TemplateNotFound_ReturnsInvalid()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var templates = new List<QuestionnaireTemplate>().AsQueryable();
        MockDbSet(_mockTemplateDbSet, templates);

        // Act
        var result = await _service.ValidateForActivationAsync(templateId);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ValidationErrors.Count, Is.EqualTo(1));
        Assert.That(result.ValidationErrors.Any(e => e.Contains("Template not found")), Is.True);
    }

    [Test]
    public async Task ValidateForActivationAsync_TemplateAlreadyActive_ReturnsInvalid()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var template = CreateValidTemplate(templateId);
        template.Status = TemplateStatus.Active;

        var templates = new List<QuestionnaireTemplate> { template }.AsQueryable();
        MockDbSet(_mockTemplateDbSet, templates);

        // Act
        var result = await _service.ValidateForActivationAsync(templateId);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ValidationErrors.Count, Is.EqualTo(1));
        Assert.That(result.ValidationErrors[0], Does.Contain("already active"));
    }

    [Test]
    public async Task ValidateForActivationAsync_MissingTitle_ReturnsInvalid()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var template = CreateValidTemplate(templateId);
        template.Title = "";

        var templates = new List<QuestionnaireTemplate> { template }.AsQueryable();
        MockDbSet(_mockTemplateDbSet, templates);
        SetupValidQuestions(templateId);
        SetupValidEntityTypes(templateId);
        SetupValidConditions();

        // Act
        var result = await _service.ValidateForActivationAsync(templateId);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ValidationErrors.Any(e => e.Contains("Template title is required")), Is.True);
    }

    [Test]
    public async Task ValidateForActivationAsync_NoQuestions_ReturnsInvalid()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var template = CreateValidTemplate(templateId);

        var templates = new List<QuestionnaireTemplate> { template }.AsQueryable();
        MockDbSet(_mockTemplateDbSet, templates);

        // Setup empty questions
        var questions = new List<TemplateQuestion>().AsQueryable();
        MockDbSet(_mockQuestionDbSet, questions);

        SetupValidEntityTypes(templateId);
        SetupValidConditions();

        // Act
        var result = await _service.ValidateForActivationAsync(templateId);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ValidationErrors.Any(e => e.Contains("Template must have at least one question")), Is.True);
    }

    [Test]
    public async Task ValidateForActivationAsync_ValidTemplate_ReturnsValid()
    {
        // Arrange
        var templateId = Guid.NewGuid();
        var template = CreateValidTemplate(templateId);

        var templates = new List<QuestionnaireTemplate> { template }.AsQueryable();
        MockDbSet(_mockTemplateDbSet, templates);
        SetupValidQuestions(templateId);
        SetupValidEntityTypes(templateId);
        SetupValidConditions();

        // Act
        var result = await _service.ValidateForActivationAsync(templateId);

        // Assert
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ValidationErrors, Is.Empty);
    }

    #region Helper Methods

    private QuestionnaireTemplate CreateValidTemplate(Guid templateId)
    {
        return new QuestionnaireTemplate
        {
            Id = templateId,
            Title = "Test Template",
            Description = "Test Description",
            PrimaryLanguage = "en",
            ExpirationMonths = 12,
            Status = TemplateStatus.Draft,
            Version = "1.0",
            TargetEntityTypes = new List<QuestionnaireTemplateEntityType>
            {
                new QuestionnaireTemplateEntityType
                {
                    Id = Guid.NewGuid(),
                    QuestionnaireTemplateId = templateId,
                    EntityType = EntityType.Supplier
                }
            }
        };
    }

    private void SetupValidQuestions(Guid templateId)
    {
        var questions = new List<TemplateQuestion>
        {
            new TemplateQuestion
            {
                Id = Guid.NewGuid(),
                QuestionnaireTemplateId = templateId,
                Text = "Sample question?",
                Order = 1,
                Type = QuestionType.YesNo
            }
        }.AsQueryable();
        MockDbSet(_mockQuestionDbSet, questions);
    }

    private void SetupValidEntityTypes(Guid templateId)
    {
        var entityTypes = new List<QuestionnaireTemplateEntityType>
        {
            new QuestionnaireTemplateEntityType
            {
                Id = Guid.NewGuid(),
                QuestionnaireTemplateId = templateId,
                EntityType = EntityType.Supplier
            }
        }.AsQueryable();
        MockDbSet(_mockEntityTypeDbSet, entityTypes);
    }

    private void SetupValidConditions()
    {
        var conditions = new List<QuestionCondition>().AsQueryable();
        MockDbSet(_mockConditionDbSet, conditions);
    }

    private static void MockDbSet<T>(Mock<DbSet<T>> mockDbSet, IQueryable<T> data) where T : class
    {
        mockDbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(data.Provider);
        mockDbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(data.Expression);
        mockDbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(data.ElementType);
        mockDbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
    }

    #endregion
}