import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Mock ResizeObserver che spesso manca in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia che spesso manca in jsdom 
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock the entire i18n configuration file
vi.mock('../i18n', () => ({
  default: {
    t: (key: string) => key,
    changeLanguage: () => Promise.resolve(),
    language: 'en',
  },
}));

// Mock react-i18next and related packages
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      // Handle pagination text with parameters
      if (key === 'networkEntities.pagination.showing') {
        const { from, to, total } = options || {};
        return `Showing ${from} to ${to} of ${total} results`;
      }
      // Handle other translations
      const translations: { [key: string]: string } = {
        'networkEntities.search': 'Search entities...',
        'networkEntities.subtitle': 'Manage your supply network entities',
        'networkEntities.errorFetching': 'Failed to fetch entities',
        'networkEntities.table.name': 'Name',
        'networkEntities.table.vat': 'VAT',
        'networkEntities.table.code': 'Code',
        'networkEntities.table.location': 'Location',
        'networkEntities.table.type': 'Type',
        'networkEntities.table.status': 'Status',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  Trans: ({ children }: any) => React.createElement('span', {}, children),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

vi.mock('i18next', () => ({
  default: {
    use: () => ({
      use: () => ({
        use: () => ({
          init: () => Promise.resolve(),
        }),
      }),
    }),
  },
}));

vi.mock('i18next-browser-languagedetector', () => ({
  default: {
    type: 'languageDetector',
  },
}));

vi.mock('i18next-http-backend', () => ({
  default: {
    type: 'backend',
  },
}));

// Mock @remira/unifiedui components to avoid ES module issues
vi.mock('@remira/unifiedui', () => ({
  Container: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'container' }, children),
  Button: ({ children, ...props }: any) => React.createElement('button', { ...props, 'data-testid': 'button' }, children),
  TextField: ({ ...props }: any) => React.createElement('input', { ...props, 'data-testid': 'textfield' }),
  Select: ({ label, value, onChange, options, disabled, fullWidth, ...props }: any) =>
    React.createElement('select', {
      'data-testid': props['data-testid'] || 'select',
      'aria-label': label,
      value: value || '',
      onChange: (e: any) => onChange?.(e.target.value),
      disabled,
      style: fullWidth ? { width: '100%' } : undefined,
      role: 'combobox',
    }, [
      React.createElement('option', { key: 'default', value: '' }, label),
      ...(options || []).map((option: any) =>
        React.createElement('option', {
          key: option.value,
          value: option.value,
        }, option.label)
      )
    ]),
  MenuItem: ({ children, ...props }: any) => React.createElement('option', { ...props, 'data-testid': 'menuitem' }, children),
  FormControl: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'formcontrol' }, children),
  InputLabel: ({ children, ...props }: any) => React.createElement('label', { ...props, 'data-testid': 'inputlabel' }, children),
  Chip: ({ label, ...props }: any) => React.createElement('span', { ...props, 'data-testid': 'chip' }, label),
  Alert: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'alert' }, children),
  CircularProgress: ({ ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'circular-progress' }, 'Loading...'),
  Typography: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'typography' }, children),
  Text: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'text' }, children),
  Box: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'box' }, children),
  Grid: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'grid' }, children),
  Card: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card' }, children),
  CardContent: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'card-content' }, children),
  TableContainer: ({ children, ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'table-container' }, children),
  Table: ({ children, ...props }: any) => React.createElement('table', { ...props, 'data-testid': 'table' }, children),
  TableHead: ({ children, ...props }: any) => React.createElement('thead', { ...props, 'data-testid': 'table-head' }, children),
  TableBody: ({ children, ...props }: any) => React.createElement('tbody', { ...props, 'data-testid': 'table-body' }, children),
  TableRow: ({ children, ...props }: any) => React.createElement('tr', { ...props, 'data-testid': 'table-row' }, children),
  TableCell: ({ children, ...props }: any) => React.createElement('td', { ...props, 'data-testid': 'table-cell' }, children),
  Pagination: ({ ...props }: any) => React.createElement('div', { ...props, 'data-testid': 'pagination' }, 'Pagination'),
  IconButton: ({ children, ...props }: any) => React.createElement('button', { ...props, 'data-testid': 'icon-button' }, children),
  Tooltip: ({ children, title, ...props }: any) => React.createElement('div', { title, ...props, 'data-testid': 'tooltip' }, children),
}));

// Mock Material-UI components that might cause issues
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Pagination: ({ count, page, onChange, ...props }: any) => {
      return React.createElement('div', { 
        'data-testid': 'mui-pagination',
        ...props 
      }, [
        React.createElement('span', { key: 'page-info' }, `Page ${page} of ${count}`),
        React.createElement('button', { 
          key: 'prev',
          onClick: () => onChange?.(null, Math.max(1, page - 1)),
          disabled: page <= 1 
        }, 'Previous'),
        React.createElement('button', { 
          key: 'next',
          onClick: () => onChange?.(null, Math.min(count, page + 1)),
          disabled: page >= count 
        }, 'Next'),
      ]);
    },
  };
});

// Mock Material-UI icons
vi.mock('@mui/icons-material', () => ({
  Search: () => React.createElement('span', null, 'SearchIcon'),
  FilterList: () => React.createElement('span', null, 'FilterIcon'),
  Refresh: () => React.createElement('span', null, 'RefreshIcon'),
  Business: () => React.createElement('span', null, 'BusinessIcon'),
  Person: () => React.createElement('span', null, 'PersonIcon'),
  LocationOn: () => React.createElement('span', null, 'LocationIcon'),
  CheckCircle: () => React.createElement('span', null, 'CheckIcon'),
  Error: () => React.createElement('span', null, 'ErrorIcon'),
  Warning: () => React.createElement('span', null, 'WarningIcon'),
  Info: () => React.createElement('span', null, 'InfoIcon'),
}));
