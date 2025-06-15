using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;
using Remira.UCP.SupplierPortal.Application.Interfaces;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup;

/// <summary>
/// Test implementation of ICurrentUserService that returns a fixed user ID for integration tests
/// </summary>
public class TestCurrentUserService : ICurrentUserService
{
    public string? UserId => "test-admin-user-12345";
}

internal class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public string ContainerConnectionString { get; set; }
    public CustomWebApplicationFactory(string containerConnectionString)
    {
        ContainerConnectionString = containerConnectionString;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {

        builder.ConfigureAppConfiguration((context, configBuilder) =>
        {

            configBuilder
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();
        });

        builder.ConfigureServices((builder, services) =>
        {
            services.Remove<DbContextOptions<ApplicationDbContext>>()
                    .AddDbContext<ApplicationDbContext>((sp, options) =>
                        options.UseSqlServer(ContainerConnectionString,
                            builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            // Configure test CurrentUserService to return a fixed user ID
            services.Remove<ICurrentUserService>()
                    .AddScoped<ICurrentUserService, TestCurrentUserService>();

            services.EnsureDbCreated<ApplicationDbContext>();
        });
    }
}
