namespace Remira.UCP.SupplierPortal.Application.Interfaces;

/// <summary>
/// Service for handling fine-grained authorization using OpenFGA.
/// 
/// IMPORTANT: This interface is named IOpenFgaAuthorizationService to avoid naming conflicts 
/// with Microsoft.AspNetCore.Authorization.IAuthorizationService. 
/// 
/// Always use the full interface name IOpenFgaAuthorizationService when:
/// - Registering in DI container
/// - Injecting into constructors
/// - Resolving from service provider
/// 
/// This ensures no ambiguity with ASP.NET Core's built-in authorization service.
/// </summary>
public interface IOpenFgaAuthorizationService
{
    /// <summary>
    /// Checks if a user has permission to perform an action on a resource
    /// </summary>
    Task<bool> CheckPermissionAsync(string userId, string relation, string objectType, string objectId);

    /// <summary>
    /// Gets the user's roles within an organization
    /// </summary>
    Task<List<string>> GetUserRolesAsync(string userId, string organizationId);

    /// <summary>
    /// Checks if a user can view a specific menu item
    /// </summary>
    Task<bool> CanViewMenuItemAsync(string userId, string menuItemId);

    /// <summary>
    /// Gets all menu items accessible by a user
    /// </summary>
    Task<List<string>> GetAccessibleMenuItemsAsync(string userId);

    /// <summary>
    /// Adds a user to a role in an organization
    /// </summary>
    Task AddUserToRoleAsync(string userId, string role, string organizationId);

    /// <summary>
    /// Removes a user from a role in an organization
    /// </summary>
    Task RemoveUserFromRoleAsync(string userId, string role, string organizationId);

    /// <summary>
    /// Assigns ownership of a resource to a user
    /// </summary>
    Task AssignResourceOwnershipAsync(string userId, string resourceType, string resourceId);

    /// <summary>
    /// Checks if a user can view entities in a specific region
    /// </summary>
    Task<bool> CanViewEntitiesInRegionAsync(string userId, string regionId);

    /// <summary>
    /// Gets regions accessible by a user
    /// </summary>
    Task<List<string>> GetAccessibleRegionsAsync(string userId);
}