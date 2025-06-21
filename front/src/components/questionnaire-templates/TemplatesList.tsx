import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Skeleton,
  Alert,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Preview as PreviewIcon,
  ContentCopy as DuplicateIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  QuestionnaireTemplateResponse,
  TemplateStatus,
} from "../../types/questionnaire-templates";
import { EntityType } from "../../types/supplyNetworkEntities";
import {
  sanitizeUserInput,
  sanitizeAndTruncate,
} from "../../utils/sanitization";

interface TemplatesListProps {
  templates: QuestionnaireTemplateResponse[];
  isLoading: boolean;
  error: string | null;
  onEdit?: (templateId: string) => void;
  onPreview?: (templateId: string) => void;
  onDuplicate?: (templateId: string) => void;
  onDelete?: (templateId: string) => void;
}

/**
 * Component for displaying a list of questionnaire templates
 * Following UnifiedUI design patterns with responsive cards layout
 */
const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  isLoading,
  error,
  onEdit,
  onPreview,
  onDuplicate,
  onDelete,
}) => {
  const { t } = useTranslation();

  // Loading state with skeleton cards [REH]
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  sx={{ mt: 1 }}
                />
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" width={60} height={24} />
                  <Skeleton variant="rectangular" width={80} height={24} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Error state [REH]
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {t("templates.error.loadingFailed", {
          error: sanitizeUserInput(error),
        })}
      </Alert>
    );
  }

  // Empty state [SF]
  if (!templates.length) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        textAlign="center"
      >
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {t("templates.empty.title")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t("templates.empty.description")}
        </Typography>
      </Box>
    );
  }

  /**
   * Gets the appropriate color for template status chip [CMV]
   */
  const getStatusColor = (
    status: TemplateStatus
  ): "default" | "primary" | "secondary" | "success" | "warning" => {
    switch (status) {
      case TemplateStatus.Active:
        return "success";
      case TemplateStatus.Draft:
        return "warning";
      case TemplateStatus.Archived:
        return "default";
      default:
        return "default";
    }
  };

  /**
   * Gets localized status text [RP]
   */
  const getStatusText = (status: TemplateStatus): string => {
    switch (status) {
      case TemplateStatus.Active:
        return t("templates.status.active");
      case TemplateStatus.Draft:
        return t("templates.status.draft");
      case TemplateStatus.Archived:
        return t("templates.status.archived");
      default:
        return t("templates.status.unknown");
    }
  };

  /**
   * Gets localized entity type text [DRY]
   */
  const getEntityTypeText = (entityType: EntityType): string => {
    return t(`entityTypes.${entityType.toString().toLowerCase()}`);
  };

  /**
   * Formats date for display [DRY]
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid item xs={12} sm={6} md={4} key={template.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                boxShadow: (theme) => theme.shadows[4],
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Template Title */}
              <Typography
                variant="h6"
                component={Link}
                to={`/questionnaire-templates/${template.id}`}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                title={template.title}
              >
                {sanitizeAndTruncate(template.title, 60)}
              </Typography>

              {/* Template Description */}
              {template.description && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1, mb: 2 }}
                  title={template.description}
                >
                  {sanitizeAndTruncate(template.description, 100)}
                </Typography>
              )}

              {/* Status and Certificate Type */}
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  label={getStatusText(template.status)}
                  color={getStatusColor(template.status)}
                  size="small"
                />
                <Chip
                  label={template.certificateType}
                  variant="outlined"
                  size="small"
                />
              </Stack>

              {/* Target Entity Types */}
              {template.targetEntityTypes.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    {t("templates.targetEntities")}:
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    gap={0.5}
                  >
                    {template.targetEntityTypes
                      .slice(0, 3)
                      .map((entityType) => (
                        <Chip
                          key={entityType}
                          label={getEntityTypeText(entityType)}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    {template.targetEntityTypes.length > 3 && (
                      <Chip
                        label={`+${template.targetEntityTypes.length - 3}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Box>
              )}

              {/* Metadata */}
              <Box sx={{ mt: "auto" }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("templates.created")}: {formatDate(template.createdAt)}
                </Typography>
                {template.lastModified && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    display="block"
                  >
                    {t("templates.modified")}:{" "}
                    {formatDate(template.lastModified)}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("templates.version")}:{" "}
                  {sanitizeUserInput(template.version)}
                </Typography>
              </Box>
            </CardContent>

            {/* Action Buttons */}
            <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
              {onPreview && (
                <Tooltip title={t("templates.actions.preview")}>
                  <IconButton
                    size="small"
                    onClick={() => onPreview(template.id)}
                    aria-label={t("templates.actions.preview")}
                  >
                    <PreviewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {onEdit && (
                <Tooltip title={t("templates.actions.edit")}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(template.id)}
                    aria-label={t("templates.actions.edit")}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {onDuplicate && (
                <Tooltip title={t("templates.actions.duplicate")}>
                  <IconButton
                    size="small"
                    onClick={() => onDuplicate(template.id)}
                    aria-label={t("templates.actions.duplicate")}
                  >
                    <DuplicateIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {onDelete && template.status === TemplateStatus.Draft && (
                <Tooltip title={t("templates.actions.delete")}>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(template.id)}
                    aria-label={t("templates.actions.delete")}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplatesList;
