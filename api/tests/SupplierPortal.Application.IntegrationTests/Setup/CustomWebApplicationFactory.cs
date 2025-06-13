using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup;


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

            services.EnsureDbCreated<ApplicationDbContext>();
        });
    }
}
