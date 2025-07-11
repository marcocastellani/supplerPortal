﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Test> Test { get; }
    DbSet<User> Users { get; }
    DbSet<Domain.Entities.SupplyNetworkEntities> SupplyNetworkEntities { get; }
    DbSet<UserSupplier> UserSuppliers { get; }
    DbSet<AgentAssignment> AgentAssignments { get; }
    DbSet<Questionnaire> Questionnaires { get; }
    DbSet<Remediation> Remediations { get; }

    // Questionnaire Template Management
    DbSet<QuestionnaireTemplate> QuestionnaireTemplates { get; }
    DbSet<QuestionnaireSection> QuestionnaireSections { get; }
    DbSet<TemplateQuestion> TemplateQuestions { get; }
    DbSet<QuestionCondition> QuestionConditions { get; }
    DbSet<QuestionnaireTemplateEntityType> QuestionnaireTemplateEntityTypes { get; }

    DatabaseFacade Database { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
