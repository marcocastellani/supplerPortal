using System.Runtime.InteropServices;
using Bogus;
using MediatR;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.Databases;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup.RabbitMq;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;
using Respawn;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Setup;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests;

[SetUpFixture]
public partial class Testing
{
    private static WebApplicationFactory<Program> _factory = null!;
    private static IServiceScopeFactory _scopeFactory = null!;
    private static Respawner _checkpoint = null!;
    private static BaseSqlTestContainer? _container;
    private static RabbitMqTestContainer? _rabbitMqContainer;

    [OneTimeSetUp]
    public async Task RunBeforeAnyTests()
    {
        TestContext.Progress.WriteLine("OneTimeSetup started");

        if (RuntimeInformation.OSArchitecture == Architecture.Arm ||
            RuntimeInformation.OSArchitecture == Architecture.Arm64)
        {
            _container = new SqlEdgeTestcontainer();
        }
        else
        {
            _container = new SqlServerTestcontainer();
        }
        _rabbitMqContainer = new RabbitMqTestContainer();


        TestContext.Progress.WriteLine("Starting container...");
        await _rabbitMqContainer.InitializeAsync();
        await _container.InitializeAsync();

        _factory = new CustomWebApplicationFactory(_container.ConnectionString);
        _scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();

        _checkpoint = await Respawner.CreateAsync(_container.ConnectionString, new RespawnerOptions()
        {
            TablesToIgnore = new Respawn.Graph.Table[]
            {
                "__EFMigrationsHistory"
            }
        });
    }

    internal static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
    {
        using var scope = _scopeFactory.CreateScope();

        var mediator = scope.ServiceProvider.GetRequiredService<ISender>();

        return await mediator.Send(request);
    }
    internal static async Task SendAsync(IBaseRequest request)
    {
        using var scope = _scopeFactory.CreateScope();

        var mediator = scope.ServiceProvider.GetRequiredService<ISender>();

        await mediator.Send(request);
    }

    internal static async Task ResetState()
    {
        var connectionString = _container?.ConnectionString;
        if (connectionString is not null)
            await _checkpoint.ResetAsync(connectionString);
    }

    internal static ApplicationDbContext GetContext()
    {
        var scope = _scopeFactory.CreateScope();

        return scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    }

    internal static async Task<TEntity?> FindAsync<TEntity>(bool loadNavigation = false, params object[] keyValues)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        var entity = await context.FindAsync<TEntity>(keyValues);

        if (loadNavigation && entity is not null)
        {
            foreach (var navigation in context.Entry(entity).Navigations)
            {
                navigation.Load();
            }
        }

        return entity;
    }

    internal static async Task AddAsync<TEntity>(TEntity entity)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        context.Add(entity);

        await context.SaveChangesAsync();
    }

    internal static async Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        context.AddRange(entities);

        await context.SaveChangesAsync();
    }

    internal static async Task UpdateAsync<TEntity>(TEntity entity)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        context.Update(entity);

        await context.SaveChangesAsync();
    }

    internal static async Task<int> CountAsync<TEntity>() where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        return await context.Set<TEntity>().CountAsync();
    }

    [OneTimeTearDown]
    public async Task RunAfterAnyTests()
    {
        if (_container is not null)
            await _container.DisposeAsync();

        if (_rabbitMqContainer is not null)
            await _rabbitMqContainer.DisposeAsync();
    }

    public static async Task<(TCommand, TResponse)> SendCreateCommandAsync<TCommand, TResponse>(Faker<TCommand> fakeCommand)
        where TCommand : class, IRequest<TResponse>
    {
        var cmd = fakeCommand.Generate();
        var response = await SendAsync(cmd);
        return (cmd, response);
    }
}
