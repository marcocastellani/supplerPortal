using Microsoft.AspNetCore.Mvc;
using Remira.UCP.SupplierPortal.API.Controllers.Base;
using Asp.Versioning;

namespace Remira.UCP.SupplierPortal.API.Controllers;

//Controller for Dapr Service Bus Events

/// <summary>
/// Controller for handling integration events through Dapr Service Bus.
/// </summary>
[Route("api/v1/[controller]")]
[ApiController]
public class IntegrationEventController : ControllerBase
{
    // TODO: Implement integration event handlers when required
}
