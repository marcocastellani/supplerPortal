import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import {
  EntityType,
  SupplyNetworkEntityDto,
} from "../types/supplyNetworkEntities";
import { Link } from "react-router-dom";
import { Container, Grid, Text, Select, Card } from "@remira/unifiedui";
import { PageHeader } from "./LayoutComponents";
import {
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Alert,
  CircularProgress,
  Box,
  Pagination,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { EntityTypeChip, EntityStatusChip } from "./EntityChips";

const NetworkEntities: React.FC = () => {
  const { t } = useTranslation();
  const [entities, setEntities] = useState<SupplyNetworkEntityDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<EntityType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  // Fetch entities function
  const fetchEntities = useCallback(
    async (
      search: string,
      type: EntityType | "all",
      status: "all" | "active" | "inactive",
      page: number
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response =
          await SupplyNetworkEntitiesService.getSupplyNetworkEntities({
            searchTerm: search || undefined,
            entityType: type !== "all" ? type : undefined,
            active: status === "all" ? undefined : status === "active",
            page: page,
            pageSize: pageSize,
            sortBy: "legalName",
            sortDescending: false,
          });

        setEntities(response.items || []);
        setTotalPages(response.totalPages || 1);
        setTotalCount(response.totalCount || 0);
      } catch (error) {
        console.error("Failed to fetch entities:", error);
        setError(t("networkEntities.errorFetching"));
        setEntities([]);
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce(
      (
        search: string,
        type: EntityType | "all",
        status: "all" | "active" | "inactive",
        page: number
      ) => {
        fetchEntities(search, type, status, page);
      },
      500
    ),
    [fetchEntities]
  );

  // Effect to fetch data on mount and when filters change
  useEffect(() => {
    debouncedFetch(searchQuery, filterType, filterStatus, currentPage);

    // Cleanup
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, filterType, filterStatus, currentPage, debouncedFetch]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter type change
  const handleFilterTypeChange = (event: any, option: any) => {
    const newValue = option?.value || event?.target?.value || "all";
    setFilterType(newValue as EntityType | "all");
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle filter status change
  const handleFilterStatusChange = (event: any, option: any) => {
    const newValue = option?.value || event?.target?.value || "all";
    setFilterStatus(newValue as "all" | "active" | "inactive");
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
          <Card title="Search & Filter">
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder={t("networkEntities.searchPlaceholder")}
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                <Grid item xs={12} md={3}>
                  <Select
                    value={filterType}
                    onChange={handleFilterTypeChange}
                    options={[
                      { value: "all", label: t("networkEntities.filterAll") },
                      {
                        value: EntityType.Supplier,
                        label: t("networkEntities.filterSupplier"),
                      },
                      {
                        value: EntityType.Site,
                        label: t("networkEntities.filterSite"),
                      },
                      {
                        value: EntityType.SubSupplier,
                        label: t("networkEntities.filterSubSupplier"),
                      },
                      {
                        value: EntityType.Person,
                        label: t("networkEntities.filterPerson"),
                      },
                      {
                        value: EntityType.CompanyGroup,
                        label: t("networkEntities.filterCompanyGroup"),
                      },
                    ]}
                    fullWidth
                    disabled={isLoading}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Select
                    value={filterStatus}
                    onChange={handleFilterStatusChange}
                    options={[
                      {
                        value: "all",
                        label: t("networkEntities.filterAllStatus"),
                      },
                      {
                        value: "active",
                        label: t("networkEntities.filterActive"),
                      },
                      {
                        value: "inactive",
                        label: t("networkEntities.filterInactive"),
                      },
                    ]}
                    fullWidth
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              {/* Results count */}
              {!isLoading && !error && (
                <Box mt={2}>
                  <Text variant="body2">
                    {t("networkEntities.resultsCount", { count: totalCount })}
                  </Text>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12}>
          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={8}
                >
                  <CircularProgress data-testid="loading-spinner" />
                  <Box ml={2}>
                    <Text variant="body1">
                      {t("networkEntities.loading", "Loading...")}
                    </Text>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}

          {/* No Results State */}
          {!isLoading && !error && entities.length === 0 && (
            <Card>
              <CardContent>
                <Box textAlign="center" py={8}>
                  <BusinessIcon
                    sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                  />
                  <Text variant="h6">{t("networkEntities.noResults")}</Text>
                  <Text variant="body2">
                    {t(
                      "networkEntities.noResultsDescription",
                      "Try adjusting your search criteria"
                    )}
                  </Text>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Results Table */}
          {!isLoading && !error && entities.length > 0 && (
            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ "& .MuiTableCell-root": { padding: "16px" } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>{t("networkEntities.table.name")}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t("networkEntities.table.vat")}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t("networkEntities.table.code")}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t("networkEntities.table.location")}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t("networkEntities.table.type")}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{t("networkEntities.table.status")}</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entities.map((entity) => (
                      <TableRow
                        key={entity.id}
                        hover
                        sx={{
                          "&:hover": {
                            backgroundColor: "action.hover",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>
                          <Box>
                            <Link
                              to={`/supply-network/entity/${entity.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Text
                                variant="body1"
                                color="primary"
                                sx={{
                                  fontWeight: "medium",
                                  "&:hover": { textDecoration: "underline" },
                                }}
                              >
                                {entity.legalName}
                              </Text>
                            </Link>
                            {entity.shortName &&
                              entity.shortName !== entity.legalName && (
                                <Text variant="body2" color="textSecondary">
                                  {entity.shortName}
                                </Text>
                              )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Text variant="body2" color="textSecondary">
                            {entity.vatCode || "-"}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text variant="body2" color="textSecondary">
                            {entity.externalCode || "-"}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Text variant="body2">
                              {entity.city}, {entity.country}
                            </Text>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <EntityTypeChip
                            entityType={entity.entityType}
                            size="small"
                            style="colorful"
                          />
                        </TableCell>
                        <TableCell>
                          <EntityStatusChip
                            active={entity.active}
                            size="small"
                            style="colorful"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Text variant="body2" color="textSecondary">
                      {t("networkEntities.pagination.showing", {
                        from: (currentPage - 1) * pageSize + 1,
                        to: Math.min(currentPage * pageSize, totalCount),
                        total: totalCount,
                      })}
                    </Text>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, page) => handlePageChange(page)}
                      color="primary"
                      showFirstButton
                      showLastButton
                      disabled={isLoading}
                    />
                  </Box>
                </CardContent>
              )}
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NetworkEntities;
