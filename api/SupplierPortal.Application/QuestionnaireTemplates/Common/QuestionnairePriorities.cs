namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Constants for questionnaire priority levels
/// </summary>
public static class QuestionnairePriorities
{
    public const string Low = "Low";
    public const string Medium = "Medium";
    public const string High = "High";

    /// <summary>
    /// Validates if a priority value is valid
    /// </summary>
    public static bool IsValid(string priority)
    {
        return priority == Low || priority == Medium || priority == High;
    }

    /// <summary>
    /// Gets all valid priority values
    /// </summary>
    public static string[] GetAll()
    {
        return new[] { Low, Medium, High };
    }
}