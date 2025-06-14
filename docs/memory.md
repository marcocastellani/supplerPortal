# 🧠 Memory – File Reference Map

Questo documento descrive lo scopo e l'utilizzo dei file principali nel progetto. Ogni volta che viene creato un nuovo file o modulo, aggiorna questa tabella con una breve descrizione.

## 📦 API – .NET Core (`/api`)

| File/Cartella                                                       | Descrizione                                                                 |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `SupplierPortal.Domain/Entities/User.cs`                          | Entità dominio User con relazioni verso SupplyNetworkEntities e Agent                   |
| `SupplierPortal.Domain/Entities/SupplyNetworkEntities.cs`         | Entità dominio rete di fornitura (ex-Supplier) con questionari e utenti assegnati      |
| `SupplierPortal.Domain/Entities/UserSupplier.cs`                  | Tabella di relazione User-SupplyNetworkEntities con ruolo                               |
| `SupplierPortal.Domain/Entities/AgentAssignment.cs`               | Assegnazione di agent ad attori della rete per specifici utenti                     |
| `SupplierPortal.Domain/Entities/Questionnaire.cs`                 | Entità questionario con scadenze e assegnazioni + enum QuestionnaireStatus |
| `SupplierPortal.Domain/Entities/Remediation.cs`                   | Entità remediation collegata ai questionari + enum RemediationStatus       |
| `SupplierPortal.Infrastructure/Configurations/*Configuration.cs`   | Configurazioni EF Core per tutte le entità con constraint ON DELETE NO ACTION, inclusa SupplyNetworkEntitiesConfiguration |
| `SupplierPortal.Infrastructure/Migrations/20250613225731_InitialCreate.cs` | Migrazione EF Core applicata al database Azure SQL Edge        |
| `SupplierPortal.Application/Dashboard/Queries/GetUpcomingQuestionnaires/*` | Query CQRS/MediatR per recuperare questionari in scadenza    |
| `SupplierPortal.Application/Common/Extensions/DateTimeExtensions.cs` | Extension methods per calcoli date e scadenze                           |
| `SupplierPortal.API/Controllers/DashboardController.cs`           | Controller API per esporre endpoint dashboard con versioning                |
| `SupplierPortal.API/Data/DatabaseSeeder.cs`                       | ⭐ Seeder per dati di test (8 questionari, 4 users, 3 supply network entities)          |
| `SupplierPortal.API/Program.cs`                                   | ⭐ Configurazione CORS per sviluppo + chiamata al DatabaseSeeder            |
| `tests/SupplierPortal.Application.IntegrationTests/Dashboard/*`    | Test di integrazione completi con testcontainer SQL Server                 |

### 🗄️ **Database Setup - Azure SQL Edge via Docker**

