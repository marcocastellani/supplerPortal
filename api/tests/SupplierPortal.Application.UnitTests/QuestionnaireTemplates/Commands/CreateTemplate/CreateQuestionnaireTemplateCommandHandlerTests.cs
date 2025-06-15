using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.CreateTemplate;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.UnitTests.QuestionnaireTemplates.Commands.CreateTemplate;

[TestFixture]
public class CreateQuestionnaireTemplateCommandHandlerTests
{
    private Mock<IApplicationDbContext> _mockContext = null!;
    private Mock<DbSet<QuestionnaireTemplate>> _mockDbSet = null!;
    private Mock<DbSet<QuestionnaireSection>> _mockSectionDbSet = null!;
    private Mock<IMapper> _mockMapper = null!;
    private Mock<ICurrentUserService> _mockCurrentUserService = null!;
    private Mock<IDateTime> _mockDateTime = null!;
    private CreateQuestionnaireTemplateCommandHandler _handler = null!;

    [SetUp]
    public void Setup()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockDbSet = new Mock<DbSet<QuestionnaireTemplate>>();
        _mockSectionDbSet = new Mock<DbSet<QuestionnaireSection>>();
        _mockMapper = new Mock<IMapper>();
        _mockCurrentUserService = new Mock<ICurrentUserService>();
        _mockDateTime = new Mock<IDateTime>();
        
        _mockContext.Setup(x => x.QuestionnaireTemplates).Returns(_mockDbSet.Object);
        _mockContext.Setup(x => x.QuestionnaireSections).Returns(_mockSectionDbSet.Object);
        
        // Setup mock for QuestionnaireSections to return empty list for queries
        var emptySections = new List<QuestionnaireSection>().AsQueryable();
        _mockSectionDbSet.As<IQueryable<QuestionnaireSection>>().Setup(m => m.Provider).Returns(emptySections.Provider);
        _mockSectionDbSet.As<IQueryable<QuestionnaireSection>>().Setup(m => m.Expression).Returns(emptySections.Expression);
        _mockSectionDbSet.As<IQueryable<QuestionnaireSection>>().Setup(m => m.ElementType).Returns(emptySections.ElementType);
        _mockSectionDbSet.As<IQueryable<QuestionnaireSection>>().Setup(m => m.GetEnumerator()).Returns(emptySections.GetEnumerator());
        
        _mockCurrentUserService.Setup(x => x.UserId).Returns("test-user-id");
        _mockDateTime.Setup(x => x.Now).Returns(new DateTime(2024, 1, 1, 10, 0, 0, DateTimeKind.Utc));
        
