namespace Remira.UCP.SupplierPortal.Application.Common.Extensions;

public static class DateTimeExtensions
{
    public static DateTime AddWeeks(this DateTime date, int weeks)
    {
        return date.AddDays(weeks * 7);
    }
}
