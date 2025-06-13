using MediatR;
using Remira.UCP.Utilities.ApiController.Controllers;

namespace Remira.UCP.SupplierPortal.API.Controllers.Base;

public abstract class MediatrBaseController : ApiControllerBase
{
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
