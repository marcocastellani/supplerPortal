using System.Text.Json.Serialization;
using HealthChecks.UI.Client;
using Remira.UCP.SupplierPortal.API;
using Remira.UCP.SupplierPortal.Application;
using Remira.UCP.SupplierPortal.Infrastructure;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;
using Remira.UCP.Utilities.Errors;
using Remira.UCP.Utilities.HealthChecks;
using Remira.UCP.Utilities.Swagger.Versioning;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddDapr()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCustomHealthChecks(builder.Configuration);
builder.Services.AddApplicationInsights(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApiServices();
builder.Services.AddEndpointsApiExplorer();
builder.Services.SetupQueryParameterVersioning();

// Add CORS configuration for development
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4280", "http://localhost:4281", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCloudEvents();
app.MapCustomHealthChecks("/hc", "/liveness", UIResponseWriter.WriteHealthCheckUIResponse);
app.MapControllers();
app.MapSubscribeHandler();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseCors("DevelopmentCorsPolicy");
}

// Database migration and seeding
app.MigrateDatabase();

// Seed test data in development environment
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await Remira.UCP.SupplierPortal.API.Data.DatabaseSeeder.SeedTestDataAsync(context);
}

app.UseHttpsRedirection();
app.UseErrorMiddleware();
app.UseAuthentication();
app.UseAuthorization();

try
{
    app.Logger.LogInformation("Starting web host ({ApplicationName})...", builder.Configuration["AppName"]);
    await app.RunAsync();
}
catch (Exception e) when (e is not OperationCanceledException && e.GetType().Name != "HostAbortedException")
{
    app.Logger.LogCritical(e, "Host terminated unexpectedly ({ApplicationName})...", builder.Configuration["AppName"]);
}
finally
{
    Log.CloseAndFlush();
}

