using Microsoft.AspNetCore.Mvc;

namespace Remira.UCP.SupplierPortal.API.Controllers;

//Controller for Dapr Service Bus Events

[Route("api/v1/[controller]")]
[ApiController]
public class IntegrationEventController : ControllerBase
{

    //[HttpPost("Test")]
    //[Topic(IEventBus.UCP_PUBSUB_NAME, nameof(TestIntegrationEvent))]
    //public Task HandleAsync(TestIntegrationEvent @event, [FromServices] TestIntegrationEventHandler handler)
    //=> handler.HandleAsync(@event);


}
