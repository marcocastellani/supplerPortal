import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Alert,
  Stack,
} from "@mui/material";
import {
  Description as TemplateIcon,
  Business as EntityIcon,
  CalendarMonth as CalendarIcon,
  Priority as PriorityIcon,
  Notes as NotesIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { format } from "date-fns";

import { AssignmentWizardState } from "../AssignmentWizard";

interface ReviewConfirmStepProps {
  state: AssignmentWizardState;
  onUpdate: (updates: Partial<AssignmentWizardState>) => void;
}

export const ReviewConfirmStep: React.FC<ReviewConfirmStepProps> = ({
  state,
  onUpdate,
}: ReviewConfirmStepProps) => {
  const { t } = useTranslation();

  const getPriorityColor = (priority: string): "success" | "warning" | "error" => {
    switch (priority) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      default:
        return "warning";
    }
  };

  const formatDueDate = () => {
    return format(state.dueDate, "PPP");
  };

  const getDaysUntilDue = () => {
    return Math.ceil((state.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("assignments.review.title")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("assignments.review.description")}
      </Typography>

      <Stack spacing={3}>
        {/* Template Summary */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <TemplateIcon sx={{ mr: 1 }} />
            {t("assignments.review.templateSection")}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary={t("assignments.review.templateName")}
                secondary={state.selectedTemplate?.title || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("assignments.review.version")}
                secondary={state.selectedTemplate?.version || "-"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("assignments.review.targetEntityTypes")}
                secondary={
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    {state.selectedTemplate?.targetEntityTypes.map((type) => (
                      <Chip
                        key={type}
                        label={t(`entityTypes.${type}`)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("assignments.review.questions")}
                secondary={t("assignments.review.questionCount", {
                  count: state.selectedTemplate?.questionCount || 0,
                })}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Entity Selection Summary */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <EntityIcon sx={{ mr: 1 }} />
            {t("assignments.review.entitiesSection")}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" icon={false}>
              <Typography variant="h4" component="div" align="center" sx={{ mb: 1 }}>
                {state.selectedEntityIds.length}
              </Typography>
              <Typography variant="body2" align="center">
                {t("assignments.review.entitiesSelected")}
              </Typography>
            </Alert>
          </Box>
        </Paper>

        {/* Assignment Details Summary */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <CalendarIcon sx={{ mr: 1 }} />
            {t("assignments.review.detailsSection")}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("assignments.review.dueDate")}
                secondary={`${formatDueDate()} (${t("assignments.review.daysFromNow", {
                  days: getDaysUntilDue(),
                })})`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PriorityIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("assignments.review.priority")}
                secondary={
                  <Chip
                    label={t(`assignments.details.priority${state.priority}`)}
                    size="small"
                    color={getPriorityColor(state.priority)}
                  />
                }
              />
            </ListItem>
            {state.notes && (
              <ListItem>
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("assignments.review.notes")}
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        maxHeight: 100,
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        mt: 0.5,
                      }}
                    >
                      {state.notes}
                    </Typography>
                  }
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("assignments.review.notifications")}
                secondary={
                  state.sendNotifications
                    ? t("assignments.review.notificationsEnabled")
                    : t("assignments.review.notificationsDisabled")
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Confirmation Alert */}
        <Alert severity="success" icon={<CheckIcon />}>
          <Typography variant="subtitle2" gutterBottom>
            {t("assignments.review.confirmationTitle")}
          </Typography>
          <Typography variant="body2">
            {t("assignments.review.confirmationMessage", {
              entityCount: state.selectedEntityIds.length,
              templateName: state.selectedTemplate?.title,
            })}
          </Typography>
        </Alert>
      </Stack>
    </Box>
  );
};