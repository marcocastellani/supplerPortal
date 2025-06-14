# UI Guidelines - Supplier Portal

## Panoramica

Questo documento stabilisce le linee guida obbligatorie per l'implementazione delle interfacce utente nel Supplier Portal. Tutti i componenti UI devono seguire queste regole per garantire coerenza, riutilizzabilità e qualità del codice.

## Regole Fondamentali

### 1. Design System Obbligatorio

**REGOLA PRINCIPALE**: Tutte le UI devono utilizzare esclusivamente MUI (Material-UI) e MUI-X.

- ✅ **Permesso**: Componenti MUI/MUI-X, personalizzazioni con `sx` prop, temi MUI
- ❌ **Vietato**: CSS personalizzato, librerie UI alternative, componenti non MUI

### 2. Architettura Componenti

#### Struttura Gerarchica
```
src/components/
├── [Feature]/              # Componenti per feature specifica
│   ├── [FeatureName].tsx   # Componente principale
│   ├── [Subcomponent].tsx  # Componenti atomici
│   └── theme.ts            # Tema specifico se necessario
└── common/                 # Componenti riutilizzabili
    ├── [ComponentName].tsx
    └── index.ts
```

#### Esempio Pratico (Dashboard)
```
src/components/Dashboard/
├── DashboardQuestionnaires.tsx  # Componente principale
├── DashboardFilters.tsx         # Componente filtri
├── QuestionnaireGrid.tsx        # Griglia questionari
├── QuestionnaireCard.tsx        # Card singolo questionario
├── StatusChip.tsx               # Chip per status
├── PriorityChip.tsx             # Chip per priorità
└── theme.ts                     # Tema dashboard
```

### 3. Componenti Atomici

Ogni componente deve essere:
- **Responsabile di un'unica funzionalità**
- **Riutilizzabile** in contesti diversi
- **Tipizzato** con TypeScript
- **Testabile** in isolamento

#### Template Componente
```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';

export interface ComponentNameProps {
  // Props tipizzate
  title: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary';
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction,
  variant = 'primary'
}) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {/* Implementazione */}
    </Box>
  );
};
```

### 4. Temi e Styling

#### Uso del Theme System
```typescript
// theme.ts
import { createTheme } from '@mui/material/styles';

export const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    // Personalizzazioni
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
```

#### Styling con sx Prop
```typescript
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 1,
  }}
>
```

### 5. Responsive Design

Tutti i componenti devono essere responsive utilizzando:
- **Breakpoints MUI**: `xs`, `sm`, `md`, `lg`, `xl`
- **Grid System**: `Grid` e `Container`
- **Responsive Values**: `{ xs: 12, md: 6 }`

```typescript
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} lg={4}>
    <ComponentName />
  </Grid>
</Grid>
```

### 6. Gestione dello Stato

- **Props drilling**: Evitare, preferire Context API
- **State management**: Redux Toolkit per stato globale
- **Local state**: `useState` per stato locale
- **Server state**: TanStack Query per API calls

### 7. Accessibilità

Tutti i componenti devono essere accessibili:
- **ARIA labels**: Usare `aria-label`, `aria-describedby`
- **Keyboard navigation**: Supporto completo
- **Screen readers**: Testi alternativi appropriati
- **Contrast**: Ratio minimo 4.5:1

### 8. Performance

- **Lazy loading**: Componenti grandi
- **Memoization**: `React.memo` quando appropriato
- **Virtualization**: Liste lunghe con `react-window`
- **Bundle splitting**: Importazioni dinamiche

## Esempi Pratici

### ✅ Componente Corretto
```typescript
import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export interface StatusChipProps {
  status: 'active' | 'inactive' | 'pending';
  size?: 'small' | 'medium';
}

export const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  size = 'medium' 
}) => {
  const getColor = () => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Chip
      label={status.toUpperCase()}
      color={getColor()}
      size={size}
      variant="outlined"
    />
  );
};
```

### ❌ Componente Sbagliato
```typescript
// ❌ CSS personalizzato
import './Component.css';

// ❌ Libreria non MUI
import { Button } from 'antd';

// ❌ Styling inline
<div style={{ color: 'red', margin: '10px' }}>
```

## Checklist Pre-Commit

Prima di ogni commit, verificare:

- [ ] Tutti i componenti usano MUI/MUI-X
- [ ] Nessun CSS personalizzato
- [ ] Componenti tipizzati con TypeScript
- [ ] Design responsive implementato
- [ ] Accessibilità considerata
- [ ] Performance ottimizzata
- [ ] Documentazione aggiornata

## Tools e Utilities

### Storybook Integration
```bash
# Documentare componenti in Storybook
npm run storybook
```

### Testing
```bash
# Test componenti
npm run test

# Coverage
npm run test:coverage
```

### Linting
```bash
# ESLint
npm run lint

# TypeScript check
npm run type-check
```

## Riferimenti

- [MUI Documentation](https://mui.com/)
- [MUI-X Components](https://mui.com/x/)
- [Design System Guidelines](https://mui.com/material-ui/getting-started/design-resources/)
- [Accessibility Best Practices](https://mui.com/material-ui/guides/accessibility/)

---

**Nota**: Queste guidelines sono obbligatorie per tutti i sviluppatori del team. Qualsiasi deviazione deve essere approvata dal lead developer e documentata.