        _handler = new CreateQuestionnaireTemplateCommandHandler(
            _mockContext.Object,
            _mockMapper.Object,
            _mockCurrentUserService.Object,
            _mockDateTime.Object);
    }

    [Test]
    public async Task Handle_ValidCommand_ShouldCreateTemplate()
    {
        // Arrange
        var command = new CreateQuestionnaireTemplateCommand
        {
            Title = "Test Template",
            Description = "Test Description",
            TargetEntityTypeId = 1,
            PrimaryLanguage = "en",
            ExpirationMonths = 12,
            CertificateType = CertificateType.SelfAssessment,
            Sections = new List<CreateSectionDto>()
        };

        var expectedResponse = new QuestionnaireTemplateResponse
        {
            Id = Guid.NewGuid(),
            Title = "Test Template",
            Description = "Test Description",
            Status = TemplateStatus.Draft
        };

        _mockMapper.Setup(x => x.Map<QuestionnaireTemplateResponse>(It.IsAny<QuestionnaireTemplate>()))
            .Returns(expectedResponse);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Title.Should().Be("Test Template");
        result.Description.Should().Be("Test Description");
        result.Status.Should().Be(TemplateStatus.Draft);

        _mockDbSet.Verify(x => x.Add(It.IsAny<QuestionnaireTemplate>()), Times.Once);
        _mockContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test]
    public async Task Handle_NullCommand_ShouldThrowArgumentNullException()
    {
        // Arrange
        CreateQuestionnaireTemplateCommand? command = null;

        // Act & Assert
        await FluentActions.Invoking(() => _handler.Handle(command!, CancellationToken.None))
            .Should().ThrowAsync<ArgumentNullException>();
    }

    [Test]
    public async Task Handle_EmptyTitle_ShouldThrowArgumentException()
    {
        // Arrange
        var command = new CreateQuestionnaireTemplateCommand
        {
            Title = "",
            Description = "Test Description",
            TargetEntityTypeId = 1,
            CertificateType = CertificateType.SelfAssessment
        };

        // Act & Assert
        await FluentActions.Invoking(() => _handler.Handle(command, CancellationToken.None))
            .Should().ThrowAsync<ArgumentException>()
            .WithMessage("Template title cannot be empty*");
    }

    [Test]
    public async Task Handle_WithSections_ShouldCreateTemplateWithSections()
    {
        // Arrange
        var command = new CreateQuestionnaireTemplateCommand
        {
            Title = "Template with Sections",
            Description = "Test Description",
            TargetEntityTypeId = 1,
            CertificateType = CertificateType.InspectorRequired,
            Sections = new List<CreateSectionDto>
            {
                new CreateSectionDto
                {
                    Title = "Section 1",
                    Description = "First Section",
                    Order = 1
                },
                new CreateSectionDto
                {
                    Title = "Section 2",
                    Description = "Second Section",
                    Order = 2
                }
            }
        };

        var expectedResponse = new QuestionnaireTemplateResponse
        {
            Id = Guid.NewGuid(),
            Title = "Template with Sections",
            Description = "Test Description",
            Status = TemplateStatus.Draft
        };

        _mockMapper.Setup(x => x.Map<QuestionnaireTemplateResponse>(It.IsAny<QuestionnaireTemplate>()))
            .Returns(expectedResponse);

        QuestionnaireTemplate? capturedTemplate = null;
        _mockDbSet.Setup(x => x.Add(It.IsAny<QuestionnaireTemplate>()))
            .Callback<QuestionnaireTemplate>(template => capturedTemplate = template);

        var capturedSections = new List<QuestionnaireSection>();
        _mockSectionDbSet.Setup(x => x.Add(It.IsAny<QuestionnaireSection>()))
            .Callback<QuestionnaireSection>(section => capturedSections.Add(section));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        capturedTemplate.Should().NotBeNull();
        capturedSections.Should().HaveCount(2);
        capturedSections.Should().Contain(s => s.Title == "Section 1");
        capturedSections.Should().Contain(s => s.Title == "Section 2");
    }

    [Test]
    public async Task Handle_DefaultValues_ShouldBeSetCorrectly()
    {
        // Arrange
        var command = new CreateQuestionnaireTemplateCommand
        {
            Title = "Default Template",
            Description = "Test Description",
            TargetEntityTypeId = 1,
            CertificateType = CertificateType.Both
        };

        var expectedResponse = new QuestionnaireTemplateResponse
        {
            Id = Guid.NewGuid(),
            Title = "Default Template",
            Status = TemplateStatus.Draft,
            Version = "1.0"
        };

        _mockMapper.Setup(x => x.Map<QuestionnaireTemplateResponse>(It.IsAny<QuestionnaireTemplate>()))
            .Returns(expectedResponse);

        QuestionnaireTemplate? capturedTemplate = null;
        _mockDbSet.Setup(x => x.Add(It.IsAny<QuestionnaireTemplate>()))
            .Callback<QuestionnaireTemplate>(template => capturedTemplate = template);

        // Act
        await _handler.Handle(command, CancellationToken.None);

        // Assert
        capturedTemplate.Should().NotBeNull();
        capturedTemplate!.Status.Should().Be(TemplateStatus.Draft);
        capturedTemplate!.Version.Should().Be("1.0");
        capturedTemplate!.PrimaryLanguage.Should().Be("en");
        capturedTemplate!.Created.Should().Be(_mockDateTime.Object.Now);
        capturedTemplate!.CreatedBy.Should().Be("test-user-id");
    }
}
