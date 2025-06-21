using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.Services;

/// <summary>
/// Service for validating entity type combinations and business rules
/// </summary>
public interface IEntityTypeValidationService
{
    /// <summary>
    /// Validates if the given entity types are a valid combination for questionnaire templates
    /// </summary>
    ValidationResult ValidateEntityTypeCombination(IEnumerable<EntityType> entityTypes);

    /// <summary>
    /// Validates if a specific entity type is valid for a given business context
    /// </summary>
    ValidationResult ValidateEntityTypeForContext(EntityType entityType, string context);

    /// <summary>
    /// Gets recommended entity type combinations for common business scenarios
    /// </summary>
    IEnumerable<EntityTypeCombination> GetRecommendedCombinations();

    /// <summary>
    /// Validates if an entity type combination is compatible with a template category
    /// </summary>
    ValidationResult ValidateEntityTypesForTemplateCategory(IEnumerable<EntityType> entityTypes, string templateCategory);
}

/// <summary>
/// Implementation of entity type validation service
/// </summary>
public class EntityTypeValidationService : IEntityTypeValidationService
{
    private readonly Dictionary<string, HashSet<EntityType>> _templateCategoryRules;
    private readonly HashSet<EntityTypeCombination> _invalidCombinations;
    private readonly Dictionary<string, EntityTypeCombination> _recommendedCombinations;

    public EntityTypeValidationService()
    {
        _templateCategoryRules = InitializeTemplateCategoryRules();
        _invalidCombinations = InitializeInvalidCombinations();
        _recommendedCombinations = InitializeRecommendedCombinations();
    }

    public ValidationResult ValidateEntityTypeCombination(IEnumerable<EntityType> entityTypes)
    {
        var entityTypeList = entityTypes.ToList();
        var result = new ValidationResult { IsValid = true };

        // Check if any entity types are provided
        if (!entityTypeList.Any())
        {
            result.IsValid = false;
            result.Errors.Add("At least one entity type must be specified");
            return result;
        }

        // Check for invalid combinations
        var combination = new EntityTypeCombination { EntityTypes = entityTypeList };

        foreach (var invalidCombination in _invalidCombinations)
        {
            if (ContainsInvalidCombination(entityTypeList, invalidCombination.EntityTypes))
            {
                result.IsValid = false;
                result.Errors.Add($"Invalid combination: {invalidCombination.Description}");
            }
        }

        // Business rule: Person entities should not be combined with Site entities for most cases
        if (entityTypeList.Contains(EntityType.Person) && entityTypeList.Contains(EntityType.Site))
        {
            result.Warnings.Add("Combining Person and Site entity types may not be appropriate for most questionnaire scenarios");
        }

        // Business rule: Limit maximum number of entity types
        if (entityTypeList.Count > 5)
        {
            result.IsValid = false;
            result.Errors.Add("Cannot select more than 5 entity types for a single template");
        }

        return result;
    }

    public ValidationResult ValidateEntityTypeForContext(EntityType entityType, string context)
    {
        var result = new ValidationResult { IsValid = true };

        switch (context.ToLowerInvariant())
        {
            case "manufacturing":
                if (entityType == EntityType.Person)
                {
                    result.Warnings.Add("Person entity type may not be relevant for manufacturing questionnaires");
                }
                break;

            case "contact":
                if (entityType == EntityType.Site)
                {
                    result.Warnings.Add("Site entity type may not be appropriate for contact questionnaires");
                }
                break;

            case "environmental":
                if (entityType == EntityType.Person)
                {
                    result.IsValid = false;
                    result.Errors.Add("Person entity type is not valid for environmental questionnaires");
                }
                break;
        }

        return result;
    }

    public IEnumerable<EntityTypeCombination> GetRecommendedCombinations()
    {
        return _recommendedCombinations.Values;
    }

    public ValidationResult ValidateEntityTypesForTemplateCategory(IEnumerable<EntityType> entityTypes, string templateCategory)
    {
        var result = new ValidationResult { IsValid = true };
        var entityTypeList = entityTypes.ToList();

        if (_templateCategoryRules.TryGetValue(templateCategory.ToLowerInvariant(), out var allowedTypes))
        {
            var invalidTypes = entityTypeList.Except(allowedTypes).ToList();

            if (invalidTypes.Any())
            {
                result.IsValid = false;
                result.Errors.Add($"Entity types {string.Join(", ", invalidTypes)} are not allowed for {templateCategory} templates");
            }
        }

        return result;
    }

    private static Dictionary<string, HashSet<EntityType>> InitializeTemplateCategoryRules()
    {
        return new Dictionary<string, HashSet<EntityType>>
        {
            ["environmental"] = new() { EntityType.Supplier, EntityType.SubSupplier, EntityType.Site, EntityType.CompanyGroup },
            ["contact"] = new() { EntityType.Supplier, EntityType.SubSupplier, EntityType.Person, EntityType.CompanyGroup },
            ["manufacturing"] = new() { EntityType.Supplier, EntityType.SubSupplier, EntityType.Site },
            ["compliance"] = new() { EntityType.Supplier, EntityType.SubSupplier, EntityType.Site, EntityType.CompanyGroup },
            ["quality"] = new() { EntityType.Supplier, EntityType.SubSupplier, EntityType.Site }
        };
    }

    private static HashSet<EntityTypeCombination> InitializeInvalidCombinations()
    {
        // Currently no invalid combinations, but structure in place for future business rules
        return new HashSet<EntityTypeCombination>();
    }

    private static Dictionary<string, EntityTypeCombination> InitializeRecommendedCombinations()
    {
        return new Dictionary<string, EntityTypeCombination>
        {
            ["environmental"] = new()
            {
                Name = "Environmental Assessment",
                Description = "Recommended for environmental compliance questionnaires",
                EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site }
            },
            ["contact"] = new()
            {
                Name = "Contact Information",
                Description = "Recommended for contact and communication questionnaires",
                EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Person }
            },
            ["manufacturing"] = new()
            {
                Name = "Manufacturing Operations",
                Description = "Recommended for manufacturing and production questionnaires",
                EntityTypes = new List<EntityType> { EntityType.Supplier, EntityType.Site }
            },
            ["all-entities"] = new()
            {
                Name = "Universal Assessment",
                Description = "Covers all entity types for comprehensive assessments",
                EntityTypes = Enum.GetValues<EntityType>().ToList()
            }
        };
    }

    private static bool ContainsInvalidCombination(List<EntityType> entityTypes, List<EntityType> invalidCombination)
    {
        return invalidCombination.All(entityTypes.Contains);
    }
}

/// <summary>
/// Result of entity type validation
/// </summary>
public class ValidationResult
{
    public bool IsValid { get; set; }
    public List<string> Errors { get; set; } = new();
    public List<string> Warnings { get; set; } = new();
}

/// <summary>
/// Represents a combination of entity types with metadata
/// </summary>
public class EntityTypeCombination
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<EntityType> EntityTypes { get; set; } = new();
}