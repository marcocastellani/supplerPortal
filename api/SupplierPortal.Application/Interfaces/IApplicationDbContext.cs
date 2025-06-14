using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Remira.UCP.SupplierPortal.Domain.Entities;

namespace Remira.UCP.SupplierPortal.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Test> Test { get; }
    DbSet<User> Users { get; }
    DbSet<Domain.Entities.SupplyNetworkEntities> Suppliers { get; }
    DbSet<UserSupplier> UserSuppliers { get; }
    DbSet<AgentAssignment> AgentAssignments { get; }
    DbSet<Questionnaire> Questionnaires { get; }
    DbSet<Remediation> Remediations { get; }
    
    DatabaseFacade Database { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
