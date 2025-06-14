namespace Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;

/// <summary>
/// Simplified DTO for search results with distinguishing fields
/// </summary>
public class SupplyNetworkEntitySearchResultDto
{
    public Guid Id { get; set; }
    public string LegalName { get; set; } = string.Empty;
    public string? ExternalCode { get; set; }
    public string? ShortName { get; set; }
    public string EntityType { get; set; } = string.Empty;
    public string? VatCode { get; set; }
    public string? Email { get; set; }
    public string? ContactPersonName { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    
    /// <summary>
    /// Display text for UI (combines most relevant fields)
    /// </summary>
    public string DisplayText => BuildDisplayText();
    
    private string BuildDisplayText()
    {
        var parts = new List<string>();
        
        // Primary name
        parts.Add(LegalName);
        
        // Secondary identifier
        if (!string.IsNullOrEmpty(ExternalCode))
            parts.Add($"({ExternalCode})");
        else if (!string.IsNullOrEmpty(VatCode))
            parts.Add($"(VAT: {VatCode})");
        
        // Location info
        if (!string.IsNullOrEmpty(City))
        {
            var location = City;
            if (!string.IsNullOrEmpty(Country))
                location += $", {Country}";
            parts.Add($"[{location}]");
        }
        
        // Entity type for clarity
        parts.Add($"- {EntityType}");
        
        return string.Join(" ", parts);
    }
}
