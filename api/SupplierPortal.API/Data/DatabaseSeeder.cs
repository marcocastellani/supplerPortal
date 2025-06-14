using Microsoft.EntityFrameworkCore;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Infrastructure.Persistence;

namespace Remira.UCP.SupplierPortal.API.Data;

/// <summary>
/// Database seeder per dati di test
/// </summary>
public static class DatabaseSeeder
{
    /// <summary>
    /// Inserisce dati di test nel database se non già presenti
    /// </summary>
    /// <param name="context">Database context</param>
    public static async Task SeedTestDataAsync(ApplicationDbContext context)
    {
        // Verifica se ci sono già dati
        if (await context.Users.AnyAsync())
        {
            return; // Database già popolato
        }

        // Users di test
        var users = new List<User>
        {
            new User
            {
                Id = Guid.NewGuid(),
                ExternalId = "ext_001",
                Email = "mario.rossi@supplier1.com",
                FirstName = "Mario",
                LastName = "Rossi",
                Role = "SupplierUser",
                IsActive = true,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new User
            {
                Id = Guid.NewGuid(),
                ExternalId = "ext_002",
                Email = "anna.verdi@supplier2.com",
                FirstName = "Anna",
                LastName = "Verdi",
                Role = "SupplierUser",
                IsActive = true,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new User
            {
                Id = Guid.NewGuid(),
                ExternalId = "ext_003",
                Email = "luca.bianchi@remira.com",
                FirstName = "Luca",
                LastName = "Bianchi",
                Role = "Agent",
                IsActive = true,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new User
            {
                Id = Guid.NewGuid(),
                ExternalId = "ext_004",
                Email = "sara.neri@remira.com",
                FirstName = "Sara",
                LastName = "Neri",
                Role = "Agent",
                IsActive = true,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        await context.Users.AddRangeAsync(users);

        // Suppliers di test
        var suppliers = new List<Domain.Entities.SupplyNetworkEntities>
        {
            new Domain.Entities.SupplyNetworkEntities
            {
                Id = Guid.NewGuid(),
                LegalName = "Acme Corporation",
                ExternalCode = "ACME001",
                Email = "contact@acme.com",
                Active = true,
                EntityType = Domain.Enums.EntityType.Supplier,
                RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
                AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Domain.Entities.SupplyNetworkEntities
            {
                Id = Guid.NewGuid(),
                LegalName = "TechSolutions Ltd",
                ExternalCode = "TECH002",
                Email = "info@techsolutions.com",
                Active = true,
                EntityType = Domain.Enums.EntityType.Supplier,
                RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Agent,
                AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Domain.Entities.SupplyNetworkEntities
            {
                Id = Guid.NewGuid(),
                LegalName = "Global Manufacturing",
                ExternalCode = "GLOB003",
                Email = "orders@globalmanuf.com",
                Active = true,
                EntityType = Domain.Enums.EntityType.Supplier,
                RoleInSupplyChain = Domain.Enums.RoleInSupplyChain.Manufacturer,
                AccreditationStatus = Domain.Enums.AccreditationStatus.Approved,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        await context.Suppliers.AddRangeAsync(suppliers);
        await context.SaveChangesAsync();

        // Riferimenti per le relazioni
        var user1 = users.First(u => u.Email == "mario.rossi@supplier1.com");
        var user2 = users.First(u => u.Email == "anna.verdi@supplier2.com");
        var agent1 = users.First(u => u.Email == "luca.bianchi@remira.com");
        var agent2 = users.First(u => u.Email == "sara.neri@remira.com");

        var supplier1 = suppliers.First(s => s.ExternalCode == "ACME001");
        var supplier2 = suppliers.First(s => s.ExternalCode == "TECH002");
        var supplier3 = suppliers.First(s => s.ExternalCode == "GLOB003");

        // UserSuppliers (assegnazioni user-supplier)
        var userSuppliers = new List<UserSupplier>
        {
            new UserSupplier
            {
                Id = Guid.NewGuid(),
                UserId = user1.Id,
                SupplierId = supplier1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new UserSupplier
            {
                Id = Guid.NewGuid(),
                UserId = user2.Id,
                SupplierId = supplier2.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        await context.UserSuppliers.AddRangeAsync(userSuppliers);

        // AgentAssignments
        var agentAssignments = new List<AgentAssignment>
        {
            new AgentAssignment
            {
                Id = Guid.NewGuid(),
                AgentId = agent1.Id,
                UserId = user1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new AgentAssignment
            {
                Id = Guid.NewGuid(),
                AgentId = agent2.Id,
                UserId = user2.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        await context.AgentAssignments.AddRangeAsync(agentAssignments);

        // Questionnaires con scadenze diverse
        var questionnaires = new List<Questionnaire>
        {
            // Questionari in scadenza nei prossimi giorni (urgenti)
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Annual Compliance Review 2025",
                Description = "Comprehensive compliance questionnaire for annual review",
                Type = "Compliance",
                DueDate = DateTime.UtcNow.AddDays(2),
                Status = QuestionnaireStatus.Published,
                Priority = QuestionnairePriority.High,
                SupplierId = supplier1.Id,
                AssignedUserId = user1.Id,
                AssignedAgentId = agent1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Quality Assurance Assessment",
                Description = "Quality management system evaluation",
                Type = "Quality",
                DueDate = DateTime.UtcNow.AddDays(5),
                Status = QuestionnaireStatus.InProgress,
                Priority = QuestionnairePriority.Medium,
                SupplierId = supplier2.Id,
                AssignedUserId = user2.Id,
                AssignedAgentId = agent2.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            // Questionari in scadenza entro una settimana
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Environmental Impact Survey",
                Description = "Assessment of environmental practices and sustainability",
                Type = "Environmental",
                DueDate = DateTime.UtcNow.AddDays(7),
                Status = QuestionnaireStatus.Published,
                Priority = QuestionnairePriority.Low,
                SupplierId = supplier1.Id,
                AssignedUserId = user1.Id,
                AssignedAgentId = agent1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Financial Health Check",
                Description = "Financial stability and performance evaluation",
                Type = "Financial",
                DueDate = DateTime.UtcNow.AddDays(10),
                Status = QuestionnaireStatus.Published,
                Priority = QuestionnairePriority.Medium,
                SupplierId = supplier3.Id,
                AssignedUserId = null,
                AssignedAgentId = agent1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            // Questionari in scadenza entro due settimane
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "IT Security Audit",
                Description = "Cybersecurity measures and data protection compliance",
                Type = "Security",
                DueDate = DateTime.UtcNow.AddDays(14),
                Status = QuestionnaireStatus.Published,
                Priority = QuestionnairePriority.High,
                SupplierId = supplier2.Id,
                AssignedUserId = user2.Id,
                AssignedAgentId = agent2.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Supply Chain Risk Assessment",
                Description = "Evaluation of supply chain resilience and risk factors",
                Type = "RiskManagement",
                DueDate = DateTime.UtcNow.AddDays(18),
                Status = QuestionnaireStatus.Published,
                Priority = QuestionnairePriority.Medium,
                SupplierId = supplier1.Id,
                AssignedUserId = user1.Id,
                AssignedAgentId = agent1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            // Questionari già scaduti (per testing di casi edge)
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Overdue Ethics Review",
                Description = "Code of conduct and ethics compliance check",
                Type = "Ethics",
                DueDate = DateTime.UtcNow.AddDays(-3),
                Status = QuestionnaireStatus.Overdue,
                Priority = QuestionnairePriority.High,
                SupplierId = supplier3.Id,
                AssignedUserId = null,
                AssignedAgentId = agent2.Id,
                Created = DateTime.UtcNow.AddDays(-30),
                CreatedBy = "system"
            },
            // Questionari già completati (non dovrebbero apparire nella dashboard)
            new Questionnaire
            {
                Id = Guid.NewGuid(),
                Title = "Completed Training Assessment",
                Description = "Employee training and development evaluation",
                Type = "Training",
                DueDate = DateTime.UtcNow.AddDays(-10),
                Status = QuestionnaireStatus.Completed,
                Priority = QuestionnairePriority.Low,
                SupplierId = supplier1.Id,
                AssignedUserId = user1.Id,
                AssignedAgentId = agent1.Id,
                Created = DateTime.UtcNow.AddDays(-40),
                CreatedBy = "system"
            }
        };

        await context.Questionnaires.AddRangeAsync(questionnaires);
        await context.SaveChangesAsync();

        // Remediations per alcuni questionari
        var quest1 = questionnaires.First(q => q.Title == "Annual Compliance Review 2025");
        var quest2 = questionnaires.First(q => q.Title == "Overdue Ethics Review");

        var remediations = new List<Remediation>
        {
            new Remediation
            {
                Id = Guid.NewGuid(),
                Description = "Update compliance documentation",
                Notes = "Missing certificates need to be uploaded",
                DueDate = DateTime.UtcNow.AddDays(5),
                Status = RemediationStatus.Open,
                QuestionnaireId = quest1.Id,
                ResponsibleUserId = user1.Id,
                ResponsibleAgentId = agent1.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            },
            new Remediation
            {
                Id = Guid.NewGuid(),
                Description = "Complete ethics training module",
                Notes = "All staff must complete the new ethics training by end of month",
                DueDate = DateTime.UtcNow.AddDays(7),
                Status = RemediationStatus.InProgress,
                QuestionnaireId = quest2.Id,
                ResponsibleUserId = null,
                ResponsibleAgentId = agent2.Id,
                Created = DateTime.UtcNow,
                CreatedBy = "system"
            }
        };

        await context.Remediations.AddRangeAsync(remediations);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Dati di test inseriti con successo!");
        Console.WriteLine($"   - Users inseriti: {users.Count}");
        Console.WriteLine($"   - Suppliers inseriti: {suppliers.Count}");
        Console.WriteLine($"   - Questionnaires inseriti: {questionnaires.Count}");
        Console.WriteLine($"   - Remediations inserite: {remediations.Count}");
    }
}
