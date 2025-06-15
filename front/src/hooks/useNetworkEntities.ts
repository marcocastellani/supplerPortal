import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { EntityType, SupplyNetworkEntityDto } from '../types/supplyNetworkEntities';
import { log } from '../utils/logger';

export interface NetworkEntitiesFilters {
  searchQuery: string;
  filterType: EntityType | 'all';
  filterStatus: 'all' | 'active' | 'inactive';
  currentPage: number;
}

export interface NetworkEntitiesState {
  entities: SupplyNetworkEntityDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalCount: number;
  filters: NetworkEntitiesFilters;
}

export interface NetworkEntitiesActions {
  setSearchQuery: (query: string) => void;
  setFilterType: (type: EntityType | 'all') => void;
  setFilterStatus: (status: 'all' | 'active' | 'inactive') => void;
  setCurrentPage: (page: number) => void;
  refetch: () => void;
}

const PAGE_SIZE = 20;

export const useNetworkEntities = (): NetworkEntitiesState & NetworkEntitiesActions => {
  const { t } = useTranslation();
  
  // State management
  const [entities, setEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters state
  const [filters, setFilters] = useState<NetworkEntitiesFilters>({
    searchQuery: '',
    filterType: 'all',
    filterStatus: 'all',
    currentPage: 1,
  });

  // Fetch entities function
  const fetchEntities = useCallback(
    async (
      search: string,
      type: EntityType | 'all',
      status: 'all' | 'active' | 'inactive',
      page: number
    ) => {
      setIsLoading(true);
      setError(null);

      log.info('Fetching network entities', {
        component: 'useNetworkEntities',
        search,
        type,
        status,
        page,
        pageSize: PAGE_SIZE
      });

      try {
        const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
          searchTerm: search || undefined,
          entityType: type !== 'all' ? type : undefined,
          active: status === 'all' ? undefined : status === 'active',
          page: page,
          pageSize: PAGE_SIZE,
          sortBy: 'legalName',
          sortDescending: false,
        });

        setEntities(response.items || []);
        setTotalPages(response.totalPages || 1);
        setTotalCount(response.totalCount || 0);
        
        log.info('Network entities fetched successfully', {
          component: 'useNetworkEntities',
          count: response.items?.length || 0,
          totalCount: response.totalCount || 0
        });
      } catch (error) {
        const errorMessage = t('networkEntities.errorFetching');
        log.error('Failed to fetch network entities', {
          component: 'useNetworkEntities',
          error,
          search,
          type,
          status,
          page
        });
        setError(errorMessage);
        setEntities([]);
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce(
      (
        search: string,
        type: EntityType | 'all',
        status: 'all' | 'active' | 'inactive',
        page: number
      ) => {
        fetchEntities(search, type, status, page);
      },
      500
    ),
    [fetchEntities]
  );

  // Effect to fetch data when filters change
  useEffect(() => {
    debouncedFetch(
      filters.searchQuery,
      filters.filterType,
      filters.filterStatus,
      filters.currentPage
    );

    // Cleanup
    return () => {
      debouncedFetch.cancel();
    };
  }, [filters, debouncedFetch]);

  // Actions
  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
      currentPage: 1 // Reset to first page on search
    }));
  }, []);

  const setFilterType = useCallback((type: EntityType | 'all') => {
    setFilters(prev => ({
      ...prev,
      filterType: type,
      currentPage: 1 // Reset to first page on filter change
    }));
  }, []);

  const setFilterStatus = useCallback((status: 'all' | 'active' | 'inactive') => {
    setFilters(prev => ({
      ...prev,
      filterStatus: status,
      currentPage: 1 // Reset to first page on filter change
    }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilters(prev => ({
        ...prev,
        currentPage: page
      }));
    }
  }, [totalPages]);

  const refetch = useCallback(() => {
    fetchEntities(
      filters.searchQuery,
      filters.filterType,
      filters.filterStatus,
      filters.currentPage
    );
  }, [fetchEntities, filters]);

  return {
    // State
    entities,
    isLoading,
    error,
    totalPages,
    totalCount,
    filters,
    // Actions
    setSearchQuery,
    setFilterType,
    setFilterStatus,
    setCurrentPage,
    refetch,
  };
};
