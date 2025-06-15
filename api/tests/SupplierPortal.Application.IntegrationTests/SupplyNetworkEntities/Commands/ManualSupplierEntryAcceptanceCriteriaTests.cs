using FluentAssertions;
using NUnit.Framework;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.Commands;
using Remira.UCP.SupplierPortal.Application.SupplyNetworkEntities.DTOs;
using Remira.UCP.SupplierPortal.Domain.Entities;
using Remira.UCP.SupplierPortal.Domain.Enums;
using Remira.UCP.SupplierPortal.Application.IntegrationTests.Fixtures;
using Remira.UCP.Utilities.Errors.Exceptions;

namespace Remira.UCP.SupplierPortal.Application.IntegrationTests.SupplyNetworkEntities.Commands;

using static Testing;

/// <summary>
/// Test di Acceptance Criteria per Epic A #4: Inserimento manuale fornitori accreditati
/// Storia: "Come amministratore, voglio poter inserire manualmente i miei fornitori 
/// in modo da non costringere i fornitori già accreditati a riaccreditarsi"
/// </summary>
[TestFixture]
public class ManualSupplierEntryAcceptanceCriteriaTests : BaseTestFixture
{
    #region AC1 - Amministratore può inserire fornitori manualmente

    [Test]
    public async Task AC1_AdministratorCanManuallyInsertSuppliers_WhenValidDataProvided()
    {
        // Arrange - AC1: Amministratore può inserire fornitori manualmente
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Manually Inserted Supplier Ltd",
            ShortName = "MIS Ltd",
            ExternalCode = "MIS001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved, // Already accredited
            VatCode = "IT98765432109",
            TaxCode = "ITTAX002",
            Country = "IT",
            Region = "Veneto",
            City = "Venice",
            Address = "Via Accreditata 123",
            ZipCode = "30100",
            Email = "manual@supplier.it",
            PhoneNumber = "+39-041-1234567",
            ContactPersonName = "Giuseppe Verdi",
            Active = true,
            Tags = new[] { "manual-entry", "pre-accredited" }
        };

        // Act - Inserimento manuale da parte dell'amministratore
        var result = await SendAsync(command);

