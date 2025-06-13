using NUnit.Framework.Interfaces;
using static Remira.UCP.SupplierPortal.Application.IntegrationTests.Testing;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;


[TestFixture]
public abstract class BaseTestFixture
{
    [SetUp]
    public async Task TestSetUp()
    {
        await ResetState();
    }

    [TearDown]
    public async Task TearDown()
    {
        if (TestContext.CurrentContext.Result.Outcome.Status != TestStatus.Passed)
        {
            await TestContext.Progress.WriteLineAsync(string.Format("Test Failed: {0}", TestContext.CurrentContext.Test.FullName));
            await TestContext.Progress.WriteLineAsync(string.Format("Reason: {0}", TestContext.CurrentContext.Result.Message));
        }
    }
}

