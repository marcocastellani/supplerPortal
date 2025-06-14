
# Diagrammi di Flusso BPMN – Gestione Fornitori

## 🧩 Flusso 1: Accreditamento

```mermaid
flowchart LR
    A[Buyer avvia richiesta] --> B[Seleziona template]
    B --> C[Invio al fornitore]
    C --> D[Fornitore compila dati e carica documenti]
    D --> E[Sistema verifica completezza]
    E --> F{Campi mancanti?}
    F -- No --> G[Buyer approva / respinge]
    F -- Sì --> H[Alert al fornitore]
    H --> D
    G --> I[Notifica fornitore]
    I --> J[Stato accreditamento aggiornato]
```

## 🧩 Flusso 2: Compilazione questionari

```mermaid
flowchart LR
    A[Sistema assegna questionario] --> B[Fornitore riceve notifica]
    B --> C[Fornitore accede e compila]
    C --> D[Sistema valuta automaticamente]
    D --> E{Controllo manuale previsto?}
    E -- No --> G[Salva stato e score]
    E -- Sì --> F[Valutatore esegue controllo]
    F --> G
```

## 🧩 Flusso 3: Generazione KPI

```mermaid
flowchart LR
    A[Questionari valutati] --> B[KPI generati]
    B --> C[Arricchimento da audit/reclami/delivery]
    C --> D[Tassonomia aggrega i dati]
    D --> E[Cruscotto visivo per management]
    E --> F{Soglie superate?}
    F -- Sì --> G[Alert]
```

## 🧩 Flusso 4: Analisi performance

```mermaid
flowchart LR
    A[Accesso dashboard] --> B[Selezione filtri]
    B --> C[Confronto grafico tra fornitori]
    C --> D[Esportazione o condivisione analisi]
    D --> E[Integrazione con sistemi decisionali]
```
