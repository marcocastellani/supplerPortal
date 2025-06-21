import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@remira/unifiedui";
import BusinessIcon from "@mui/icons-material/Business";
import { PageHeader } from "./LayoutComponents";
import { FormInputChangeEvent } from "../types/ui";
import { EntityType } from "../types/supplyNetworkEntities";
import { useNetworkEntitiesStore } from "../stores/networkEntitiesStore";
import { ICON_SIZES } from "../constants/ui";
import {
  EntityFilters,
  EntityTable,
  LoadingState,
  ErrorState,
  NoResultsState,
} from "./NetworkEntities/index";

const NetworkEntities: React.FC = () => {
  const { t } = useTranslation();

  // Get state and actions from Zustand store
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
    fetchEntities,
  } = useNetworkEntitiesStore();

  // Fetch entities on mount
  useEffect(() => {
    fetchEntities();
  }, []);

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
    },
    [setFilterType]
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

  // Conditional rendering based on state
  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <PageHeader
            title={t("networkEntities.title")}
            subtitle={t("networkEntities.subtitle")}
            icon={headerIcon}
          />
        </Grid>

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

        <Grid item xs={12}>
          {isLoading ? (
            <LoadingState />
          ) : entities.length === 0 ? (
            <NoResultsState />
          ) : (
            <EntityTable
              entities={entities}
              currentPage={filters.currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={20}
              isLoading={isLoading}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NetworkEntities;
