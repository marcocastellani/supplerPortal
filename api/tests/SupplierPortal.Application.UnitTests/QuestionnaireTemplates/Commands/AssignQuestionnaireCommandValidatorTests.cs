using FluentAssertions;
using FluentValidation.TestHelper;
using SupplierPortal.Application.QuestionnaireTemplates.Commands.AssignQuestionnaire;
using System;
using System.Collections.Generic;
using Xunit;

namespace SupplierPortal.Application.UnitTests.QuestionnaireTemplates.Commands;

public class AssignQuestionnaireCommandValidatorTests
{
    private readonly AssignQuestionnaireCommandValidator _validator;

    public AssignQuestionnaireCommandValidatorTests()
    {
        _validator = new AssignQuestionnaireCommandValidator();
    }

    [Fact]
    public void Validate_ValidCommand_ShouldNotHaveErrors()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High",
            Notes = "Valid notes",
            SendNotifications = true
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Validate_EmptyTemplateId_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.Empty,
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.TemplateId)
            .WithErrorMessage("Template ID is required.");
    }

    [Fact]
    public void Validate_NullEntityIds_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = null,
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.EntityIds)
            .WithErrorMessage("At least one entity must be selected.");
    }

    [Fact]
    public void Validate_EmptyEntityIds_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid>(),
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.EntityIds)
            .WithErrorMessage("At least one entity must be selected.");
    }

    [Fact]
    public void Validate_NullDueDate_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = null,
            Priority = "High"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.DueDate)
            .WithErrorMessage("Due date is required.");
    }

    [Fact]
    public void Validate_PastDueDate_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(-1),
            Priority = "High"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.DueDate)
            .WithErrorMessage("Due date must be in the future.");
    }

    [Fact]
    public void Validate_EmptyPriority_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = string.Empty
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Priority)
            .WithErrorMessage("Priority is required.");
    }

    [Fact]
    public void Validate_NotesTooLong_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High",
            Notes = new string('a', 1001) // 1001 characters
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Notes)
            .WithErrorMessage("Notes must not exceed 1000 characters.");
    }

    [Fact]
    public void Validate_NotesExactly1000Characters_ShouldNotHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "High",
            Notes = new string('a', 1000) // Exactly 1000 characters
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.Notes);
    }

    [Fact]
    public void Validate_InvalidPriority_ShouldHaveError()
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = "Invalid"
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Priority)
            .WithErrorMessage("Priority must be Low, Medium, or High.");
    }

    [Theory]
    [InlineData("Low")]
    [InlineData("Medium")]
    [InlineData("High")]
    public void Validate_ValidPriority_ShouldNotHaveError(string priority)
    {
        // Arrange
        var command = new AssignQuestionnaireCommand
        {
            TemplateId = Guid.NewGuid(),
            EntityIds = new List<Guid> { Guid.NewGuid() },
            DueDate = DateTime.UtcNow.AddDays(30),
            Priority = priority
        };

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldNotHaveValidationErrorFor(x => x.Priority);
    }
}