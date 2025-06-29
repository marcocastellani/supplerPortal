using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using System.Security.Claims;

namespace Remira.UCP.SupplierPortal.API.Controllers;

/// <summary>
/// Controller for authorization and permission checks
/// </summary>
[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AuthorizationController : MediatrBaseController
{
    private readonly IOpenFgaAuthorizationService _authorizationService;
    private readonly ICurrentUserService _currentUserService;

    public AuthorizationController(
        IOpenFgaAuthorizationService authorizationService,
        ICurrentUserService currentUserService)
    {
        _authorizationService = authorizationService;
        _currentUserService = currentUserService;
    }

    /// <summary>
    /// Gets the current user's roles
    /// </summary>
    [HttpGet("roles")]
    public async Task<ActionResult<List<string>>> GetUserRoles()
    {
        var userId = _currentUserService.UserId ?? HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var roles = await _authorizationService.GetUserRolesAsync(userId);
        return Ok(roles);
    }

    /// <summary>
    /// Gets accessible menu items for the current user
    /// </summary>
    [HttpGet("menu-items")]
    public async Task<ActionResult<List<string>>> GetAccessibleMenuItems()
    {
        var userId = _currentUserService.UserId ?? HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var menuItems = await _authorizationService.GetAccessibleMenuItemsAsync(userId);
        return Ok(menuItems);
    }

    /// <summary>
    /// Checks if the current user can view a specific menu item
    /// </summary>
    [HttpGet("menu-items/{menuItemId}/can-view")]
    public async Task<ActionResult<bool>> CanViewMenuItem(string menuItemId)
    {
        var userId = _currentUserService.UserId ?? HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var canView = await _authorizationService.CanViewMenuItemAsync(userId, menuItemId);
        return Ok(canView);
    }

    /// <summary>
    /// Gets accessible regions for the current user
    /// </summary>
    [HttpGet("regions")]
    public async Task<ActionResult<List<string>>> GetAccessibleRegions()
    {
        var userId = _currentUserService.UserId ?? HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var regions = await _authorizationService.GetAccessibleRegionsAsync(userId);
        return Ok(regions);
    }

    /// <summary>
    /// Checks permission for a specific resource
    /// </summary>
    [HttpPost("check-permission")]
    public async Task<ActionResult<bool>> CheckPermission([FromBody] CheckPermissionRequest request)
    {
        var userId = _currentUserService.UserId ?? HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var hasPermission = await _authorizationService.CheckPermissionAsync(
            userId,
            request.Relation,
            request.ObjectType,
            request.ObjectId);

        return Ok(hasPermission);
    }
}

/// <summary>
/// Request model for permission checks
/// </summary>
public class CheckPermissionRequest
{
    public string Relation { get; set; } = string.Empty;
    public string ObjectType { get; set; } = string.Empty;
    public string ObjectId { get; set; } = string.Empty;
}