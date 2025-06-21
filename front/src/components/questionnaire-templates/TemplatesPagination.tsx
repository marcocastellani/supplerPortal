import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft as PrevIcon,
  KeyboardArrowRight as NextIcon,
} from "@mui/icons-material";
import { PaginatedTemplatesResponse } from "../../types/questionnaire-templates";

interface TemplatesPaginationProps {
  paginationData: PaginatedTemplatesResponse;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading?: boolean;
}

/**
 * Component for template listing pagination controls
 * Following established pagination patterns with enhanced UX features
 */
const TemplatesPagination: React.FC<TemplatesPaginationProps> = ({
  paginationData,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const {
    page,
    pageSize,
    totalCount,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = paginationData;

  // Calculate display information [DRY]
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  /**
   * Handles Material-UI Pagination component change [DRY]
   */
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage !== page && !isLoading) {
      onPageChange(newPage);
    }
  };

  /**
   * Handles page size change [DRY]
   */
  const handlePageSizeChange = (event: any) => {
    const newPageSize = parseInt(event.target.value, 10);
    if (newPageSize !== pageSize && !isLoading) {
      onPageSizeChange(newPageSize);
    }
  };

  /**
   * Handles direct page navigation [SF]
   */
  const handleDirectPageNavigation = (targetPage: number) => {
    if (
      targetPage >= 1 &&
      targetPage <= totalPages &&
      targetPage !== page &&
      !isLoading
    ) {
      onPageChange(targetPage);
    }
  };

  // Don't render if no data [SF]
  if (totalCount === 0) {
    return null;
  }

  // Available page size options [CMV]
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", md: "center" },
        gap: 2,
        mt: 3,
        p: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      {/* Results Information */}
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 200 }}>
        <Typography variant="body2" color="textSecondary">
          {t("templates.pagination.showing", {
            start: startItem,
            end: endItem,
            total: totalCount,
          })}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {t("templates.pagination.totalPages", { pages: totalPages })}
        </Typography>
      </Box>

      {/* Center Controls - Main Pagination */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ flex: 1, justifyContent: "center" }}
      >
        {/* Quick Navigation */}
        <Stack direction="row" spacing={0.5}>
          <Tooltip title={t("common.pagination.firstPage")}>
            <span>
              <IconButton
                size="small"
                onClick={() => handleDirectPageNavigation(1)}
                disabled={!hasPreviousPage || isLoading}
                aria-label={t("common.pagination.firstPage")}
              >
                <FirstPageIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={t("common.pagination.previousPage")}>
            <span>
              <IconButton
                size="small"
                onClick={() => handleDirectPageNavigation(page - 1)}
                disabled={!hasPreviousPage || isLoading}
                aria-label={t("common.pagination.previousPage")}
              >
                <PrevIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        {/* Main Pagination Component */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePaginationChange}
          disabled={isLoading}
          color="primary"
          showFirstButton={false}
          showLastButton={false}
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              "&:focus": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            },
          }}
        />

        {/* Quick Navigation Continued */}
        <Stack direction="row" spacing={0.5}>
          <Tooltip title={t("common.pagination.nextPage")}>
            <span>
              <IconButton
                size="small"
                onClick={() => handleDirectPageNavigation(page + 1)}
                disabled={!hasNextPage || isLoading}
                aria-label={t("common.pagination.nextPage")}
              >
                <NextIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={t("common.pagination.lastPage")}>
            <span>
              <IconButton
                size="small"
                onClick={() => handleDirectPageNavigation(totalPages)}
                disabled={!hasNextPage || isLoading}
                aria-label={t("common.pagination.lastPage")}
              >
                <LastPageIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Page Size Selector */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ minWidth: 200 }}
      >
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel id="page-size-label">
            {t("common.pagination.pageSize")}
          </InputLabel>
          <Select
            labelId="page-size-label"
            value={pageSize}
            label={t("common.pagination.pageSize")}
            onChange={handlePageSizeChange}
            disabled={isLoading}
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Jump to Page */}
        {totalPages > 10 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="textSecondary" noWrap>
              {t("common.pagination.goTo")}:
            </Typography>
            <TextField
              size="small"
              type="number"
              inputProps={{
                min: 1,
                max: totalPages,
                style: { width: "60px", textAlign: "center" },
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const target = parseInt(
                    (e.target as HTMLInputElement).value,
                    10
                  );
                  handleDirectPageNavigation(target);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              disabled={isLoading}
              placeholder={page.toString()}
              aria-label={t("common.pagination.jumpToPage")}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default TemplatesPagination;
