# 🧠 Project Context – Remira Fullstack Platform

## 📁 Struttura del progetto

Il repository è organizzato in due cartelle principali:

- `api/` → Contiene il backend sviluppato in **.NET Core**, strutturato secondo il pattern **CQRS** con uso di **MediatR** per la separazione tra Command e Query.
- `front/` → Contiene il frontend sviluppato in **React + TypeScript**, stile modulare, componenti riutilizzabili, UI gestita via Storybook.

---

## 🧠 Architettura API (`api/`)

- Le API seguono un'architettura a **layer** con separazione tra Controller, Application (CQRS), Domain e Infrastructure.
- Tutte le richieste devono essere gestite tramite **MediatR**:
  - Le operazioni mutative usano `Command + Handler`
  - Le operazioni in lettura usano `Query + Handler`
- Ogni handler è **unit-testabile** e agnostico rispetto alla persistenza.
- DTO usati per input/output. Validazione lato server con `FluentValidation`.
- Gli endpoint REST sono esposti tramite Controller standard ASP.NET.

---

## 🎨 Architettura Frontend (`front/`)

- L'applicazione è costruita con **React + TypeScript**.
- La UI è composta da componenti riutilizzabili, coerenti e minimali.
- Prima di scrivere un nuovo componente, controllare lo **Storybook aziendale**:  
  👉 https://storybook.remira.com
- Se non esiste un componente adeguato, crearne uno nuovo coerente per stile e comportamento.
- Test:
  - Unit test con **Jest**
  - Integration test con **React Testing Library**
- Gestione form con **React Hook Form**
- API call effettuate tramite funzioni fetch isolate in `/api/` client-side

---

## 🔄 Convenzioni di sviluppo

- **TDD**: ogni feature o fix deve essere scritta a partire dai test.
- **Commit**:
  - Devono essere chiari, descrittivi e prefissati con `STEP #[n]`
  - Esempio: `STEP #2 - Add form validation for shipping address`
- **Comandi obbligatori prima del commit**:
  ```bash
  npm run lint 
  npm run localisations 