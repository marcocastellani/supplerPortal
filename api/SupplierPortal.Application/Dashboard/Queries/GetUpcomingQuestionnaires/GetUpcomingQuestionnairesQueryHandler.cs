using MediatR;
using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Application.Interfaces;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Application.Common.Extensions;

namespace Remira.UCP.SupplierPortal.Application.Dashboard.Queries.GetUpcomingQuestionnaires;

public class GetUpcomingQuestionnairesQueryHandler : IRequestHandler<GetUpcomingQuestionnairesQuery, List<UpcomingQuestionnaireDto>>
{
    private readonly IApplicationDbContext _context;

    public GetUpcomingQuestionnairesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<UpcomingQuestionnaireDto>> Handle(GetUpcomingQuestionnairesQuery request, CancellationToken cancellationToken)
    {
        var endDate = DateTime.Now.AddWeeks(request.WeeksAhead);
        var today = DateTime.Now.Date;

        var query = _context.Questionnaires
            .Include(q => q.Supplier)
            .Where(q => q.Status == QuestionnaireStatus.Published || 
                       q.Status == QuestionnaireStatus.InProgress)
            .Where(q => q.DueDate <= endDate);

        // Filter based on user role and assigned suppliers if UserId is provided
        if (request.UserId.HasValue && !string.IsNullOrEmpty(request.UserRole))
        {
            if (request.UserRole == "User")
            {
                // Users can only see questionnaires for their assigned suppliers
                query = query.Where(q => q.Supplier.UserSuppliers
                    .Any(us => us.UserId == request.UserId));
            }
            // Additional role filters can be added here for Agent, Supervisor, Admin
        }
        // If no UserId provided, return all questionnaires (for testing/admin purposes)

        var questionnaires = await query
            .OrderBy(q => q.DueDate)
            .Select(q => new UpcomingQuestionnaireDto
            {
                Id = q.Id,
                Title = q.Title,
                Type = q.Type,
                Status = q.Status.ToString(),
                Priority = q.Priority.ToString(),
                DueDate = q.DueDate,
                SupplierName = q.Supplier.LegalName,
                SupplierCode = q.Supplier.ExternalCode ?? q.Supplier.Id.ToString(),
                DaysToDeadline = (int)(q.DueDate.Date - today).TotalDays,
                IsOverdue = q.DueDate.Date < today
            })
            .ToListAsync(cancellationToken);

        return questionnaires;
    }
}
