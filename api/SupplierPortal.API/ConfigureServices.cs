using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using Remira.UCP.SupplierPortal.API.Services;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;

namespace Remira.UCP.SupplierPortal.API;

/// <summary>
/// Extension methods for configuring API-specific services in the dependency injection container.
/// </summary>
public static class ConfigureServices
{
    /// <summary>
    /// Adds API-specific services to the service collection.
    /// </summary>
    /// <param name="services">The service collection to add services to.</param>
    /// <returns>The service collection for method chaining.</returns>
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        // HTTP context accessor required for accessing current HTTP context
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        // Current user service for extracting user information from HTTP context
        // Registered as Singleton for performance (stateless service)
        services.AddSingleton<ICurrentUserService, CurrentUserService>();

        return services;
    }

    /// <summary>
    /// Adds JWT Bearer authentication configuration.
    /// </summary>
    /// <param name="services">The service collection to add services to.</param>
    /// <param name="configuration">The application configuration.</param>
    /// <returns>The service collection for method chaining.</returns>
    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        // Get authentication configuration from appsettings
        var keycloakBaseUrl = configuration["UcpCommon:Auth:KeycloakBaseUrl"];
        var keycloakRealm = configuration["UcpCommon:Auth:KeycloakRealm"];
        var audience = configuration["UcpSupplierPortal:Auth:Audience"];

        if (string.IsNullOrEmpty(keycloakBaseUrl) || string.IsNullOrEmpty(keycloakRealm))
        {
            throw new InvalidOperationException("Keycloak configuration is missing. Please check UcpCommon:Auth settings.");
        }

        // Construct the authority URL
        var authority = $"{keycloakBaseUrl}/realms/{keycloakRealm}";

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = authority;
            options.RequireHttpsMetadata = !System.Diagnostics.Debugger.IsAttached; // Allow HTTP in development
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = false, // Keycloak typically doesn't require audience validation for public clients
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.FromMinutes(5), // Allow 5 minutes clock skew
                NameClaimType = "preferred_username",
                RoleClaimType = "realm_access.roles"
            };

            // Add audience validation if specified
            if (!string.IsNullOrEmpty(audience))
            {
                options.TokenValidationParameters.ValidAudiences = new[] { audience };
                options.TokenValidationParameters.ValidateAudience = true;
            }

            // Log authentication events for debugging
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    context.HttpContext.Items["AuthenticationError"] = context.Exception.Message;
                    return Task.CompletedTask;
                },
                OnTokenValidated = context =>
                {
                    // Log successful token validation
                    var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                    logger.LogDebug("JWT token validated successfully for user: {User}",
                        context.Principal?.Identity?.Name ?? "Unknown");
                    return Task.CompletedTask;
                },
                OnChallenge = context =>
                {
                    // Log authentication challenges
                    var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                    logger.LogWarning("JWT authentication challenge: {Error}", context.Error ?? "No error specified");
                    return Task.CompletedTask;
                }
            };
        });

        services.AddAuthorization();

        return services;
    }

    /// <summary>
    /// Adds custom health checks to the service collection including database connectivity checks.
    /// </summary>
    /// <param name="services">The service collection to add services to.</param>
    /// <param name="configuration">The application configuration.</param>
    /// <returns>The service collection for method chaining.</returns>
    public static IServiceCollection AddCustomHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHealthChecks()
            .AddCheck("self", () => HealthCheckResult.Healthy())
            .AddSqlServer(configuration.GetSection("UcpSupplierPortal").GetConnectionString("SupplierPortalDb")!,
                "SELECT 1", timeout: TimeSpan.FromSeconds(30));

        return services;
    }
}
