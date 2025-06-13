using MediatR;
using Moq;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.Dapr.IntegrationEvents;

[TestFixture]
public class IntegrationEventTests
{
    private Mock<IMediator> _mediatorMock = null!;
    //private IntegrationEventHandler _handler = null!;

    [SetUp]
    public void Setup()
    {
        _mediatorMock = new Mock<IMediator>();
        //_handler = new IntegrationEventHandler(_mediatorMock.Object);
    }

    [Test]
    public async Task HandleAsync_SendsHandleRenewalCommand()
    {
        // Arrange
        //var IntegrationEventEvent = new IntegrationEvent();

        // Act
        //await _handler.HandleAsync(IntegrationEventEvent);

        // Assert
        //_mediatorMock.Verify(x => x.Send(It.IsAny<Command>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}

