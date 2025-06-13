# 🧠 Memory – File Reference Map

Questo documento descrive lo scopo e l’utilizzo dei file principali nel progetto. Ogni volta che viene creato un nuovo file o modulo, aggiorna questa tabella con una breve descrizione.

## 📦 API – .NET Core (`/api`)

| File/Cartella                                                       | Descrizione                                                                 |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `SupplierPortal.Domain/Entities/User.cs`                          | Entità dominio User con relazioni verso Supplier e Agent                   |
| `SupplierPortal.Domain/Entities/Supplier.cs`                      | Entità dominio Supplier con questionari e utenti assegnati                 |
| `SupplierPortal.Domain/Entities/UserSupplier.cs`                  | Tabella di relazione User-Supplier con ruolo                               |
| `SupplierPortal.Domain/Entities/AgentAssignment.cs`               | Assegnazione di agent a fornitori per specifici utenti                     |
| `SupplierPortal.Domain/Entities/Questionnaire.cs`                 | Entità questionario con scadenze e assegnazioni                            |
| `SupplierPortal.Domain/Entities/Remediation.cs`                   | Entità remediation collegata ai questionari                                |
| `SupplierPortal.Infrastructure/Configurations/*Configuration.cs`   | Configurazioni EF Core per tutte le entità con constraint ottimizzati     |
| `SupplierPortal.Application/Dashboard/Queries/GetUpcomingQuestionnaires/*` | Query CQRS/MediatR per recuperare questionari in scadenza    |
| `SupplierPortal.Application/Common/Extensions/DateTimeExtensions.cs` | Extension methods per calcoli date e scadenze                           |
| `SupplierPortal.API/Controllers/DashboardController.cs`           | Controller API per esporre endpoint dashboard                               |
| `tests/SupplierPortal.Application.IntegrationTests/Dashboard/*`    | Test di integrazione completi con testcontainer SQL Server                |

## 🎨 Frontend – React/TS (`/front`)

| File/Cartella                         | Descrizione                                                                 |
|--------------------------------------|-----------------------------------------------------------------------------|
| `src/types/dashboard.ts`             | Tipi TypeScript per DTO dashboard e filtri                                 |
| `src/services/dashboardService.ts`   | Servizio API per chiamate dashboard con axios                              |
| `src/components/Dashboard/DashboardQuestionnaires.tsx` | Componente React per visualizzazione questionari in scadenza |
| `src/pages/Dashboard.tsx`            | Pagina dashboard principale con layout e widget                            |
| `public/locales/*/translation.json`  | Traduzioni complete IT/EN/DE per interfaccia dashboard                     |

## ⚙️ Utility / Infrastruttura

| File/Cartella                           | Descrizione                                                                 |
|----------------------------------------|-----------------------------------------------------------------------------|
| `.copilot/project-context.md`          | Contesto architetturale usato da GitHub Copilot                            |
| `.github/prompt/new-feature.md`        | Prompt guidato per ChatGPT per la creazione di nuove feature               |
| `docs/user-stories-dashboard-scadenze.md` | User stories complete per implementare dashboard scadenze questionari e remediation |

---

## 🎯 **User Story #1 - COMPLETATA** ✅

**"Visualizzazione questionari in scadenza"** - Dashboard per monitorare questionari supplier in scadenza

### ✅ Backend Implementato
- ✅ Entità dominio complete con Guid come PK
- ✅ Configurazioni EF Core con constraint ottimizzati (NoAction per evitare cicli)
- ✅ Migration SQL Server funzionante
- ✅ Query CQRS/MediatR con handler per GetUpcomingQuestionnaires
- ✅ Controller API `/api/dashboard/questionnaires` con filtri
- ✅ 6 test di integrazione che passano (testcontainer)

### ✅ Frontend Implementato
- ✅ Componente React `DashboardQuestionnaires` con design moderno
- ✅ Integrazione React Query per data fetching
- ✅ Filtri per periodo temporale (1-8 settimane)
- ✅ Indicatori priorità e status con colori
- ✅ Calcolo automatico giorni alla scadenza
- ✅ Localizzazione completa IT/EN/DE
- ✅ Gestione errori e stati di caricamento
- ✅ Design responsive con Tailwind CSS

### 🔧 Stack Tecnologico Validato
- **Backend**: .NET Core 8, EF Core, MediatR, SQL Server, NUnit, Testcontainers
- **Frontend**: React 18, TypeScript, Vite, TanStack Query, i18next, Tailwind CSS
- **Integrazione**: Axios con autenticazione OIDC, routing configurato

---

📌 **Linee guida**:
- Usa frasi corte e chiare
- Quando crei un nuovo file, aggiungilo subito a questa lista
- Se modifichi un file in modo importante, aggiorna anche la descrizione