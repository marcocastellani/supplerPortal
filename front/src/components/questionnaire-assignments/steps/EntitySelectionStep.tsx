import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Alert,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Badge,
  Skeleton,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  Warning as WarningIcon,
  Business as EntityIcon,
} from "@mui/icons-material";

import { AssignmentWizardState } from "../AssignmentWizard";
import { SupplyNetworkEntitiesService } from "../../../services/supplyNetworkEntitiesService";
import {
  SupplyNetworkEntityDto,
  EntityType,
  AccreditationStatus,
} from "../../../types/supplyNetworkEntities";
import { useDebounce } from "../../../hooks/useDebounce";
import { log } from "../../../utils/logger";

interface EntitySelectionStepProps {
  state: AssignmentWizardState;
  onUpdate: (updates: Partial<AssignmentWizardState>) => void;
}

export const EntitySelectionStep: React.FC<EntitySelectionStepProps> = ({
  state,
  onUpdate,
}: EntitySelectionStepProps) => {
  const { t } = useTranslation();

  // State for entities and loading
  const [entities, setEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [entityTypeFilter, setEntityTypeFilter] = useState<EntityType | "">("");
  const [statusFilter, setStatusFilter] = useState<AccreditationStatus | "">("");
  const [locationFilter, setLocationFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Selected entities set for efficient lookup
  const selectedSet = useMemo(
    () => new Set(state.selectedEntityIds),
    [state.selectedEntityIds]
  );

  // Get applicable entity types from template
  const applicableEntityTypes = useMemo(() => {
    if (!state.selectedTemplate) return [];
    return state.selectedTemplate.targetEntityTypes;
  }, [state.selectedTemplate]);

  // Load entities
  useEffect(() => {
    const loadEntities = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
          page: page + 1, // API uses 1-based pagination
          pageSize: rowsPerPage,
          searchTerm: debouncedSearchTerm || undefined,
          entityType: entityTypeFilter || undefined,
          accreditationStatus: statusFilter || undefined,
          country: locationFilter || undefined,
          tags: tagsFilter || undefined,
          active: true, // Only show active entities
        });

        // Filter by applicable entity types if template is selected
        let filteredItems = result.items;
        if (applicableEntityTypes.length > 0 && !entityTypeFilter) {
          filteredItems = result.items.filter((item) =>
            applicableEntityTypes.includes(item.entityType)
          );
        }

        setEntities(filteredItems);
        setTotalCount(result.totalCount);
      } catch (err) {
        log.error("Failed to load entities", { error: String(err) });
        setError(t("assignments.entities.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadEntities();
  }, [
    page,
    rowsPerPage,
    debouncedSearchTerm,
    entityTypeFilter,
    statusFilter,
    locationFilter,
    tagsFilter,
    applicableEntityTypes,
    t,
  ]);

  // Handlers
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
             const allIds = entities.map((entity: SupplyNetworkEntityDto) => entity.id);
      const newSelectedIds = Array.from(new Set([...state.selectedEntityIds, ...allIds]));
      onUpdate({ selectedEntityIds: newSelectedIds });
    } else {
      const entityIds = new Set(entities.map((e) => e.id));
      const newSelectedIds = state.selectedEntityIds.filter((id) => !entityIds.has(id));
      onUpdate({ selectedEntityIds: newSelectedIds });
    }
  };

  const handleSelectEntity = (entityId: string) => {
    const newSelectedIds = selectedSet.has(entityId)
      ? state.selectedEntityIds.filter((id) => id !== entityId)
      : [...state.selectedEntityIds, entityId];
    onUpdate({ selectedEntityIds: newSelectedIds });
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isAllSelected = entities.length > 0 && entities.every((e) => selectedSet.has(e.id));
  const isPartiallySelected = entities.some((e) => selectedSet.has(e.id)) && !isAllSelected;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("assignments.entities.selectTitle")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("assignments.entities.selectDescription")}
      </Typography>

      {/* Warning for large selections */}
      {state.selectedEntityIds.length > 100 && (
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          {t("assignments.entities.largeSelectionWarning", {
            count: state.selectedEntityIds.length,
          })}
        </Alert>
      )}

      {/* Filters */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("assignments.entities.searchPlaceholder")}
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{t("assignments.entities.filterByType")}</InputLabel>
              <Select
                value={entityTypeFilter}
                onChange={(e) => setEntityTypeFilter(e.target.value as EntityType | "")}
                label={t("assignments.entities.filterByType")}
              >
                <MenuItem value="">
                  <em>{t("common.all")}</em>
                </MenuItem>
                {applicableEntityTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`entityTypes.${type.toLowerCase()}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>{t("assignments.entities.filterByStatus")}</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AccreditationStatus | "")}
                label={t("assignments.entities.filterByStatus")}
              >
                <MenuItem value="">
                  <em>{t("common.all")}</em>
                </MenuItem>
                <MenuItem value={AccreditationStatus.Approved}>
                  {t("accreditationStatus.approved")}
                </MenuItem>
                <MenuItem value={AccreditationStatus.Submitted}>
                  {t("accreditationStatus.submitted")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("assignments.entities.filterByLocation")}
              value={locationFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("assignments.entities.filterByTags")}
              value={tagsFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagsFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Selected count */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2">
          {t("assignments.entities.showing", { count: entities.length, total: totalCount })}
        </Typography>
        <Badge badgeContent={state.selectedEntityIds.length} color="primary">
          <Chip
            icon={<EntityIcon />}
            label={t("assignments.entities.selected", { count: state.selectedEntityIds.length })}
            color={state.selectedEntityIds.length > 0 ? "primary" : "default"}
          />
        </Badge>
      </Box>

      {/* Data table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isPartiallySelected}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>{t("assignments.entities.columns.name")}</TableCell>
              <TableCell>{t("assignments.entities.columns.type")}</TableCell>
              <TableCell>{t("assignments.entities.columns.location")}</TableCell>
              <TableCell>{t("assignments.entities.columns.status")}</TableCell>
              <TableCell>{t("assignments.entities.columns.tags")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={20} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={150} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={120} />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : entities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">
                    {t("assignments.entities.noResults")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              entities.map((entity) => (
                <TableRow
                  key={entity.id}
                  hover
                  selected={selectedSet.has(entity.id)}
                  onClick={() => handleSelectEntity(entity.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSet.has(entity.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{entity.legalName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entity.shortName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(`entityTypes.${entity.entityType.toLowerCase()}`)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {entity.city}, {entity.country}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(`accreditationStatus.${entity.accreditationStatus.toLowerCase()}`)}
                      size="small"
                      color={entity.accreditationStatus === AccreditationStatus.Approved ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      {entity.tags.slice(0, 2).map((tag, index) => (
                        <Chip key={index} label={tag} size="small" />
                      ))}
                      {entity.tags.length > 2 && (
                        <Chip label={`+${entity.tags.length - 2}`} size="small" />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && !error && (
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        )}
      </TableContainer>
    </Box>
  );
};