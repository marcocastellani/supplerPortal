import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@remira/unifiedui";
import BusinessIcon from "@mui/icons-material/Business";
import { PageHeader } from "./LayoutComponents";
import { FormInputChangeEvent } from "../types/ui";
import { EntityType } from "../types/supplyNetworkEntities";
import { useNetworkEntities } from "../hooks/useNetworkEntities";
import { ICON_SIZES, DATA_CONSTANTS } from "../constants/ui";
import {
  EntityFilters,
  EntityTable,
  LoadingState,
  ErrorState,
  NoResultsState,
} from "./NetworkEntities/index";

const NetworkEntities: React.FC = () => {
  const { t } = useTranslation();

  const {
    entities,
    isLoading,
    error,
    totalPages,
    totalCount,
    filters,
    setSearchQuery,
    setFilterType,
    setFilterStatus,
    setCurrentPage,
  } = useNetworkEntities();

  // Memoized event handlers [PA]
  const handleSearchChange = useCallback(
    (e: FormInputChangeEvent) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleFilterTypeChange = useCallback(
    (event: any, option: any) => {
      const newValue = option?.value || event?.target?.value || "all";
      setFilterType(newValue as EntityType | "all");
      setCurrentPage(DATA_CONSTANTS.FIRST_PAGE);
    },
    [setFilterType, setCurrentPage]
  );

  const handleFilterStatusChange = useCallback(
    (event: any, option: any) => {
      const newValue = option?.value || event?.target?.value || "all";
      setFilterStatus(newValue as "all" | "active" | "inactive");
    },
    [setFilterStatus]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  // Memoized icon to prevent re-renders [PA]
  const headerIcon = useMemo(
    () => <BusinessIcon color="primary" sx={{ fontSize: ICON_SIZES.LARGE }} />,
    []
  );

  // Memoized subtitle with fallback [PA]
  const subtitle = useMemo(
    () =>
      t("networkEntities.subtitle", "Gestione entità della rete di fornitura"),
    [t]
  );

  // Memoized content states [PA]
  const contentState = useMemo(() => {
    if (isLoading) return "loading";
    if (error && !isLoading) return "error";
    if (!isLoading && !error && entities.length === 0) return "no-results";
    if (!isLoading && !error && entities.length > 0) return "results";
    return "unknown";
  }, [isLoading, error, entities.length]);

  return (
    <Container type="page">
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid item xs={12}>
          <PageHeader
            title={t("networkEntities.title")}
            subtitle={subtitle}
            icon={headerIcon}
          />
        </Grid>

        {/* Search and Filter Controls */}
        <Grid item xs={12}>
          <EntityFilters
            searchQuery={filters.searchQuery}
            filterType={filters.filterType}
            filterStatus={filters.filterStatus}
            totalCount={totalCount}
            isLoading={isLoading}
            onSearchChange={handleSearchChange}
            onFilterTypeChange={handleFilterTypeChange}
            onFilterStatusChange={handleFilterStatusChange}
          />
        </Grid>

        {/* Content Section */}
        <Grid item xs={12}>
          {/* Loading State */}
          {contentState === "loading" && (
            <LoadingState data-testid="loading-spinner" />
          )}

          {/* Error State */}
          {contentState === "error" && <ErrorState error={error!} />}

          {/* No Results State */}
          {contentState === "no-results" && <NoResultsState />}

          {/* Results Table */}
          {contentState === "results" && (
            <EntityTable
              entities={entities}
              currentPage={filters.currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={DATA_CONSTANTS.DEFAULT_PAGE_SIZE}
              isLoading={isLoading}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

// Memoize the component to prevent unnecessary re-renders [PA]
export default React.memo(NetworkEntities);
