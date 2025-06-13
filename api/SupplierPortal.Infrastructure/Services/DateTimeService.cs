using Remira.UCP.SupplierPortal.Application.Interfaces;

namespace Remira.UCP.SupplierPortal.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
