import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@remira/unifiedui";
import {
  Button,
  Box,
  Stack,
  Paper,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  ListAlt as ListAltIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { PageHeader } from "../components/LayoutComponents";
import TemplatesList from "../components/questionnaire-templates/TemplatesList";
import TemplatesSearch from "../components/questionnaire-templates/TemplatesSearch";
import TemplatesPagination from "../components/questionnaire-templates/TemplatesPagination";
import { useTemplatesList } from "../hooks/useTemplatesList";

/**
 * Main page for questionnaire templates management with listing, search, filtering and pagination
 * Follows UnifiedUI patterns and integrates all template listing components [CA, SF]
 */
export const QuestionnaireTemplates: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Main hook that handles all template listing logic [DRY]
  const {
    templates,
    paginationData,
    filters,
    isLoading,
    error,
    isEmpty,
    hasError,
    updateFilters,
    handlePageChange,
    handlePageSizeChange,
    refreshTemplates,
    totalCount,
  } = useTemplatesList();

  /**
   * Handles creating a new template [SF]
   */
  const handleCreateTemplate = () => {
    navigate("/questionnaires/templates/new");
  };

  /**
   * Handles viewing template details [SF]
   */
  const handleViewTemplate = (templateId: string) => {
    navigate(`/questionnaires/templates/${templateId}`);
  };

  /**
   * Handles editing template [SF]
   */
  const handleEditTemplate = (templateId: string) => {
    navigate(`/questionnaires/templates/${templateId}/edit`);
  };

  return (
    <Container type="page" maxWidth="xl">
      <Grid container spacing={3} sx={{ paddingTop: 3 }}>
        {/* Page Header */}
        <Grid item xs={12}>
          <PageHeader
            title={t("templates.pageTitle", "Template Management")}
            subtitle={t(
              "templates.pageSubtitle",
              "Manage questionnaire templates"
            )}
            icon={<ListAltIcon color="primary" />}
          />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 0, overflow: "hidden" }}>
            {/* Header Actions */}
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h6" component="h2">
                    {t("templates.listTitle", "Templates")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isLoading
                      ? t("common.loading", "Loading...")
                      : t(
                          "templates.totalCount",
                          "Total: {{count}} templates",
                          { count: totalCount }
                        )}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={refreshTemplates}
                    disabled={isLoading}
                    size="small"
                  >
                    {t("common.refresh", "Refresh")}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateTemplate}
                    color="primary"
                  >
                    {t("templates.actions.create", "Create Template")}
                  </Button>
                </Stack>
              </Stack>

              <Divider sx={{ mt: 2 }} />
            </Box>

            {/* Search and Filters */}
            <Box sx={{ p: 3, pt: 2 }}>
              <TemplatesSearch
                filters={filters}
                onFiltersChange={updateFilters}
                isLoading={isLoading}
              />
            </Box>

            {/* Error Display */}
            {hasError && (
              <Box sx={{ px: 3, pb: 2 }}>
                <Alert
                  severity="error"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={refreshTemplates}
                    >
                      {t("common.retry", "Retry")}
                    </Button>
                  }
                >
                  {error}
                </Alert>
              </Box>
            )}

            {/* Templates List */}
            <Box sx={{ px: 3 }}>
              <TemplatesList
                templates={templates}
                isLoading={isLoading}
                error={hasError ? error : null}
                onEdit={handleEditTemplate}
                onPreview={handleViewTemplate}
              />
            </Box>

            {/* Pagination */}
            {paginationData && !isEmpty && !hasError && (
              <TemplatesPagination
                paginationData={paginationData}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
