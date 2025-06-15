import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@remira/unifiedui";
import BusinessIcon from "@mui/icons-material/Business";
import { PageHeader } from "./LayoutComponents";
import { FormInputChangeEvent } from "../types/ui";
import { EntityType } from "../types/supplyNetworkEntities";
import { useNetworkEntities } from "../hooks/useNetworkEntities";
import { DEFAULT_PAGE_SIZE } from "../constants/networkEntitiesFilters";
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

  // Event handlers
  const handleSearchChange = (e: FormInputChangeEvent) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterTypeChange = (event: any, option: any) => {
    const newValue = option?.value || event?.target?.value || "all";
    setFilterType(newValue as EntityType | "all");
  };

  const handleFilterStatusChange = (event: any, option: any) => {
    const newValue = option?.value || event?.target?.value || "all";
    setFilterStatus(newValue as "all" | "active" | "inactive");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container type="page">
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid item xs={12}>
          <PageHeader
            title={t("networkEntities.title")}
            subtitle={t("networkEntities.subtitle", "Gestione entità della rete di fornitura")}
            icon={<BusinessIcon color="primary" sx={{ fontSize: 32 }} />}
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
          {isLoading && <LoadingState data-testid="loading-spinner" />}

          {/* Error State */}
          {error && !isLoading && <ErrorState error={error} />}

          {/* No Results State */}
          {!isLoading && !error && entities.length === 0 && <NoResultsState />}

          {/* Results Table */}
          {!isLoading && !error && entities.length > 0 && (
            <EntityTable
              entities={entities}
              currentPage={filters.currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={DEFAULT_PAGE_SIZE}
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
