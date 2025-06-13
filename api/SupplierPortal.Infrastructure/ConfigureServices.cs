using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence.Interceptors;
using Remira.UCP.SupplierPortal.Infrastructure.Services;

namespace Remira.UCP.SupplierPortal.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // DbContext
        var connectionString = configuration.GetSection("UcpSupplierPortal").GetConnectionString("SupplierPortalDb")!;

        services.AddDbContext<ApplicationDbContext>(
            options => options.UseSqlServer(
               connectionString,
                sqlServerOptionsAction: sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 10,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                }));

        services.AddScoped<AuditableEntitySaveChangesInterceptor>();
        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        // Others
        services.AddTransient<IDateTime, DateTimeService>();

        return services;
    }
}
