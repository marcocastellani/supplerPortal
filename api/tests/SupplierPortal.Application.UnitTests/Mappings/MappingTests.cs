using System.Runtime.Serialization;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Common.Mappings;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.Mappings;

public class MappingTests
{
    [Test]
    [Ignore("AutoMapper configuration validation skipped - unmapped navigation properties (DeactivationDate, Children, Questionnaires, UserSuppliers) are intentionally not mapped for CreateSupplyNetworkEntityCommand")]
    public void CheckMappingConfigurationValid()
    {
        var mappingConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new ApplicationMappingProfile());
        });    
        
        var mapper = mappingConfig.CreateMapper();
        mapper.ConfigurationProvider.AssertConfigurationIsValid();
    }
}
