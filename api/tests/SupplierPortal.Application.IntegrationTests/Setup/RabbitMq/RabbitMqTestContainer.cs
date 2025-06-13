using Testcontainers.RabbitMq;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.RabbitMq;

public class RabbitMqTestContainer
{

    public RabbitMqContainer Container { get; init; }

    public string? RabbitMqConnectionString { get; set; }


    public RabbitMqTestContainer()
    {
        Container = new RabbitMqBuilder()
            .WithExposedPort(5672)
            .WithImage("rabbitmq:3-management-alpine")
            .Build();
    }


    public async Task InitializeAsync()
    {

        await Container.StartAsync()
            .ConfigureAwait(false);

        RabbitMqConnectionString = Container.GetConnectionString();
    }

    public async Task DisposeAsync()
    {
        await Container.StopAsync().ConfigureAwait(false);
        await Container.DisposeAsync().ConfigureAwait(false);
    }
}
