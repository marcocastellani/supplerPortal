import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import NetworkEntities from './NetworkEntities';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { EntityType } from '../types/supplyNetworkEntities';

// Mock the translation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      const translations: Record<string, string> = {
        'networkEntities.title': 'Network Entities',
        'networkEntities.searchPlaceholder': 'Search entities...',
        'networkEntities.filterAll': 'All',
        'networkEntities.filterSupplier': 'Supplier',
        'networkEntities.filterSite': 'Site',
        'networkEntities.filterSubSupplier': 'Sub-Supplier',
        'networkEntities.filterPerson': 'Person',
        'networkEntities.filterCompanyGroup': 'Company Group',
        'networkEntities.errorFetching': 'Error fetching entities',
        'networkEntities.noResults': 'No results found',
        'networkEntities.resultsCount': `${params?.count || 0} results found`,
        'networkEntities.table.name': 'Name',
        'networkEntities.table.code': 'Code',
        'networkEntities.table.type': 'Type',
        'networkEntities.table.location': 'Location',
        'networkEntities.table.status': 'Status',
        'networkEntities.status.active': 'Active',
        'networkEntities.status.inactive': 'Inactive',
        'networkEntities.entityType.supplier': 'Supplier',
        'networkEntities.entityType.site': 'Site',
        'networkEntities.entityType.subSupplier': 'Sub-Supplier',
        'networkEntities.entityType.person': 'Person',
        'networkEntities.entityType.companyGroup': 'Company Group',
        'networkEntities.pagination.previous': 'Previous',
        'networkEntities.pagination.next': 'Next',
        'networkEntities.pagination.showing': `Showing ${params?.from || 0} to ${params?.to || 0} of ${params?.total || 0} results`,
        'networkEntities.pagination.page': `Page ${params?.current || 0} of ${params?.total || 0}`,
      };
      return translations[key] || key;
    },
  }),
}));

// Mock debounce to be immediate in tests
vi.mock('lodash/debounce', () => ({
  default: (fn: any) => {
    fn.cancel = () => {};
    return fn;
  }
}));

// Mock the service
vi.mock('../services/supplyNetworkEntitiesService');

const mockEntities = [
  {
    id: '1',
    externalCode: 'SUP001',
    entityType: EntityType.Supplier,
    legalName: 'Supplier One',
    shortName: 'Sup1',
    vatCode: 'VAT123',
    taxCode: 'TAX123',
    country: 'Italy',
    region: 'Lombardy',
    city: 'Milan',
    address: 'Via Roma 1',
    zipCode: '20100',
    email: 'supplier1@example.com',
    phoneNumber: '+39 02 1234567',
    contactPersonName: 'John Doe',
    roleInSupplyChain: 'Manufacturer' as any,
    tags: ['electronics', 'components'],
    active: true,
    accreditationStatus: 'Approved' as any,
    accreditationDate: '2024-01-01',
    createdAt: '2024-01-01',
    created: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    externalCode: 'SITE001',
    entityType: EntityType.Site,
    legalName: 'Production Site Alpha',
    shortName: 'Site Alpha',
    vatCode: 'VAT456',
    taxCode: 'TAX456',
    country: 'Germany',
    region: 'Bavaria',
    city: 'Munich',
    address: 'Hauptstraße 10',
    zipCode: '80331',
    email: 'site.alpha@example.com',
    phoneNumber: '+49 89 987654',
    contactPersonName: 'Jane Smith',
    roleInSupplyChain: 'Assembler' as any,
    tags: ['production', 'assembly'],
    active: false,
    accreditationStatus: 'Draft' as any,
    accreditationDate: undefined,
    createdAt: '2024-02-01',
    created: '2024-02-01',
    updatedAt: '2024-02-01',
  },
];

const mockResponse = {
  items: mockEntities,
  totalCount: 2,
  page: 1,
  pageSize: 20,
  totalPages: 1,
  hasPreviousPage: false,
  hasNextPage: false,
};

describe('NetworkEntities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(SupplyNetworkEntitiesService.getSupplyNetworkEntities).mockResolvedValue(mockResponse);
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <NetworkEntities />
      </BrowserRouter>
    );
  };

  it('renders component with title', () => {
    renderComponent();
    expect(screen.getByText('Network Entities')).toBeInTheDocument();
  });

  it('loads entities on mount', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenCalledWith({
        searchTerm: undefined,
        entityType: undefined,
        page: 1,
        pageSize: 20,
        sortBy: 'legalName',
        sortDescending: false,
      });
    });

    expect(screen.getByText('Supplier One')).toBeInTheDocument();
    expect(screen.getByText('Production Site Alpha')).toBeInTheDocument();
  });

  it('displays loading state', async () => {
    vi.mocked(SupplyNetworkEntitiesService.getSupplyNetworkEntities).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('displays error state', async () => {
    vi.mocked(SupplyNetworkEntitiesService.getSupplyNetworkEntities).mockRejectedValue(
      new Error('Network error')
    );
    
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Error fetching entities')).toBeInTheDocument();
    });
  });

  it('displays no results state', async () => {
    vi.mocked(SupplyNetworkEntitiesService.getSupplyNetworkEntities).mockResolvedValue({
      ...mockResponse,
      items: [],
      totalCount: 0,
    });
    
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('filters by entity type', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
    });

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: EntityType.Supplier } });

    await waitFor(() => {
      expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenLastCalledWith({
        searchTerm: undefined,
        entityType: EntityType.Supplier,
        page: 1,
        pageSize: 20,
        sortBy: 'legalName',
        sortDescending: false,
      });
    });
  });

  it('searches entities with debounce', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search entities...');
    fireEvent.change(searchInput, { target: { value: 'Supplier' } });

    // Should not call immediately
    expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenCalledTimes(1);

    // Debounce is mocked as immediate, so call happens immediately
    await waitFor(() => {
      expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenCalledTimes(2);
      expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenLastCalledWith({
        searchTerm: 'Supplier',
        entityType: undefined,
        page: 1,
        pageSize: 20,
        sortBy: 'legalName',
        sortDescending: false,
      });
    });
  });

  it('displays entity details correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
    });

    // Check if all columns are displayed
    expect(screen.getByText('SUP001')).toBeInTheDocument();
    expect(screen.getByText('Milan, Italy')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('navigates to entity detail on click', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
    });

    const supplierLink = screen.getByText('Supplier One');
    expect(supplierLink.closest('a')).toHaveAttribute('href', '/supply-network/entity/1');
  });

  it('handles pagination', async () => {
    vi.mocked(SupplyNetworkEntitiesService.getSupplyNetworkEntities).mockResolvedValue({
      ...mockResponse,
      totalCount: 50,
      totalPages: 3,
      hasNextPage: true,
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Supplier One')).toBeInTheDocument();
    });

    // Check pagination info
    expect(screen.getByText('Showing 1 to 20 of 50 results')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();

    // Click next page
    const nextButton = screen.getAllByText('Next')[0];
    fireEvent.click(nextButton);
 
    await waitFor(() => {
      expect(SupplyNetworkEntitiesService.getSupplyNetworkEntities).toHaveBeenLastCalledWith({
        searchTerm: undefined,
        entityType: undefined,
        page: 2,
        pageSize: 20,
        sortBy: 'legalName',
        sortDescending: false,
      });
    });
  });
});
