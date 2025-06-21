import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  TemplateFilters,
  PaginatedTemplatesResponse,
  QuestionnaireTemplateResponse,
  TemplateStatus,
} from "../types/questionnaire-templates";
import { questionnaireTemplatesApi } from "../services/questionnaire-templates-api";
import { useDebounce } from "./useDebounce";

/**
 * Custom hook for managing templates list with search, filtering, pagination and sorting
 * Follows established patterns for data fetching and state management [CA, SF]
 */
export const useTemplatesList = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-synchronized filter state [SF]
  const initialFilters: TemplateFilters = useMemo(
    () => ({
      searchTerm: searchParams.get("search") || "",
      status: searchParams.get("status")
        ? (parseInt(searchParams.get("status")!) as TemplateStatus)
        : undefined,
      language: searchParams.get("language") || "",
      createdFrom: searchParams.get("createdFrom") || "",
      createdTo: searchParams.get("createdTo") || "",
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
      sortBy:
        (searchParams.get("sortBy") as TemplateFilters["sortBy"]) ||
        "lastmodified",
      sortDirection:
        (searchParams.get("sortDirection") as "asc" | "desc") || "desc",
    }),
    [searchParams]
  );

  // Component state
  const [filters, setFilters] = useState<TemplateFilters>(initialFilters);
  const [templates, setTemplates] = useState<QuestionnaireTemplateResponse[]>(
    []
  );
  const [paginationData, setPaginationData] =
    useState<PaginatedTemplatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search term to avoid excessive API calls [PA]
  const debouncedSearchTerm = useDebounce(filters.searchTerm || "", 500);

  /**
   * Updates URL search parameters to maintain state persistence [DRY]
   */
  const updateUrlParams = useCallback(
    (newFilters: TemplateFilters) => {
      const params = new URLSearchParams();

      // Only add non-empty values to URL
      if (newFilters.searchTerm) params.set("search", newFilters.searchTerm);
      if (newFilters.status) params.set("status", newFilters.status.toString());
      if (newFilters.language) params.set("language", newFilters.language);
      if (newFilters.createdFrom)
        params.set("createdFrom", newFilters.createdFrom);
      if (newFilters.createdTo) params.set("createdTo", newFilters.createdTo);
      if (newFilters.page && newFilters.page > 1)
        params.set("page", newFilters.page.toString());
      if (newFilters.pageSize && newFilters.pageSize !== 10)
        params.set("pageSize", newFilters.pageSize.toString());
      if (newFilters.sortBy && newFilters.sortBy !== "lastmodified")
        params.set("sortBy", newFilters.sortBy);
      if (newFilters.sortDirection && newFilters.sortDirection !== "desc")
        params.set("sortDirection", newFilters.sortDirection);

      setSearchParams(params);
    },
    [setSearchParams]
  );

  /**
   * Fetches templates with current filters [REH]
   */
  const fetchTemplates = useCallback(
    async (filtersToUse: TemplateFilters) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await questionnaireTemplatesApi.getTemplates(
          filtersToUse
        );

        setTemplates(response.templates);
        setPaginationData(response);
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          t("templates.errors.fetchFailed");
        setError(errorMessage);
        console.error("Failed to fetch templates:", err);

        // Reset data on error to avoid stale state [REH]
        setTemplates([]);
        setPaginationData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  /**
   * Updates filters and triggers fetch [AC]
   */
  const updateFilters = useCallback(
    (newFilters: Partial<TemplateFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };

      // Reset to page 1 when changing filters (except pagination changes) [SF]
      if (
        "searchTerm" in newFilters ||
        "status" in newFilters ||
        "language" in newFilters ||
        "createdFrom" in newFilters ||
        "createdTo" in newFilters ||
        "sortBy" in newFilters ||
        "sortDirection" in newFilters
      ) {
        updatedFilters.page = 1;
      }

      setFilters(updatedFilters);
      updateUrlParams(updatedFilters);
    },
    [filters, updateUrlParams]
  );

  /**
   * Pagination change handler [DRY]
   */
  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters]
  );

  /**
   * Page size change handler [DRY]
   */
  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      updateFilters({ pageSize, page: 1 }); // Reset to first page when changing page size
    },
    [updateFilters]
  );

  /**
   * Sort change handler [DRY]
   */
  const handleSortChange = useCallback(
    (sortBy: TemplateFilters["sortBy"], sortDirection?: "asc" | "desc") => {
      // Toggle direction if same field, otherwise default to desc for new field
      const newDirection =
        sortDirection ||
        (filters.sortBy === sortBy && filters.sortDirection === "desc"
          ? "asc"
          : "desc");

      updateFilters({ sortBy, sortDirection: newDirection });
    },
    [filters.sortBy, filters.sortDirection, updateFilters]
  );

  /**
   * Clear all filters [SF]
   */
  const clearFilters = useCallback(() => {
    const defaultFilters: TemplateFilters = {
      searchTerm: "",
      page: 1,
      pageSize: 10,
      sortBy: "lastmodified",
      sortDirection: "desc",
    };

    setFilters(defaultFilters);
    updateUrlParams(defaultFilters);
  }, [updateUrlParams]);

  /**
   * Refresh templates with current filters [DRY]
   */
  const refreshTemplates = useCallback(() => {
    fetchTemplates(filters);
  }, [fetchTemplates, filters]);

  // Fetch templates when debounced search term or other filters change
  useEffect(() => {
    const filtersWithDebouncedSearch = {
      ...filters,
      searchTerm: debouncedSearchTerm,
    };

    fetchTemplates(filtersWithDebouncedSearch);
  }, [
    debouncedSearchTerm,
    filters.status,
    filters.language,
    filters.createdFrom,
    filters.createdTo,
    filters.page,
    filters.pageSize,
    filters.sortBy,
    filters.sortDirection,
    fetchTemplates,
  ]);

  // Computed values for UI [SF]
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.searchTerm ||
      filters.status ||
      filters.language ||
      filters.createdFrom ||
      filters.createdTo ||
      (filters.sortBy && filters.sortBy !== "lastmodified") ||
      (filters.sortDirection && filters.sortDirection !== "desc")
    );
  }, [filters]);

  const isEmpty = !isLoading && templates.length === 0;
  const hasError = !isLoading && !!error;

  return {
    // Data
    templates,
    paginationData,
    filters,

    // States
    isLoading,
    error,
    isEmpty,
    hasError,
    hasActiveFilters,

    // Actions
    updateFilters,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
    clearFilters,
    refreshTemplates,

    // Computed
    totalCount: paginationData?.totalCount || 0,
    currentPage: filters.page || 1,
    pageSize: filters.pageSize || 10,
  };
};
