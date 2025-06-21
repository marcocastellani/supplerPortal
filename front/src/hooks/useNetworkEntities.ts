import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntitiesService } from "@/services/supplyNetworkEntitiesService";
import {
  SupplyNetworkEntityDto,
  EntityType,
} from "@/types/supplyNetworkEntities";
import { logger as log } from "@/utils/logger";
import { useApiErrorHandler } from "@/hooks/useErrorHandler";
import { TIMING, DATA_CONSTANTS } from "@/constants/ui";

// Simple debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: NodeJS.Timeout;

  const debouncedFunction = ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T & { cancel: () => void };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
}

interface UseNetworkEntitiesFilters {
  searchQuery: string;
  filterType: EntityType | "all";
  filterStatus: "all" | "active" | "inactive";
  currentPage: number;
}

interface UseNetworkEntitiesReturn {
  entities: SupplyNetworkEntityDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  totalCount: number;
  filters: UseNetworkEntitiesFilters;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: EntityType | "all") => void;
  setFilterStatus: (status: "all" | "active" | "inactive") => void;
  setCurrentPage: (page: number) => void;
  refetch: () => void;
}

/**
 * Custom hook for managing network entities data with search, filtering, and pagination [DRY]
 */
export function useNetworkEntities(): UseNetworkEntitiesReturn {
  const { t } = useTranslation();
  const { handleApiError } = useApiErrorHandler("useNetworkEntities");

  // State
  const [entities, setEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filters state
  const [filters, setFilters] = useState<UseNetworkEntitiesFilters>({
    searchQuery: "",
    filterType: "all",
    filterStatus: "all",
    currentPage: DATA_CONSTANTS.FIRST_PAGE,
  });

 
  const debouncedFetch = useCallback(
    debounce(
      async (
        search: string,
        type: EntityType | "all",
        status: "all" | "active" | "inactive",
        page: number
      ) => {
        setIsLoading(true);
        setError(null);

        try {
          log.info("Fetching network entities", {
            component: "useNetworkEntities",
            search,
            type,
            status,
            page,
          });

          const entityType = type === "all" ? undefined : (type as EntityType);
          const activeFilter =
            status === "all" ? undefined : status === "active";

          const result =
            await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
              searchTerm: search || undefined,
              entityType,
              active: activeFilter,
              page,
              pageSize: DATA_CONSTANTS.DEFAULT_PAGE_SIZE,
              sortBy: "legalName",
              sortDescending: false,
            });

          setEntities(result.items || []);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.totalCount || 0);

          log.info("Network entities fetched successfully", {
            component: "useNetworkEntities",
            count: result.items?.length || 0,
            totalCount: result.totalCount || 0,
          });
        } catch (err) {
          handleApiError(err, "/supply-network-entities", "GET");
          log.error("Failed to fetch network entities", {
            component: "useNetworkEntities",
            error: err,
            search,
            type,
            status,
            page,
          });
          setError(t("networkEntities.errorFetching"));
          setEntities([]);
        } finally {
          setIsLoading(false);
        }
      },
      TIMING.DEBOUNCE_DELAY
    ),
    [t, handleApiError] // Minimal dependencies to prevent recreating debounced function
  );

  // Effect to fetch data when filters change - remove debouncedFetch from dependencies [PA]
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
  }, [filters]); // Remove debouncedFetch from dependencies to prevent infinite loop

  // Actions
  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: DATA_CONSTANTS.FIRST_PAGE, // Reset to first page on search
    }));
  }, []);

  const setFilterType = useCallback((type: EntityType | "all") => {
    setFilters((prev) => ({
      ...prev,
      filterType: type,
      currentPage: DATA_CONSTANTS.FIRST_PAGE, // Reset to first page on filter change
    }));
  }, []);

  const setFilterStatus = useCallback(
    (status: "all" | "active" | "inactive") => {
      setFilters((prev) => ({
        ...prev,
        filterStatus: status,
        currentPage: DATA_CONSTANTS.FIRST_PAGE, // Reset to first page on filter change
      }));
    },
    []
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      if (page >= DATA_CONSTANTS.FIRST_PAGE && page <= totalPages) {
        setFilters((prev) => ({
          ...prev,
          currentPage: page,
        }));
      }
    },
    [totalPages]
  );

  const refetch = useCallback(() => {
    debouncedFetch(
      filters.searchQuery,
      filters.filterType,
      filters.filterStatus,
      filters.currentPage
    );
  }, [debouncedFetch, filters]);

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
}
