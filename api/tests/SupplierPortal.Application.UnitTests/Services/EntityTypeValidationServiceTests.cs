using FluentAssertions;
using Remira.UCP.SupplierPortal.Application.Services;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.Services;

public class EntityTypeValidationServiceTests
{
    private readonly EntityTypeValidationService _service;

    public EntityTypeValidationServiceTests()
    {
        _service = new EntityTypeValidationService();
    }

    [Test]
    public void ValidateEntityTypeCombination_WithValidCombination_ShouldReturnValid()
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site };

        // Act
        var result = _service.ValidateEntityTypeCombination(entityTypes);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Fact]
    public void ValidateEntityTypeCombination_WithEmptyList_ShouldReturnInvalid()
    {
        // Arrange
        var entityTypes = new List<EntityType>();

        // Act
        var result = _service.ValidateEntityTypeCombination(entityTypes);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain("At least one entity type must be specified");
    }

    [Fact]
    public void ValidateEntityTypeCombination_WithTooManyTypes_ShouldReturnInvalid()
    {
        // Arrange
        var entityTypes = new List<EntityType>
        {
            EntityType.Supplier,
            EntityType.SubSupplier,
            EntityType.Site,
            EntityType.Person,
            EntityType.CompanyGroup,
            EntityType.Supplier // Adding 6th type to exceed limit
        };

        // Act
        var result = _service.ValidateEntityTypeCombination(entityTypes);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain("Cannot select more than 5 entity types for a single template");
    }

    [Fact]
    public void ValidateEntityTypeCombination_WithPersonAndSite_ShouldHaveWarning()
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Person, EntityType.Site };

        // Act
        var result = _service.ValidateEntityTypeCombination(entityTypes);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Warnings.Should().Contain(w => w.Contains("Person and Site entity types"));
    }

    [Fact]
    public void ValidateEntityTypeForContext_Manufacturing_WithPerson_ShouldHaveWarning()
    {
        // Arrange
        const string context = "manufacturing";
        const EntityType entityType = EntityType.Person;

        // Act
        var result = _service.ValidateEntityTypeForContext(entityType, context);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Warnings.Should().Contain(w => w.Contains("may not be relevant for manufacturing"));
    }

    [Fact]
    public void ValidateEntityTypeForContext_Contact_WithSite_ShouldHaveWarning()
    {
        // Arrange
        const string context = "contact";
        const EntityType entityType = EntityType.Site;

        // Act
        var result = _service.ValidateEntityTypeForContext(entityType, context);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Warnings.Should().Contain(w => w.Contains("may not be appropriate for contact"));
    }

    [Fact]
    public void ValidateEntityTypeForContext_Environmental_WithPerson_ShouldReturnInvalid()
    {
        // Arrange
        const string context = "environmental";
        const EntityType entityType = EntityType.Person;

        // Act
        var result = _service.ValidateEntityTypeForContext(entityType, context);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain("Person entity type is not valid for environmental questionnaires");
    }

    [Fact]
    public void ValidateEntityTypesForTemplateCategory_Environmental_WithValidTypes_ShouldReturnValid()
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site };
        const string templateCategory = "environmental";

        // Act
        var result = _service.ValidateEntityTypesForTemplateCategory(entityTypes, templateCategory);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Fact]
    public void ValidateEntityTypesForTemplateCategory_Environmental_WithInvalidTypes_ShouldReturnInvalid()
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Person };
        const string templateCategory = "environmental";

        // Act
        var result = _service.ValidateEntityTypesForTemplateCategory(entityTypes, templateCategory);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.Contains("are not allowed for environmental templates"));
    }

    [Fact]
    public void GetRecommendedCombinations_ShouldReturnExpectedCombinations()
    {
        // Act
        var combinations = _service.GetRecommendedCombinations().ToList();

        // Assert
        combinations.Should().NotBeEmpty();
        combinations.Should().Contain(c => c.Name == "Environmental Assessment");
        combinations.Should().Contain(c => c.Name == "Contact Information");
        combinations.Should().Contain(c => c.Name == "Manufacturing Operations");
        combinations.Should().Contain(c => c.Name == "Universal Assessment");
    }

    [Theory]
    [InlineData("contact")]
    [InlineData("manufacturing")]
    [InlineData("quality")]
    public void ValidateEntityTypesForTemplateCategory_WithValidCategory_ShouldValidateCorrectly(string category)
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Supplier };

        // Act
        var result = _service.ValidateEntityTypesForTemplateCategory(entityTypes, category);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void ValidateEntityTypesForTemplateCategory_WithUnknownCategory_ShouldReturnValid()
    {
        // Arrange
        var entityTypes = new List<EntityType> { EntityType.Person };
        const string templateCategory = "unknown-category";

        // Act
        var result = _service.ValidateEntityTypesForTemplateCategory(entityTypes, templateCategory);

        // Assert
        result.IsValid.Should().BeTrue(); // Unknown categories should not restrict
    }
}