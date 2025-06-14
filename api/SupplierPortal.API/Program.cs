using System.Reflection;
using System.Text.Json.Serialization;
using HealthChecks.UI.Client;
using Remira.UCP.SupplierPortal.API;
using Remira.UCP.SupplierPortal.Application;
using Remira.UCP.SupplierPortal.Infrastructure;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;
using Remira.UCP.Utilities.Authentication;
using Remira.UCP.Utilities.Authentication.Settings;
using Remira.UCP.Utilities.Azure.AzureServices;
using Remira.UCP.Utilities.Errors;
using Remira.UCP.Utilities.HealthChecks;
using Remira.UCP.Utilities.Swagger;
using Remira.UCP.Utilities.Swagger.Constants;
using Remira.UCP.Utilities.Swagger.Versioning;
using Remira.UCP.Utilities.TokenManagement.Options;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

const string ConfigKey = "UcpSupplierPortal";

//builder.AddAzureAppConfiguration<UcpCommon>(ConfigKey);

builder.Services.AddControllers().AddDapr()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

builder.Services.AddEndpointsApiExplorer();

//** Enable is using Loki
// builder.UseLogging("UcpSupplierPortal", builder.Configuration.GetSection($"{nameof(UcpCommon)}:Loki").Get<Loki>()?.Url ?? "", [
//     new() { Key = "Domain", Value = "UCP" },
//     new() { Key = "Environment", Value = builder.Environment.EnvironmentName }
// ]);

//builder.Services.AddServiceBusAsScoped(typeof(NotificationIntegrationEventHandler).Assembly);

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

//** Enable If UcpCommon is Used
// var common = builder.Configuration.GetSection($"{nameof(UcpCommon)}:Auth").Get<CommonAuthentication>();
// builder.Services.Configure<UcpCommon>(builder.Configuration.GetSection(nameof(UcpCommon)));
//
// string authority = OpenApiConstants.IsOpenApi(builder.Environment.EnvironmentName)
//     ? "https://idp"
//     : string.Empty;
//
// if (common != default)
//     authority = $"{common.KeycloakBaseUrl}/realms/{common.KeycloakRealm}";
//
// var authenticationSection = builder.Configuration.GetSection($"{ConfigKey}:Auth");
//
// builder.Services.AddUcpAuthentication(authority, authenticationSection.Get<AuthenticationSettings>(),
//     builder.Environment);

//** Document Assembly needs to be enabled in project properties under XML Documentation
// var documentAssembly = Assembly.GetAssembly(typeof(Program))!.GetName().Name!;
// builder.Services.AddSwagger(
//         authority,
//         builder.Configuration,
//         [OAuthFlows.AuthenticationCode],
//         documentAssembly,
//         OpenApiConstants.IsOpenApi(builder.Environment.EnvironmentName));

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

//if (app.Configuration.GetValue("IsLocal", "false") == "true")
{
    app.MigrateDatabase();
    
    // Seed test data in development environment
    if (app.Environment.IsDevelopment())
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await Remira.UCP.SupplierPortal.API.Data.DatabaseSeeder.SeedTestDataAsync(context);
    }
}

app.UseHttpsRedirection();

//** Enable If UcpCommon is Used
// app.UseSwaggerMiddleware(builder, common.SwaggerAuthorizationClientId);

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

