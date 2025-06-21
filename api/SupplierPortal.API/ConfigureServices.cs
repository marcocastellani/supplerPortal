using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Diagnostics.HealthChecks;
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
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<ICurrentUserService, CurrentUserService>();
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
