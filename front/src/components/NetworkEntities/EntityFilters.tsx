import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Select, Card, Text } from '@remira/unifiedui';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { EntityType } from '../../types/supplyNetworkEntities';
import { FormInputChangeEvent } from '../../types/ui';
import { getEntityTypeFilterOptions, getStatusFilterOptions } from '../../constants/networkEntitiesFilters';

export interface EntityFiltersProps {
  searchQuery: string;
  filterType: EntityType | 'all';
  filterStatus: 'all' | 'active' | 'inactive';
  totalCount: number;
  isLoading: boolean;
  onSearchChange: (e: FormInputChangeEvent) => void;
  onFilterTypeChange: (event: any, option: any) => void;
  onFilterStatusChange: (event: any, option: any) => void;
}

export const EntityFilters: React.FC<EntityFiltersProps> = ({
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

  const entityTypeOptions = getEntityTypeFilterOptions(t);
  const statusOptions = getStatusFilterOptions(t);

  return (
    <Card title="Search & Filter">
      <Box p={2}>
        <Grid container spacing={2}>
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t('networkEntities.searchPlaceholder')}
              value={searchQuery}
              onChange={onSearchChange}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Entity Type Filter */}
          <Grid item xs={12} md={3}>
            <Select
              value={filterType}
              onChange={onFilterTypeChange}
              options={entityTypeOptions}
              fullWidth
              disabled={isLoading}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} md={3}>
            <Select
              value={filterStatus}
              onChange={onFilterStatusChange}
              options={statusOptions}
              fullWidth
              disabled={isLoading}
            />
          </Grid>
        </Grid>

        {/* Results Count */}
        {!isLoading && (
          <Box mt={2}>
            <Text variant="body2">
              {t('networkEntities.resultsCount', { count: totalCount })}
            </Text>
          </Box>
        )}
      </Box>
    </Card>
  );
};
