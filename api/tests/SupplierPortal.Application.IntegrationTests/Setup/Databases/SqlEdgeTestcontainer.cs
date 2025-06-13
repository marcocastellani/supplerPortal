using Testcontainers.SqlEdge;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.Databases;

internal sealed class SqlEdgeTestcontainer : BaseSqlTestContainer
{
    internal SqlEdgeTestcontainer()
    {
        Container = new SqlEdgeBuilder()
            .WithHostname(DbHostname)
            .WithPassword(DbPassword)
            .WithPortBinding(Port)
            .WithImage("mcr.microsoft.com/azure-sql-edge:latest")
            .Build();

        ConnectionString = "";
    }
}