| File                              | Descrizione                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| `SupplierPortal.API/docker-compose.yml` | ⭐ Container Azure SQL Edge (localhost:1433, password: SupplierPortal123!) |
| `SupplierPortal.API/start-db.sh`        | ⭐ Script per avviare database container                                    |
| `SupplierPortal.API/seed-data.sql`      | Script SQL per dati di test (alternativa al DatabaseSeeder C#)            |
| `appsettings.Development.json`          | ⭐ Connection string per Azure SQL Edge configurata                        |

**Comandi utili:**
```bash
# Avvio database
cd api/SupplierPortal.API && ./start-db.sh

# Applicazione migrazioni
cd api && dotnet ef database update --project SupplierPortal.Infrastructure --startup-project SupplierPortal.API

# Verifica container
docker ps | grep azure-sql-edge
```

### 🌐 **API Versioning**

⚠️ **VERSIONE API RICHIESTA**: `2024-10-01`

**Esempi di chiamate corrette:**
```bash
# Endpoint dashboard
GET /api/dashboard/questionnaires?api-version=2024-10-01&weeksAhead=4

# Con parametri filtro
GET /api/dashboard/questionnaires?api-version=2024-10-01&weeksAhead=4&status=Published&supplierId=guid
```

**Frontend configurato correttamente** in `dashboardService.ts` con versione `2024-10-01`.

## 🎨 Frontend – React/TS (`/front`)

| File/Cartella                         | Descrizione                                                                 |
|--------------------------------------|-----------------------------------------------------------------------------|
| `src/types/dashboard.ts`             | Tipi TypeScript per DTO dashboard e filtri                                 |
| `src/services/dashboardService.ts`   | Servizio API per chiamate dashboard con axios                              |
| `src/components/Dashboard/DashboardQuestionnaires.tsx` | Componente React per visualizzazione questionari in scadenza |
| `src/pages/Dashboard.tsx`            | Pagina dashboard principale con layout e widget                            |
| `src/pages/Home.tsx`                 | **MENU PRINCIPALE**: Contiene array `tabs` per la navigazione              |
| `public/locales/*/translation.json`  | Traduzioni complete IT/EN/DE per interfaccia dashboard                     |

## ⚙️ Utility / Infrastruttura

| File/Cartella                           | Descrizione                                                                 |
|----------------------------------------|-----------------------------------------------------------------------------|
| `.copilot/project-context.md`          | Contesto architetturale usato da GitHub Copilot                            |
| `.github/prompt/new-feature.md`        | Prompt guidato per ChatGPT per la creazione di nuove feature               |
| `docs/user-stories-dashboard-scadenze.md` | User stories complete per implementare dashboard scadenze questionari e remediation |

---

## 📋 **IMPORTANTE: Struttura Navigazione Frontend**

⚠️ **NAVIGAZIONE MENU**: Il menu principale dell'applicazione è gestito nella variabile `tabs` del file `src/pages/Home.tsx`. 

**NON utilizzare** `src/components/LayoutComponents/Topbar/Topbar.tsx` per il menu principale.

### Come aggiungere una nuova pagina al menu:
1. Creare il componente pagina in `src/pages/`
2. Importare il componente in `src/pages/Home.tsx`
3. Aggiungere la voce menu nell'array `tabs` con:
   ```typescript
   {
     title: t("nomeChiave"),
     value: numeroIndice,
     content: <NuovoComponente />
   }
   ```
4. Aggiungere la traduzione `"nomeChiave"` nei file `public/locales/*/translation.json`

---

## 🎯 **User Story #1 - COMPLETATA** ✅

**"Visualizzazione questionari in scadenza"** - Dashboard per monitorare questionari della rete di fornitura in scadenza

### ✅ Backend Implementato
- ✅ Entità dominio complete con Guid come PK
- ✅ Configurazioni EF Core con constraint ON DELETE NO ACTION (evita cicli)
- ✅ Migration SQL Server + Azure SQL Edge setup via Docker
- ✅ Query CQRS/MediatR con handler per GetUpcomingQuestionnaires
- ✅ Controller API `/api/dashboard/questionnaires` con versioning 2024-10-01
- ✅ DatabaseSeeder con 8 questionari di test (scadenze diverse)
- ✅ Configurazione CORS per sviluppo (localhost:4280,4281,3000)
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
- ✅ Integrazione con API versioning 2024-10-01

### ✅ Database & Infrastruttura
- ✅ Azure SQL Edge container (docker-compose.yml)
- ✅ Script di avvio database (start-db.sh)
- ✅ Migrazioni EF Core applicate
- ✅ Dati di test inseriti automaticamente al primo avvio
- ✅ Connection string configurata per sviluppo locale

### 🔧 Stack Tecnologico Validato
- **Backend**: .NET Core 8, EF Core, MediatR, Azure SQL Edge, NUnit, Testcontainers
- **Frontend**: React 18, TypeScript, Vite, TanStack Query, i18next, Tailwind CSS
- **Database**: Azure SQL Edge via Docker Compose (porta 1433)
- **Integrazione**: Axios con CORS, API versioning, autenticazione OIDC

### 🚀 **Come testare end-to-end**
1. Avviare database: `cd api/SupplierPortal.API && ./start-db.sh`
2. Avviare backend: `cd api && dotnet run --project SupplierPortal.API`
3. Avviare frontend: `cd front && npm run dev`
4. Aprire browser: `http://localhost:4281` → Dashboard tab

**Endpoint di test:** `GET http://localhost:5257/api/dashboard/questionnaires?api-version=2024-10-01&weeksAhead=4`

---

## 🎨 **UI Guidelines & Design System**

⚠️ **REGOLA OBBLIGATORIA**: Tutte le UI devono utilizzare MUI/MUI-X con design system standardizzato.

**File di riferimento:**
- `docs/ui-guidelines.md` - ⭐ Linee guida complete per sviluppo UI
- `front/src/components/Dashboard/theme.ts` - Tema MUI per dashboard
- Componenti atomici Dashboard: `StatusChip`, `PriorityChip`, `QuestionnaireCard`

**Architettura componenti completata:**
```
src/components/Dashboard/
├── DashboardQuestionnaires.tsx  # ✅ Refactored con MUI
├── DashboardFilters.tsx         # ✅ Nuovo componente MUI
├── QuestionnaireGrid.tsx        # ✅ Griglia responsive
├── QuestionnaireCard.tsx        # ✅ Card con Material Design
├── StatusChip.tsx               # ✅ Chip per stati
├── PriorityChip.tsx            # ✅ Chip per priorità
└── theme.ts                    # ✅ Design system
```

---

📌 **Linee guida**:
- Usa frasi corte e chiare
- Quando crei un nuovo file, aggiungilo subito a questa lista
- Se modifichi un file in modo importante, aggiorna anche la descrizione

## 🎯 User Stories Implementation Status

### ✅ #1 - Visualizzazione questionari in scadenza (Utente)
**Status**: **COMPLETATO CON CORREZIONI STEP 1-3**

#### Correzioni Implementate:

**STEP #1 - Service Layer Frontend Corretto:**
- Aggiunto userId e userRole nei parametri API
- Gestione edge cases: utenti senza fornitori, errori di rete
- Error handling specifico per 401/403/network errors
- Aggiornato DashboardFilters interface

**STEP #2 - Sostituito MUI con UnifiedUI:**  
- Migrato da @mui/material a @remira/unifiedui
- Utilizzati componenti: Container, Text, Loader, Card
- Mantenuta compatibilità con styling responsive

**STEP #3 - Test Backend Implementati:**
- Corretti test unitari per Query/DTO validation
- Aggiunti test per edge cases (overdue, no supply network entities)
- 4/4 test passano correttamente

#### Acceptance Criteria Verificati:
- ✅ Filtro per fornitori assegnati (userId nel service)
- ✅ Scadenze nelle prossime 4 settimane
- ✅ Dati completi: attore della rete, tipo, scadenza, stato
- ✅ Ordinamento per scadenza
- ✅ Dashboard responsive con UnifiedUI

#### Edge Cases Gestiti:
- ✅ Utenti senza fornitori assegnati
- ✅ Questionari già scaduti (inclusi)
- ✅ Problemi di connessione (network/auth errors)

#### File Modificati:
- `front/src/services/dashboardService.ts` - Service layer migliorato
- `front/src/types/dashboard.ts` - Aggiunta userId/userRole  
- `front/src/components/Dashboard/DashboardQuestionnaires.tsx` - UnifiedUI + edge cases
- `front/public/locales/en/translation.json` - Traduzioni errori
- `api/tests/SupplierPortal.Application.UnitTests/Dashboard/` - Test corretti

## 🔄 Refactoring Log

### 14 giugno 2025 - Generalizzazione entità Supplier → SupplyNetworkEntities
- **BREAKING CHANGE**: Rinominata entità `Supplier` in `SupplyNetworkEntities` per renderla più generica e adatta alla gestione della rete di fornitura
- **Motivazione**: Generalizzare il concetto da singolo fornitore a generico attore della rete di fornitura (fornitori, subfornitori, partner, etc.)
- **File coinvolti**:
  - `SupplierPortal.Domain/Entities/Supplier.cs` → `SupplyNetworkEntities.cs`
  - `SupplierPortal.Infrastructure/Configurations/SupplierConfiguration.cs` → `SupplyNetworkEntitiesConfiguration.cs`
  - Aggiornate tutte le navigation properties nelle entità correlate (`UserSupplier`, `Questionnaire`)
  - Aggiornati DbContext e interfacce
  - Aggiornato DatabaseSeeder per utilizzare la nuova entità
- **Stato database**: Serve migration per rinominare tabella da `Suppliers` a `SupplyNetworkEntities`
- **Impatto API**: I DTO mantengono i nomi business-friendly (SupplierName, SupplierCode) per retrocompatibilità
- **Documentazione**: Aggiornati tutti i riferimenti da "fornitore/supplier" a "attore della rete/supply network entity"
- **Test**: ✅ Unit tests (6/6) e Integration tests (6/6) passano
- **Build**: ✅ Compilazione riuscita senza errori