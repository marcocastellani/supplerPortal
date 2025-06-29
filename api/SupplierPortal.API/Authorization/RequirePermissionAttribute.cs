using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using System.Security.Claims;

namespace Remira.UCP.SupplierPortal.API.Authorization;

/// <summary>
/// Authorization attribute that checks permissions using OpenFGA
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequirePermissionAttribute : Attribute, IAsyncAuthorizationFilter
{
    private readonly string _relation;
    private readonly string _objectType;
    private readonly string? _objectId;

    /// <summary>
    /// Initializes a new instance of the RequirePermissionAttribute
    /// </summary>
    /// <param name="relation">The required relation/permission</param>
    /// <param name="objectType">The type of object to check permission against</param>
    /// <param name="objectId">Optional specific object ID, if null will try to get from route or use "default"</param>
    public RequirePermissionAttribute(string relation, string objectType, string? objectId = null)
    {
        _relation = relation;
        _objectType = objectType;
        _objectId = objectId;
    }

    /// <summary>
    /// Performs the authorization check using OpenFGA
    /// </summary>
    /// <param name="context">The authorization filter context</param>
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        try
        {
            var authorizationService = context.HttpContext.RequestServices.GetRequiredService<IOpenFgaAuthorizationService>();
            var currentUserService = context.HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

            var userId = currentUserService.UserId ??
                        context.HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userId))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // If objectId is not provided, try to get it from route
            var objectId = _objectId;
            if (string.IsNullOrEmpty(objectId))
            {
                objectId = context.RouteData.Values["id"]?.ToString();
            }

            if (string.IsNullOrEmpty(objectId))
            {
                // For some permissions, we might not need an objectId
                objectId = "default";
            }

            var hasPermission = await authorizationService.CheckPermissionAsync(
                userId,
                _relation,
                _objectType,
                objectId);

            if (!hasPermission)
            {
                context.Result = new ForbidResult();
            }
        }
        catch (InvalidOperationException)
        {
            // Service not registered
            context.Result = new ObjectResult("Authorization service not configured")
            {
                StatusCode = 500
            };
        }
        catch (Exception)
        {
            // Other authorization errors
            context.Result = new ObjectResult("Authorization error occurred")
            {
                StatusCode = 500
            };
        }
    }
}

/// <summary>
/// Attribute to require a specific role
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireRoleAttribute : Attribute, IAsyncAuthorizationFilter
{
    private readonly string[] _roles;

    /// <summary>
    /// Initializes a new instance of the RequireRoleAttribute
    /// </summary>
    /// <param name="roles">The required roles (user must have at least one)</param>
    public RequireRoleAttribute(params string[] roles)
    {
        _roles = roles;
    }

    /// <summary>
    /// Performs the role-based authorization check
    /// </summary>
    /// <param name="context">The authorization filter context</param>
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        try
        {
            var authorizationService = context.HttpContext.RequestServices.GetRequiredService<IOpenFgaAuthorizationService>();
            var currentUserService = context.HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

            var userId = currentUserService.UserId ??
                        context.HttpContext.User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userId))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var userRoles = await authorizationService.GetUserRolesAsync(userId);

            if (!_roles.Any(role => userRoles.Contains(role)))
            {
                context.Result = new ForbidResult();
            }
        }
        catch (InvalidOperationException)
        {
            // Service not registered
            context.Result = new ObjectResult("Authorization service not configured")
            {
                StatusCode = 500
            };
        }
        catch (Exception)
        {
            // Other authorization errors
            context.Result = new ObjectResult("Authorization error occurred")
            {
                StatusCode = 500
            };
        }
    }
}