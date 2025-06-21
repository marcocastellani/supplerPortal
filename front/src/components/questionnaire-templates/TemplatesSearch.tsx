import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Collapse,
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
// Note: Using text inputs for date filtering to avoid dependency issues
// Can be upgraded to DatePicker components once date-fns dependency is properly resolved
import {
  TemplateStatus,
  TemplateFilters,
} from "../../types/questionnaire-templates";
import { useDebounce } from "../../hooks/useDebounce";

interface TemplatesSearchProps {
  filters: TemplateFilters;
  onFiltersChange: (filters: TemplateFilters) => void;
  isLoading?: boolean;
}

/**
 * Component for searching and filtering questionnaire templates
 * Following UnifiedUI design patterns with debounced search and collapsible advanced filters
 */
const TemplatesSearch: React.FC<TemplatesSearchProps> = ({
  filters,
  onFiltersChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Debounce search term to avoid excessive API calls [PA]
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update filters when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.searchTerm) {
      onFiltersChange({
        ...filters,
        searchTerm: debouncedSearchTerm || undefined,
        page: 1, // Reset to first page when searching
      });
    }
  }, [debouncedSearchTerm, filters, onFiltersChange]);

  /**
   * Handles filter changes and resets to first page [DRY]
   */
  const handleFilterChange = useCallback(
    (field: keyof TemplateFilters, value: any) => {
      onFiltersChange({
        ...filters,
        [field]: value,
        page: 1, // Reset to first page when filtering
      });
    },
    [filters, onFiltersChange]
  );

  /**
   * Clears all filters [SF]
   */
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    onFiltersChange({
      page: 1,
      pageSize: filters.pageSize,
    });
  }, [filters.pageSize, onFiltersChange]);

  /**
   * Checks if any filters are active [DRY]
   */
  const hasActiveFilters = !!(
    filters.searchTerm ||
    filters.status !== undefined ||
    filters.language ||
    filters.createdFrom ||
    filters.createdTo
  );

  /**
   * Gets localized status options [RP]
   */
  const getStatusOptions = () => [
    { value: "", label: t("templates.filters.allStatuses") },
    { value: TemplateStatus.Draft, label: t("templates.status.draft") },
    { value: TemplateStatus.Active, label: t("templates.status.active") },
    { value: TemplateStatus.Archived, label: t("templates.status.archived") },
  ];

  /**
   * Gets available language options [RP]
   */
  const getLanguageOptions = () => [
    { value: "", label: t("templates.filters.allLanguages") },
    { value: "en", label: t("languages.english") },
    { value: "de", label: t("languages.german") },
    { value: "it", label: t("languages.italian") },
  ];

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Search Input */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder={t("templates.search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
              endAdornment: searchTerm && (
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm("")}
                  aria-label={t("common.clear")}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
            aria-label={t("templates.search.placeholder")}
          />
        </Grid>

        {/* Quick Status Filter */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">
              {t("templates.filters.status")}
            </InputLabel>
            <Select
              labelId="status-filter-label"
              value={filters.status ?? ""}
              label={t("templates.filters.status")}
              onChange={(e) =>
                handleFilterChange("status", e.target.value || undefined)
              }
              disabled={isLoading}
            >
              {getStatusOptions().map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Advanced Filters Toggle and Clear */}
        <Grid item xs={12} md={2}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Tooltip title={t("templates.filters.advanced")}>
              <IconButton
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                color={showAdvancedFilters ? "primary" : "default"}
                aria-label={t("templates.filters.advanced")}
              >
                <FilterIcon />
                {showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
            {hasActiveFilters && (
              <Tooltip title={t("common.clearFilters")}>
                <IconButton
                  onClick={handleClearFilters}
                  color="secondary"
                  disabled={isLoading}
                  aria-label={t("common.clearFilters")}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Advanced Filters Collapse */}
      <Collapse in={showAdvancedFilters}>
        <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Grid container spacing={2}>
            {/* Language Filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="language-filter-label">
                  {t("templates.filters.language")}
                </InputLabel>
                <Select
                  labelId="language-filter-label"
                  value={filters.language || ""}
                  label={t("templates.filters.language")}
                  onChange={(e) =>
                    handleFilterChange("language", e.target.value || undefined)
                  }
                  disabled={isLoading}
                >
                  {getLanguageOptions().map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Created Date From */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label={t("templates.filters.createdFrom")}
                value={filters.createdFrom || ""}
                onChange={(e) =>
                  handleFilterChange("createdFrom", e.target.value || undefined)
                }
                disabled={isLoading}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Created Date To */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label={t("templates.filters.createdTo")}
                value={filters.createdTo || ""}
                onChange={(e) =>
                  handleFilterChange("createdTo", e.target.value || undefined)
                }
                disabled={isLoading}
                inputProps={{
                  min: filters.createdFrom || undefined,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          {/* Advanced Actions */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters || isLoading}
              startIcon={<ClearIcon />}
            >
              {t("common.clearAllFilters")}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TemplatesSearch;
