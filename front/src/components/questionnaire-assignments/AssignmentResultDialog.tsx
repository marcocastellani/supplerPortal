import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Business as EntityIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import {
  AssignQuestionnaireResult,
  QuestionnaireAssignmentsService,
} from "../../services/questionnaire-assignments-api";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`result-tabpanel-${index}`}
      aria-labelledby={`result-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

interface AssignmentResultDialogProps {
  open: boolean;
  onClose: () => void;
  result: AssignQuestionnaireResult;
  onNewAssignment: () => void;
  onViewAssignments: () => void;
}

export const AssignmentResultDialog: React.FC<AssignmentResultDialogProps> = ({
  open,
  onClose,
  result,
  onNewAssignment,
  onViewAssignments,
}: AssignmentResultDialogProps) => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownloadCSV = () => {
    QuestionnaireAssignmentsService.downloadAssignmentResultsCSV(result);
  };

  const hasSkipped = result.skippedCount > 0;
  const successRate = result.assignedCount / (result.assignedCount + result.skippedCount);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {t("assignments.results.title")}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Summary Stats */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Alert
              severity="success"
              icon={<SuccessIcon />}
              sx={{ flexGrow: 1 }}
            >
              <Typography variant="subtitle1">
                {t("assignments.results.assignedCount", { count: result.assignedCount })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("assignments.results.assignedSubtitle")}
              </Typography>
            </Alert>

            {hasSkipped && (
              <Alert
                severity="warning"
                icon={<WarningIcon />}
                sx={{ flexGrow: 1 }}
              >
                <Typography variant="subtitle1">
                  {t("assignments.results.skippedCount", { count: result.skippedCount })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("assignments.results.skippedSubtitle")}
                </Typography>
              </Alert>
            )}
          </Stack>

          {/* Success Rate */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t("assignments.results.successRate")}
            </Typography>
            <Typography variant="h4" color={successRate >= 0.8 ? "success.main" : "warning.main"}>
              {Math.round(successRate * 100)}%
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <SuccessIcon color="success" fontSize="small" />
                  <span>{t("assignments.results.assignedTab", { count: result.assignedCount })}</span>
                </Stack>
              }
            />
            {hasSkipped && (
              <Tab
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <WarningIcon color="warning" fontSize="small" />
                    <span>{t("assignments.results.skippedTab", { count: result.skippedCount })}</span>
                  </Stack>
                }
              />
            )}
          </Tabs>
        </Box>

        {/* Assigned Entities Tab */}
        <TabPanel value={tabValue} index={0}>
          <List>
            {result.assignedEntities.map((entity) => (
              <ListItem key={entity.entityId} divider>
                <ListItemIcon>
                  <EntityIcon />
                </ListItemIcon>
                <ListItemText
                  primary={entity.entityName}
                  secondary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={t(`entityTypes.${entity.entityType.toLowerCase()}`)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {entity.location}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • ID: {entity.questionnaireId}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Skipped Entities Tab */}
        {hasSkipped && (
          <TabPanel value={tabValue} index={1}>
            <List>
              {result.skippedEntities.map((entity) => (
                <ListItem key={entity.entityId} divider>
                  <ListItemIcon>
                    <EntityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={entity.entityName}
                    secondary={
                      <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={t(`entityTypes.${entity.entityType.toLowerCase()}`)}
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        </Stack>
                        <Typography variant="body2" color="warning.main">
                          {t("assignments.results.skipReason")}: {entity.reason}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Tooltip title={t("assignments.results.downloadTooltip")}>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCSV}
            variant="outlined"
          >
            {t("assignments.results.downloadCSV")}
          </Button>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          startIcon={<AddIcon />}
          onClick={onNewAssignment}
          variant="outlined"
        >
          {t("assignments.results.newAssignment")}
        </Button>

        <Button
          startIcon={<ViewIcon />}
          onClick={onViewAssignments}
          variant="contained"
          color="primary"
        >
          {t("assignments.results.viewAssignments")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};