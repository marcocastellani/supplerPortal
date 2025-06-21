using AutoMapper;

namespace Remira.UCP.SupplierPortal.Application.Common.Mappings;

public class ApplicationMappingProfile : MappingProfile
{
    public ApplicationMappingProfile()
        : base(typeof(ApplicationMappingProfile).Assembly)
    {
        // Empty
    }
}
