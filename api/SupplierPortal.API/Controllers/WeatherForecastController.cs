using Microsoft.AspNetCore.Authorization;
using Remira.UCP.SupplierPortal.API.Controllers.Base;

namespace Remira.UCP.SupplierPortal.API.Controllers;

[Authorize]
public class WeatherForecastController : MediatrBaseController
{


    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
    }

}