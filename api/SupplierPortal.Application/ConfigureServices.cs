using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;
using Remira.UCP.SupplierPortal.Application.Services;
using Remira.UCP.Utilities.MediatR.Behaviours;

namespace Remira.UCP.SupplierPortal.Application;

public static class ConfigureServices
{
    public static IServiceCollection AddApplicationServices(
       this IServiceCollection services)
    {
        var assemblies = AppDomain.CurrentDomain
            .GetAssemblies()
            .Where(w => !w.IsDynamic);

        services.AddValidatorsFromAssemblies(assemblies);

        services.AddMediatR(c =>
        {
            c.RegisterServicesFromAssembly(typeof(ConfigureServices).Assembly);
            c.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            c.AddBehavior(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
        });

        services.AddAutoMapper(typeof(ApplicationMappingProfile).Assembly);

        // Register application services
        services.AddScoped<ITemplateValidationService, TemplateValidationService>();

        return services;
    }
}
