using MediatR;
using Remira.UCP.Utilities.ApiController.Controllers;

namespace Remira.UCP.SupplierPortal.API.Controllers.Base;

/// <summary>
/// Base controller that provides MediatR functionality for API controllers.
/// </summary>
public abstract class MediatrBaseController : ApiControllerBase
{
    private ISender _mediator = null!;

    /// <summary>
    /// Gets the MediatR sender instance for handling commands and queries.
    /// </summary>
    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
