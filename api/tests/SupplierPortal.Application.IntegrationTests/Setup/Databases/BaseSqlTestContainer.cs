using DotNet.Testcontainers.Containers;
using Microsoft.Data.SqlClient;
using Testcontainers.MsSql;
using Testcontainers.SqlEdge;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.Databases;

internal abstract class BaseSqlTestContainer
{
    public DockerContainer Container { get; init; } = null!;

    /// <summary>
    /// Please use this ConnectionString instead of the ConnectionString from the Container itself
    /// </summary>
    internal string ConnectionString { get; set; } = null!;

    internal const string DbPassword = "localpassword@!123";

    //Arbitrary port since 1433 could be mapped to a local SQL Server so it can't bind the Docker Port
    internal const int Port = 1436;

    internal const string DbHostname = "sqlIntegration";

    public async Task InitializeAsync()
    {
        await Container.StartAsync()
            .ConfigureAwait(false);

        var baseConnectionString = Container switch
        {
            MsSqlContainer msContainer => msContainer.GetConnectionString(),
            SqlEdgeContainer edgeContainer => edgeContainer.GetConnectionString(),
            _ => string.Empty
        };

        if (string.IsNullOrWhiteSpace(baseConnectionString))
            throw new NullReferenceException($"{nameof(ConnectionString)} Not Set");

        ConnectionString = new SqlConnectionStringBuilder(baseConnectionString)
        {
            TrustServerCertificate = true,
            IntegratedSecurity = false
        }.ConnectionString;
    }

    public async Task DisposeAsync()
    {
        await Container.StopAsync().ConfigureAwait(false);
        await Container.DisposeAsync().ConfigureAwait(false);
    }
}
