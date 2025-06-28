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

    public RequirePermissionAttribute(string relation, string objectType, string? objectId = null)
    {
        _relation = relation;
        _objectType = objectType;
        _objectId = objectId;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var authorizationService = context.HttpContext.RequestServices.GetService<IAuthorizationService>();
        var currentUserService = context.HttpContext.RequestServices.GetService<ICurrentUserService>();

        if (authorizationService == null || currentUserService == null)
        {
            context.Result = new StatusCodeResult(500);
            return;
        }

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
}

/// <summary>
/// Attribute to require a specific role
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireRoleAttribute : Attribute, IAsyncAuthorizationFilter
{
    private readonly string[] _roles;

    public RequireRoleAttribute(params string[] roles)
    {
        _roles = roles;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var authorizationService = context.HttpContext.RequestServices.GetService<IAuthorizationService>();
        var currentUserService = context.HttpContext.RequestServices.GetService<ICurrentUserService>();

        if (authorizationService == null || currentUserService == null)
        {
            context.Result = new StatusCodeResult(500);
            return;
        }

        var userId = currentUserService.UserId ?? 
                    context.HttpContext.User.FindFirstValue(ClaimTypes.Email);

        if (string.IsNullOrEmpty(userId))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var userRoles = await authorizationService.GetUserRolesAsync(userId, "remira");
        
        if (!_roles.Any(role => userRoles.Contains(role)))
        {
            context.Result = new ForbidResult();
        }
    }
}