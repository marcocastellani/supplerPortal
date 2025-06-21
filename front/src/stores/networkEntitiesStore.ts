import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SupplyNetworkEntitiesService } from '@/services/supplyNetworkEntitiesService';
import { SupplyNetworkEntityDto, EntityType } from '@/types/supplyNetworkEntities';
import { logger as log } from '@/utils/logger';
import { DATA_CONSTANTS, TIMING } from '@/constants/ui';

interface NetworkEntitiesFilters {
  searchQuery: string;
  filterType: EntityType | "all";
  filterStatus: "all" | "active" | "inactive";
  currentPage: number;
}

interface NetworkEntitiesState {
  // State
  entities: SupplyNetworkEntityDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalCount: number;
  filters: NetworkEntitiesFilters;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFilterType: (type: EntityType | "all") => void;
  setFilterStatus: (status: "all" | "active" | "inactive") => void;
  setCurrentPage: (page: number) => void;
  fetchEntities: () => Promise<void>;
  reset: () => void;
}

const initialFilters: NetworkEntitiesFilters = {
  searchQuery: "",
  filterType: "all",
  filterStatus: "all",
  currentPage: DATA_CONSTANTS.FIRST_PAGE,
};

// Debounce utility for search
let searchTimeout: NodeJS.Timeout;

export const useNetworkEntitiesStore = create<NetworkEntitiesState>()(
  devtools(
    (set, get) => ({
      // Initial state
      entities: [],
      isLoading: false,
      error: null,
      totalPages: 1,
      totalCount: 0,
      filters: initialFilters,

      // Actions
      setSearchQuery: (query: string) => {
        set((state) => ({
          filters: {
            ...state.filters,
            searchQuery: query,
            currentPage: DATA_CONSTANTS.FIRST_PAGE,
          },
        }));
        
        // Debounced search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          get().fetchEntities();
        }, TIMING.DEBOUNCE_DELAY);
      },

      setFilterType: (type: EntityType | "all") => {
        set((state) => ({
          filters: {
            ...state.filters,
            filterType: type,
            currentPage: DATA_CONSTANTS.FIRST_PAGE,
          },
        }));
        get().fetchEntities();
      },

      setFilterStatus: (status: "all" | "active" | "inactive") => {
        set((state) => ({
          filters: {
            ...state.filters,
            filterStatus: status,
            currentPage: DATA_CONSTANTS.FIRST_PAGE,
          },
        }));
        get().fetchEntities();
      },

      setCurrentPage: (page: number) => {
        const totalPages = get().totalPages;
        if (page >= DATA_CONSTANTS.FIRST_PAGE && page <= totalPages) {
          set((state) => ({
            filters: {
              ...state.filters,
              currentPage: page,
            },
          }));
          get().fetchEntities();
        }
      },

      fetchEntities: async () => {
        const { filters } = get();
        set({ isLoading: true, error: null });

        try {
          log.info("Fetching network entities", {
            component: "networkEntitiesStore",
            filters,
          });

          const entityType = filters.filterType === "all" ? undefined : filters.filterType;
          const activeFilter = filters.filterStatus === "all" 
            ? undefined 
            : filters.filterStatus === "active";

          const result = await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
            searchTerm: filters.searchQuery || undefined,
            entityType,
            active: activeFilter,
            page: filters.currentPage,
            pageSize: DATA_CONSTANTS.DEFAULT_PAGE_SIZE,
            sortBy: "legalName",
            sortDescending: false,
          });

          set({
            entities: result.items || [],
            totalPages: result.totalPages || 1,
            totalCount: result.totalCount || 0,
            isLoading: false,
          });

          log.info("Network entities fetched successfully", {
            component: "networkEntitiesStore",
            count: result.items?.length || 0,
            totalCount: result.totalCount || 0,
          });
        } catch (error) {
          log.error("Failed to fetch network entities", {
            component: "networkEntitiesStore",
            error,
            filters,
          });
          
          set({
            error: "Failed to fetch network entities",
            entities: [],
            isLoading: false,
          });
        }
      },

      reset: () => {
        clearTimeout(searchTimeout);
        set({
          entities: [],
          isLoading: false,
          error: null,
          totalPages: 1,
          totalCount: 0,
          filters: initialFilters,
        });
      },
    }),
    {
      name: 'network-entities-store',
    }
  )
);