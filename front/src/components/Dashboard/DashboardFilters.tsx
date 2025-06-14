import React, { useState } from "react";
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

export interface DashboardFiltersProps {
  suppliers: string[];
  onFiltersChange: (filters: {
    status?: string;
    priority?: string;
    supplier?: string;
    search?: string;
  }) => void;
  isLoading?: boolean;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  suppliers,
  onFiltersChange,
  isLoading = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    supplier: "all",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: "all",
      priority: "all",
      supplier: "all",
      search: "",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
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
        onClick={() => setExpanded(!expanded)}
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
              handleClearFilters();
            }}
          >
            <Clear />
          </IconButton>
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Box>

      <Collapse in={expanded}>
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
