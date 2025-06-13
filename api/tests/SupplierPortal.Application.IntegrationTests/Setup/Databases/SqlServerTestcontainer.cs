using Testcontainers.MsSql;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.Databases;

internal sealed class SqlServerTestcontainer : BaseSqlTestContainer
{
    internal SqlServerTestcontainer()
    {
        Container = new MsSqlBuilder()
            .WithHostname(DbHostname)
            .WithPassword(DbPassword)
            .WithPortBinding(Port)
            .WithImage("mcr.microsoft.com/azure-sql-edge:latest")
            .Build();

        ConnectionString = "";
    }
}
