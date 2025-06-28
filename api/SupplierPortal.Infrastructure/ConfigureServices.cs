using System.Text.Json;
using System.Text.Json.Serialization;
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
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
        };

        services.AddSingleton(jsonOptions);
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetSection("UcpSupplierPortal").GetConnectionString("SupplierPortalDb"),
                builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IApplicationDbContext, ApplicationDbContext>();
        services.AddScoped<IDateTime, DateTimeService>();
        
        // Register OpenFGA Authorization Service
        services.AddScoped<IAuthorizationService, OpenFgaAuthorizationService>();

        return services;
    }
}
