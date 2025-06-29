using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;

/// <summary>
/// Handler for publishing a questionnaire template
/// </summary>
public class PublishTemplateCommandHandler : IRequestHandler<PublishTemplateCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;

    public PublishTemplateCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService,
        IDateTime dateTime)
    {
        _context = context;
        _currentUserService = currentUserService;
        _dateTime = dateTime;
    }

    public async Task<Unit> Handle(PublishTemplateCommand request, CancellationToken cancellationToken)
    {
        // Find the template
        var template = await _context.QuestionnaireTemplates
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId, cancellationToken);

        if (template == null)
        {
            throw new InvalidOperationException($"Template with ID {request.TemplateId} not found.");
        }

        // Validate that template can be published
        if (template.Status != TemplateStatus.Draft)
        {
            throw new InvalidOperationException($"Only draft templates can be published. Current status: {template.Status}");
        }

        // Basic validation - ensure template has required content
        if (string.IsNullOrWhiteSpace(template.Title))
        {
            throw new InvalidOperationException("Template must have a title to be published.");
        }

        // Check if template has at least one section
        var hasSection = await _context.QuestionnaireSections
            .AnyAsync(s => s.QuestionnaireTemplateId == request.TemplateId, cancellationToken);

        if (!hasSection)
        {
            throw new InvalidOperationException("Template must have at least one section to be published.");
        }

        // Update template status to Active
        template.Status = TemplateStatus.Active;
        template.LastModified = _dateTime.Now;
        template.LastModifiedBy = _currentUserService.UserId;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}