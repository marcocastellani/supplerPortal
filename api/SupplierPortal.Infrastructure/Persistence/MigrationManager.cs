using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Remira.UCP.SupplierPortal.Infrastructure.Persistence;

public static class MigrationManager
{


    public static WebApplication MigrateDatabase(this WebApplication webApp)
    {

        using var scope = webApp.Services.CreateScope();
        using var appContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        //appContext.Database.EnsureDeleted();
        appContext.Database.Migrate();

        return webApp;

    }
}