        // Assert - AC1: Fornitor deve essere inserito correttamente
        result.Should().NotBeNull();
        result.Id.Should().NotBeEmpty();
        result.LegalName.Should().Be("Manually Inserted Supplier Ltd");
        result.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        
        // Verify in database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity.Should().NotBeNull();
        entity!.LegalName.Should().Be("Manually Inserted Supplier Ltd");
        entity.CreatedBy.Should().NotBeNullOrEmpty(); // AC5: Sistema traccia chi ha inserito
    }

    #endregion

    #region AC2 - Fornitori inseriti hanno stato "Approved" di default

    [Test]
    public async Task AC2_ManuallyInsertedSuppliersDefaultToApprovedStatus()
    {
        // Arrange - AC2: Fornitori inseriti manualmente dovrebbero essere già approvati
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Pre-Accredited Supplier",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Tannery,
            Country = "DE",
            VatCode = "DE123456789",
            Active = true
            // Note: AccreditationStatus non specificato - dovrebbe usare il default
        };

        // Act
        var result = await SendAsync(command);

        // Assert - AC2: Status deve essere "Approved" di default
        result.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        
        // Verify in database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity!.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
    }

    [Test]
    public async Task AC2_AccreditationDateIsSetAutomatically_WhenStatusIsApproved()
    {
        // Arrange - AC2: Verifica che AccreditationDate viene settata automaticamente
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Auto-Dated Supplier",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "FR",
            VatCode = "FR12345678901",
            Active = true
            // Note: AccreditationDate non specificata - dovrebbe essere settata automaticamente
        };

        var beforeCreation = DateTime.UtcNow.AddMinutes(-1);

        // Act
        var result = await SendAsync(command);
        
        var afterCreation = DateTime.Now.AddMinutes(1);

        // Assert - AC2: AccreditationDate deve essere settata automaticamente
        result.AccreditationDate.Should().NotBeNull();
        result.AccreditationDate.Should().BeAfter(beforeCreation);
        result.AccreditationDate.Should().BeBefore(afterCreation);
    }

    #endregion

    #region AC3 - Non ci sono duplicazioni

   
    [Test]
    public async Task AC3_SystemPreventsVatCodeDuplication()
    {
        // Arrange - AC3: Non ci sono duplicazioni
        var existingEntity = new Domain.Entities.SupplyNetworkEntities
        {
            LegalName = "First VAT Supplier",
            ExternalCode = "VAT001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            AccreditationStatus = AccreditationStatus.Approved,
            Country = "IT",
            VatCode = "DUPLICATE_VAT_CODE",
            Active = true,
            ShortName = "", Region = "", City = "", Address = "", ZipCode = "",
            Email = "", PhoneNumber = "", ContactPersonName = "", TaxCode = "", Tags = Array.Empty<string>()
        };

        await AddAsync(existingEntity);

        var duplicateCommand = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Second VAT Supplier",
            ExternalCode = "VAT002", // Different external code
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "IT",
            VatCode = "DUPLICATE_VAT_CODE", // Same VAT as existing
            Active = true
        };

        // Act & Assert - AC3: Sistema deve prevenire duplicazione VatCode
        await FluentActions.Invoking(() => SendAsync(duplicateCommand))
            .Should().ThrowAsync<CustomValidationException>()
            .Where(ex => ex.Errors.ContainsKey("VatCode"))
            ;
    }

    [Test]
    public async Task AC3_SystemAllowsUniqueExternalAndVatCodes()
    {
        // Arrange - AC3: Caso positivo - codici unici dovrebbero essere permessi
        var firstCommand = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Unique Supplier One",
            ExternalCode = "UNIQUE001",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "IT",
            VatCode = "IT11111111111",
            Active = true
        };

        var secondCommand = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Unique Supplier Two",
            ExternalCode = "UNIQUE002", // Different external code
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "IT",
            VatCode = "IT22222222222", // Different VAT code
            Active = true
        };

        // Act & Assert - AC3: Entrambi dovrebbero essere creati senza errori
        var first = await SendAsync(firstCommand);
        var second = await SendAsync(secondCommand);

        first.Should().NotBeNull();
        second.Should().NotBeNull();
        first.Id.Should().NotBe(second.Id);
        first.ExternalCode.Should().NotBe(second.ExternalCode);
        first.VatCode.Should().NotBe(second.VatCode);
    }

    #endregion

    #region AC4 - Campi obbligatori validati

    [Test]
    public async Task AC4_SystemRequiresMandatoryFields()
    {
        // Arrange - AC4: Campi obbligatori validati
        var invalidCommand = new CreateSupplyNetworkEntityCommand
        {
            // LegalName missing - required field
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "US",
            Active = true
        };

        // Act & Assert - AC4: Sistema deve richiedere campi obbligatori
        await FluentActions.Invoking(() => SendAsync(invalidCommand))
            .Should().ThrowAsync<Exception>(); // Should fail validation
    }

    [Test]
    public async Task AC4_SystemValidatesRequiredFieldsArePresent()
    {
        // Arrange - AC4: Test positivo con tutti i campi obbligatori
        var validCommand = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Valid Required Fields Supplier", // Required
            EntityType = EntityType.Supplier, // Required
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer, // Required
            Country = "DE",
            VatCode = "DE987654321",
            Active = true
        };

        // Act - AC4: Con campi obbligatori dovrebbe funzionare
        var result = await SendAsync(validCommand);

        // Assert
        result.Should().NotBeNull();
        result.LegalName.Should().Be("Valid Required Fields Supplier");
        result.EntityType.Should().Be(EntityType.Supplier);
        result.RoleInSupplyChain.Should().Be(RoleInSupplyChain.Manufacturer);
    }

    #endregion

    #region AC5 - Sistema traccia chi ha inserito

    [Test]
    public async Task AC5_SystemTracksWhoInsertedTheSupplier()
    {
        // Arrange - AC5: Sistema traccia chi ha inserito
        var command = new CreateSupplyNetworkEntityCommand
        {
            LegalName = "Tracked Supplier",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Manufacturer,
            Country = "ES",
            VatCode = "ES12345678901",
            Active = true
        };

        // Act
        var result = await SendAsync(command);

        // Assert - AC5: CreatedBy deve essere popolato
        result.Should().NotBeNull();
        result.CreatedBy.Should().NotBeNullOrEmpty();
        
        // Verify in database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity.Should().NotBeNull();
        entity!.CreatedBy.Should().NotBeNullOrEmpty();
        entity.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMinutes(5));
    }

    #endregion

    #region Test completo End-to-End della storia utente

    [Test]
    public async Task UserStory_AdministratorManuallyInsertsPreAccreditedSupplier_FullScenario()
    {
        // Arrange - Scenario completo della storia utente
        // "Come amministratore, voglio poter inserire manualmente i miei fornitori 
        // in modo da non costringere i fornitori già accreditati a riaccreditarsi"
        
        var command = new CreateSupplyNetworkEntityCommand
        {
            // Dati del fornitore già accreditato che l'admin vuole inserire manualmente
            LegalName = "Leather Works Italiana Spa",
            ShortName = "LWI Spa",
            ExternalCode = "LWI2025",
            EntityType = EntityType.Supplier,
            RoleInSupplyChain = RoleInSupplyChain.Tannery,
            
            // Fornitore è già accreditato - non deve rifare il processo
            AccreditationStatus = AccreditationStatus.Approved,
            AccreditationDate = DateTime.UtcNow.AddDays(-30), // Accreditato 30 giorni fa
            
            // Dati completi del fornitore
            VatCode = "IT03456789012",
            TaxCode = "IT03456789012",
            Country = "IT",
            Region = "Toscana",
            City = "Florence",
            Address = "Via della Pelle 45",
            ZipCode = "50100",
            Email = "info@leatherworksit.com",
            PhoneNumber = "+39-055-1234567",
            ContactPersonName = "Marco Pellettieri",
            
            Active = true,
            Tags = new[] { "leather", "premium", "pre-accredited", "manual-entry" }
        };

        // Act - L'amministratore inserisce manualmente il fornitore
        var result = await SendAsync(command);

        // Assert - Verifica che tutti gli AC siano soddisfatti
        
        // AC1: Amministratore può inserire fornitori manualmente
        result.Should().NotBeNull();
        result.Id.Should().NotBeEmpty();
        
        // AC2: Fornitori inseriti hanno stato "Approved" 
        result.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        result.AccreditationDate.Should().NotBeNull();
        
        // AC3: Non ci sono duplicazioni (implicito - nessuna eccezione)
        result.ExternalCode.Should().Be("LWI2025");
        result.VatCode.Should().Be("IT03456789012");
        
        // AC4: Campi obbligatori validati (implicito - entity creata)
        result.LegalName.Should().Be("Leather Works Italiana Spa");
        result.EntityType.Should().Be(EntityType.Supplier);
        result.RoleInSupplyChain.Should().Be(RoleInSupplyChain.Tannery);
        
        // AC5: Sistema traccia chi ha inserito
        result.CreatedBy.Should().NotBeNullOrEmpty();
        result.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMinutes(5));
        
        // Verifica finale nel database
        var entity = await FindAsync<Domain.Entities.SupplyNetworkEntities>(false, result.Id);
        entity.Should().NotBeNull();
        entity!.LegalName.Should().Be("Leather Works Italiana Spa");
        entity.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        entity.Active.Should().BeTrue();
        entity.Tags.Should().Contain("pre-accredited");
        entity.Tags.Should().Contain("manual-entry");
        
        // Il fornitore è pronto per essere utilizzato senza dover rifare l'accreditamento
        entity.AccreditationStatus.Should().Be(AccreditationStatus.Approved);
        entity.AccreditationDate.Should().NotBeNull();
    }

    #endregion
}
