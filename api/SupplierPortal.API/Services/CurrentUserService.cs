using System.Security.Claims;
using Remira.UCP.SupplierPortal.Application.Interfaces;

namespace Remira.UCP.SupplierPortal.API.Services;

/// <summary>
/// Service for retrieving current user information from the HTTP context.
/// </summary>
public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrentUserService"/> class.
    /// </summary>
    /// <param name="httpContextAccessor">The HTTP context accessor for retrieving user claims.</param>
    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    /// Gets the current user's ID from the authentication claims.
    /// </summary>
    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
}
