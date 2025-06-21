import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import { FilterList, ExpandMore, ExpandLess, Clear } from "@mui/icons-material";
import { useDashboardStore } from "@/stores/dashboardStore";

export interface DashboardFiltersProps {
  isLoading?: boolean;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  isLoading = false,
}) => {
  // Get state and actions from Zustand store
  const {
    filters,
    suppliers,
    expandedFilters,
    setFilters,
    resetFilters,
    toggleExpandedFilters,
  } = useDashboardStore();

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={toggleExpandedFilters}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList />
          <span>Filtri</span>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              resetFilters();
            }}
          >
            <Clear />
          </IconButton>
          {expandedFilters ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Box>

      <Collapse in={expandedFilters}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mt: 2 }}
        >
          {/* Search */}
          <TextField
            label="Cerca"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            variant="outlined"
            size="small"
            disabled={isLoading}
            sx={{ minWidth: 200 }}
          />

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Stato</InputLabel>
            <Select
              value={filters.status}
              label="Stato"
              onChange={(e) => handleFilterChange("status", e.target.value)}
              disabled={isLoading}
            >
              <MenuItem value="all">Tutti</MenuItem>
              <MenuItem value="Not Started">Non Iniziato</MenuItem>
              <MenuItem value="In Progress">In Corso</MenuItem>
              <MenuItem value="Completed">Completato</MenuItem>
              <MenuItem value="Overdue">Scaduto</MenuItem>
            </Select>
          </FormControl>

          {/* Priority Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Priorità</InputLabel>
            <Select
              value={filters.priority}
              label="Priorità"
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              disabled={isLoading}
            >
              <MenuItem value="all">Tutte</MenuItem>
              <MenuItem value="High">Alta</MenuItem>
              <MenuItem value="Medium">Media</MenuItem>
              <MenuItem value="Low">Bassa</MenuItem>
            </Select>
          </FormControl>

          {/* Supplier Filter */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Fornitore</InputLabel>
            <Select
              value={filters.supplier}
              label="Fornitore"
              onChange={(e) => handleFilterChange("supplier", e.target.value)}
              disabled={isLoading}
            >
              <MenuItem value="all">Tutti</MenuItem>
              {suppliers.map((supplier) => (
                <MenuItem key={supplier} value={supplier}>
                  {supplier}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Collapse>
    </Paper>
  );
};
