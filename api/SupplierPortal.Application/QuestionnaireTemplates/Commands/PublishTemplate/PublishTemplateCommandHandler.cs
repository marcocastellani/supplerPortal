using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Common;
using Remira.UCP.SupplierPortal.Application.Services;
using Remira.UCP.SupplierPortal.Domain.Enums;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.PublishTemplate;

/// <summary>
/// Handler for publishing/activating a questionnaire template
/// </summary>
public class PublishTemplateCommandHandler : IRequestHandler<PublishTemplateCommand, QuestionnaireTemplateResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;
    private readonly ITemplateValidationService _validationService;

    public PublishTemplateCommandHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService,
        IDateTime dateTime,
        ITemplateValidationService validationService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
        _dateTime = dateTime;
        _validationService = validationService;
    }

    public async Task<QuestionnaireTemplateResponse> Handle(PublishTemplateCommand request, CancellationToken cancellationToken)
    {
        // Validate input
        ArgumentNullException.ThrowIfNull(request);

        // Get template
        var template = await _context.QuestionnaireTemplates
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId, cancellationToken);

        if (template == null)
        {
            throw new InvalidOperationException($"Template with ID {request.TemplateId} not found");
        }

        // Check if template is already active
        if (template.Status == TemplateStatus.Active)
        {
            throw new InvalidOperationException("Template is already active and cannot be published again");
        }

        // Validate template for activation
        var validationResult = await _validationService.ValidateForActivationAsync(request.TemplateId, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errorMessage = string.Join("; ", validationResult.ValidationErrors);
            throw new InvalidOperationException($"Template validation failed: {errorMessage}");
        }

        // Increment version (simple integer increment)
        var currentVersion = ParseVersion(template.Version);
        var newVersion = (currentVersion + 1).ToString();

        // Update template status and version
        template.Status = TemplateStatus.Active;
        template.Version = newVersion;
        template.LastModified = _dateTime.Now;
        template.LastModifiedBy = _currentUserService.UserId;

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        // Return response with updated template
        var updatedTemplate = await _context.QuestionnaireTemplates
            .Include(t => t.Sections)
            .Include(t => t.Questions)
            .Include(t => t.TargetEntityTypes)
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId, cancellationToken);

        var response = _mapper.Map<QuestionnaireTemplateResponse>(updatedTemplate);

        // Load sections with translations
        var sections = await _context.QuestionnaireSections
            .Where(s => s.QuestionnaireTemplateId == template.Id)
            .OrderBy(s => s.Order)
            .ToListAsync(cancellationToken);

        response.Sections = _mapper.Map<List<SectionResponse>>(sections);

        // Load questions with translations and configurations
        var questions = await _context.TemplateQuestions
            .Where(q => q.QuestionnaireTemplateId == template.Id)
            .OrderBy(q => q.Order)
            .ToListAsync(cancellationToken);

        response.Questions = _mapper.Map<List<QuestionResponse>>(questions);

        // Load conditions
        var conditions = await _context.QuestionConditions
            .Where(c => questions.Any(q => q.Id == c.TriggerQuestionId || q.Id == c.TargetQuestionId))
            .ToListAsync(cancellationToken);

        response.Conditions = _mapper.Map<List<QuestionConditionResponse>>(conditions);

        return response;
    }

    /// <summary>
    /// Parse version string to integer for increment
    /// Supports formats like "1", "1.0", "1.2.3" - takes the first number
    /// </summary>
    private int ParseVersion(string version)
    {
        if (string.IsNullOrWhiteSpace(version))
        {
            return 1;
        }

        // Split by dots and take the first part
        var parts = version.Split('.');
        if (parts.Length > 0 && int.TryParse(parts[0], out var majorVersion))
        {
            return majorVersion;
        }

        return 1; // Default fallback
    }
}