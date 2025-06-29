namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;

/// <summary>
/// Response for template validation errors
/// </summary>
public class ValidationErrorResponse
{
    /// <summary>
    /// Indicates if the validation passed
    /// </summary>
    public bool IsValid { get; set; }

    /// <summary>
    /// List of validation error messages
    /// </summary>
    public List<string> Errors { get; set; } = new();

    /// <summary>
    /// Overall error message for the validation failure
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Create a successful validation response
    /// </summary>
    public static ValidationErrorResponse Success()
    {
        return new ValidationErrorResponse { IsValid = true, Message = "Validation passed" };
    }

    /// <summary>
    /// Create a failed validation response with errors
    /// </summary>
    public static ValidationErrorResponse Failed(List<string> errors, string? message = null)
    {
        return new ValidationErrorResponse
        {
            IsValid = false,
            Errors = errors,
            Message = message ?? "Template validation failed"
        };
    }

    /// <summary>
    /// Create a failed validation response with a single error
    /// </summary>
    public static ValidationErrorResponse Failed(string error, string? message = null)
    {
        return Failed(new List<string> { error }, message);
    }
}