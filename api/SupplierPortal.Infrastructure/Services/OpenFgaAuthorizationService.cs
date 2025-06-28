using OpenFga.Sdk.Client;
using OpenFga.Sdk.Client.Model;
using OpenFga.Sdk.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Remira.UCP.SupplierPortal.Application.Interfaces;

namespace Remira.UCP.SupplierPortal.Infrastructure.Services;

/// <summary>
/// Implementation of authorization service using OpenFGA
/// </summary>
public class OpenFgaAuthorizationService : IAuthorizationService
{
    private readonly OpenFgaClient _fgaClient;
    private readonly ILogger<OpenFgaAuthorizationService> _logger;
    private readonly string _storeId;
    private readonly string _organizationId;

    public OpenFgaAuthorizationService(
        IConfiguration configuration,
        ILogger<OpenFgaAuthorizationService> logger)
    {
        _logger = logger;
        _storeId = configuration["OpenFga:StoreId"] ?? throw new InvalidOperationException("OpenFGA StoreId not configured");
        _organizationId = configuration["OpenFga:OrganizationId"] ?? "remira";
        
        var apiUrl = configuration["OpenFga:ApiUrl"] ?? "http://localhost:8080";
        
        var clientConfig = new ClientConfiguration
        {
            ApiUrl = apiUrl,
            StoreId = _storeId,
            AuthorizationModelId = configuration["OpenFga:ModelId"]
        };
        
        _fgaClient = new OpenFgaClient(clientConfig);
    }

    public async Task<bool> CheckPermissionAsync(string userId, string relation, string objectType, string objectId)
    {
        try
        {
            var body = new ClientCheckRequest
            {
                User = $"user:{userId}",
                Relation = relation,
                Object = $"{objectType}:{objectId}"
            };

            var response = await _fgaClient.Check(body);
            return response.Allowed ?? false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking permission for user {UserId} on {ObjectType}:{ObjectId}", 
                userId, objectType, objectId);
            return false;
        }
    }

    public async Task<List<string>> GetUserRolesAsync(string userId, string organizationId)
    {
        var roles = new List<string>();
        var roleRelations = new[] { "administrator", "supply_chain_operator", "sustainability_manager", "network_actor" };
        
        foreach (var role in roleRelations)
        {
            var hasRole = await CheckPermissionAsync(userId, role, "organization", organizationId);
            if (hasRole)
            {
                roles.Add(role);
            }
        }
        
        return roles;
    }

    public async Task<bool> CanViewMenuItemAsync(string userId, string menuItemId)
    {
        // First check direct permission
        var canView = await CheckPermissionAsync(userId, "can_view", "menu_item", menuItemId);
        if (canView) return true;
        
        // Check through organization roles
        var roles = await GetUserRolesAsync(userId, _organizationId);
        foreach (var role in roles)
        {
            var body = new ClientCheckRequest
            {
                User = $"organization:{_organizationId}#{role}",
                Relation = "can_view",
                Object = $"menu_item:{menuItemId}"
            };
            
            var response = await _fgaClient.Check(body);
            if (response.Allowed ?? false) return true;
        }
        
        return false;
    }

    public async Task<List<string>> GetAccessibleMenuItemsAsync(string userId)
    {
        var menuItems = new List<string>
        {
            "dashboard", "supply-network", "new-entity", "questionnaire-templates",
            "template-creation", "questionnaire-assignments", "settings",
            "kpi-dashboard", "kpi-thresholds", "audits", "documents"
        };
        
        var accessibleItems = new List<string>();
        
        foreach (var item in menuItems)
        {
            if (await CanViewMenuItemAsync(userId, item))
            {
                accessibleItems.Add(item);
            }
        }
        
        return accessibleItems;
    }

    public async Task AddUserToRoleAsync(string userId, string role, string organizationId)
    {
        var body = new ClientWriteRequest
        {
            Writes = new List<ClientTupleKey>
            {
                new ClientTupleKey
                {
                    User = $"user:{userId}",
                    Relation = role,
                    Object = $"organization:{organizationId}"
                }
            }
        };
        
        await _fgaClient.Write(body);
    }

    public async Task RemoveUserFromRoleAsync(string userId, string role, string organizationId)
    {
        var body = new ClientWriteRequest
        {
            Deletes = new List<ClientTupleKeyWithoutCondition>
            {
                new ClientTupleKeyWithoutCondition
                {
                    User = $"user:{userId}",
                    Relation = role,
                    Object = $"organization:{organizationId}"
                }
            }
        };
        
        await _fgaClient.Write(body);
    }

    public async Task AssignResourceOwnershipAsync(string userId, string resourceType, string resourceId)
    {
        var body = new ClientWriteRequest
        {
            Writes = new List<ClientTupleKey>
            {
                new ClientTupleKey
                {
                    User = $"user:{userId}",
                    Relation = "owner",
                    Object = $"{resourceType}:{resourceId}"
                }
            }
        };
        
        await _fgaClient.Write(body);
    }

    public async Task<bool> CanViewEntitiesInRegionAsync(string userId, string regionId)
    {
        return await CheckPermissionAsync(userId, "member", "region", regionId);
    }

    public async Task<List<string>> GetAccessibleRegionsAsync(string userId)
    {
        // This would typically query OpenFGA for all regions where user is a member
        // For now, returning a simple implementation
        var regions = new List<string> { "europe", "asia", "americas" };
        var accessibleRegions = new List<string>();
        
        foreach (var region in regions)
        {
            if (await CanViewEntitiesInRegionAsync(userId, region))
            {
                accessibleRegions.Add(region);
            }
        }
        
        return accessibleRegions;
    }
}