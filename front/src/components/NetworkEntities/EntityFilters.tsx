import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Select, Card, Text } from "@remira/unifiedui";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { EntityType } from "../../types/supplyNetworkEntities";
import { FormInputChangeEvent } from "../../types/ui";
import {
  getEntityTypeFilterOptions,
  getStatusFilterOptions,
} from "../../constants/networkEntitiesFilters";

// ✅ Proper TypeScript interfaces instead of any types [IV]
interface FilterOption {
  value: string;
  label: string;
}

export interface EntityFiltersProps {
  searchQuery: string;
  filterType: EntityType | "all";
  filterStatus: "all" | "active" | "inactive";
  totalCount: number;
  isLoading: boolean;
  onSearchChange: (e: FormInputChangeEvent) => void;
  /** Handler for entity type filter changes with proper typing [IV] */
  onFilterTypeChange: (
    event: React.SyntheticEvent,
    option: FilterOption | null
  ) => void;
  /** Handler for status filter changes with proper typing [IV] */
  onFilterStatusChange: (
    event: React.SyntheticEvent,
    option: FilterOption | null
  ) => void;
}

/**
 * EntityFilters component with proper TypeScript interfaces [IV]
 *
 * Provides search and filtering functionality for supply network entities
 * with type-safe event handlers and proper interface definitions.
 */
const EntityFilters: React.FC<EntityFiltersProps> = ({
  searchQuery,
  filterType,
  filterStatus,
  totalCount,
  isLoading,
  onSearchChange,
  onFilterTypeChange,
  onFilterStatusChange,
}) => {
  const { t } = useTranslation();

  // Memoized results text to prevent unnecessary re-renders [PA]
  const resultsText = useMemo(() => {
    if (isLoading) return t("networkEntities.loading", "Loading...");
    return t("networkEntities.resultsCount", { count: totalCount });
  }, [isLoading, totalCount, t]);

  // Memoized filter options to prevent recreation [PA]
  const entityTypeOptions = useMemo(() => getEntityTypeFilterOptions(t), [t]);
  const statusOptions = useMemo(() => getStatusFilterOptions(t), [t]);

  return (
    <Card title="Search & Filter">
      <Grid container spacing={2}>
        {/* Search Input */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("networkEntities.search")}
            placeholder={t("networkEntities.searchPlaceholder")}
            value={searchQuery}
            onChange={onSearchChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Entity Type Filter */}
        <Grid item xs={12} md={3}>
          <Select
            label={t("networkEntities.filterByType")}
            value={filterType}
            onChange={onFilterTypeChange}
            options={entityTypeOptions}
            disabled={isLoading}
            fullWidth
            useAutocomplete={true}
            data-testid="entity-type-filter"
          />
        </Grid>

        {/* Status Filter */}
        <Grid item xs={12} md={3}>
          <Select
            label={t("networkEntities.filterByStatus")}
            value={filterStatus}
            onChange={onFilterStatusChange}
            options={statusOptions}
            disabled={isLoading}
            fullWidth
            useAutocomplete={true}
            data-testid="status-filter"
          />
        </Grid>

        {/* Results Count */}
        <Grid item xs={12}>
          <Box sx={{ mt: 1, mb: 2, px: 1 }}>
            <Text variant="body2" sx={{ color: "text.secondary" }}>
              {resultsText}
            </Text>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders [PA]
export default React.memo(EntityFilters);
