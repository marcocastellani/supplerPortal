using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Remira.UCP.SupplierPortal.API.Services;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;

namespace Remira.UCP.SupplierPortal.API;

public static class ConfigureServices
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<ICurrentUserService, CurrentUserService>();
        return services;
    }

    public static IServiceCollection AddCustomHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddHealthChecks()
            .AddCheck("self", () => HealthCheckResult.Healthy())
            .AddDbContextCheck<ApplicationDbContext>()
            .AddSqlServer(configuration.GetSection("UcpSupplierPortal").GetConnectionString("SupplierPortalDb")!,
                "SELECT 1", timeout: TimeSpan.FromSeconds(30));

        return services;
    }
}
