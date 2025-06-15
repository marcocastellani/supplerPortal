using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.QuestionnaireTemplates.Commands.SaveDraft;

/// <summary>
/// Handler for saving template draft (auto-save functionality)
/// </summary>
public class SaveDraftCommandHandler : IRequestHandler<SaveDraftCommand, Unit>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public SaveDraftCommandHandler(
        IApplicationDbContext context,
        IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Unit> Handle(SaveDraftCommand request, CancellationToken cancellationToken)
    {
        // Get existing template
        var template = await _context.QuestionnaireTemplates
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId, cancellationToken);

        if (template == null)
        {
            throw new InvalidOperationException($"Template with ID {request.TemplateId} not found.");
        }

        // Update template basic info if provided
        if (!string.IsNullOrEmpty(request.Title))
            template.Title = request.Title;

        if (!string.IsNullOrEmpty(request.Description))
            template.Description = request.Description;

        if (request.ExpirationMonths.HasValue)
            template.ExpirationMonths = request.ExpirationMonths.Value;

        if (request.CertificateType.HasValue)
            template.CertificateType = request.CertificateType.Value;

        template.LastModified = _dateTime.Now;

        // Update sections if provided
        if (request.Sections != null)
        {
            await UpdateSections(template.Id, request.Sections, cancellationToken);
        }

        // Update questions if provided
        if (request.Questions != null)
        {
            await UpdateQuestions(template.Id, request.Questions, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

    private async Task UpdateSections(Guid templateId, List<UpdateSectionDto> sectionDtos, CancellationToken cancellationToken)
    {
        var existingSections = await _context.QuestionnaireSections
            .Where(s => s.QuestionnaireTemplateId == templateId)
            .ToListAsync(cancellationToken);

        foreach (var sectionDto in sectionDtos)
        {
            if (sectionDto.IsDeleted && sectionDto.Id.HasValue)
            {
                // Delete section
                var sectionToDelete = existingSections.FirstOrDefault(s => s.Id == sectionDto.Id.Value);
                if (sectionToDelete != null)
                {
                    _context.QuestionnaireSections.Remove(sectionToDelete);
                }
            }
            else if (sectionDto.Id.HasValue)
            {
                // Update existing section
                var existingSection = existingSections.FirstOrDefault(s => s.Id == sectionDto.Id.Value);
                if (existingSection != null)
                {
                    existingSection.Title = sectionDto.Title;
                    existingSection.Description = sectionDto.Description;
                    existingSection.Order = sectionDto.Order;
                    existingSection.TranslationsJson = sectionDto.Translations != null
                        ? JsonSerializer.Serialize(sectionDto.Translations)
                        : null;
                }
            }
            else
            {
                // Create new section
                var newSection = new QuestionnaireSection
                {
                    Id = Guid.NewGuid(),
                    Title = sectionDto.Title,
                    Description = sectionDto.Description,
                    Order = sectionDto.Order,
                    QuestionnaireTemplateId = templateId,
                    TranslationsJson = sectionDto.Translations != null
                        ? JsonSerializer.Serialize(sectionDto.Translations)
                        : null
                };

                _context.QuestionnaireSections.Add(newSection);
            }
        }
    }

    private async Task UpdateQuestions(Guid templateId, List<UpdateQuestionDto> questionDtos, CancellationToken cancellationToken)
    {
        var existingQuestions = await _context.TemplateQuestions
            .Where(q => q.QuestionnaireTemplateId == templateId)
            .ToListAsync(cancellationToken);

        foreach (var questionDto in questionDtos)
        {
            if (questionDto.IsDeleted && questionDto.Id.HasValue)
            {
                // Delete question
                var questionToDelete = existingQuestions.FirstOrDefault(q => q.Id == questionDto.Id.Value);
                if (questionToDelete != null)
                {
                    _context.TemplateQuestions.Remove(questionToDelete);
                }
            }
            else if (questionDto.Id.HasValue)
            {
                // Update existing question
                var existingQuestion = existingQuestions.FirstOrDefault(q => q.Id == questionDto.Id.Value);
                if (existingQuestion != null)
                {
                    existingQuestion.Text = questionDto.Text;
                    existingQuestion.Type = questionDto.Type;
                    existingQuestion.IsRequired = questionDto.IsRequired;
                    existingQuestion.Order = questionDto.Order;
                    existingQuestion.HelpText = questionDto.HelpText;
                    existingQuestion.AllowDocumentUpload = questionDto.AllowDocumentUpload;
                    existingQuestion.MaxDocuments = questionDto.MaxDocuments;
                    existingQuestion.RequireDocuments = questionDto.RequireDocuments;
                    existingQuestion.SectionId = questionDto.SectionId;
                    existingQuestion.ConfigurationJson = questionDto.Configuration != null
                        ? JsonSerializer.Serialize(questionDto.Configuration)
                        : null;
                    existingQuestion.TranslationsJson = questionDto.Translations != null
                        ? JsonSerializer.Serialize(questionDto.Translations)
                        : null;
                }
            }
            else
            {
                // Create new question
                var newQuestion = new TemplateQuestion
                {
                    Id = Guid.NewGuid(),
                    Text = questionDto.Text,
                    Type = questionDto.Type,
                    IsRequired = questionDto.IsRequired,
                    Order = questionDto.Order,
                    HelpText = questionDto.HelpText,
                    AllowDocumentUpload = questionDto.AllowDocumentUpload,
                    MaxDocuments = questionDto.MaxDocuments,
                    RequireDocuments = questionDto.RequireDocuments,
                    QuestionnaireTemplateId = templateId,
                    SectionId = questionDto.SectionId,
                    ConfigurationJson = questionDto.Configuration != null
                        ? JsonSerializer.Serialize(questionDto.Configuration)
                        : null,
                    TranslationsJson = questionDto.Translations != null
                        ? JsonSerializer.Serialize(questionDto.Translations)
                        : null
                };

                _context.TemplateQuestions.Add(newQuestion);
            }
        }
    }
}
