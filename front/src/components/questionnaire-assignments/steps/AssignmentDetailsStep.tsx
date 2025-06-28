import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Stack,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CalendarMonth as CalendarIcon,
  Notes as NotesIcon,
  Priority as PriorityIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import { AssignmentWizardState } from "../AssignmentWizard";

interface AssignmentDetailsStepProps {
  state: AssignmentWizardState;
  onUpdate: (updates: Partial<AssignmentWizardState>) => void;
}

export const AssignmentDetailsStep: React.FC<AssignmentDetailsStepProps> = ({
  state,
  onUpdate,
}: AssignmentDetailsStepProps) => {
  const { t } = useTranslation();

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      onUpdate({ dueDate: newDate });
    }
  };

  const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onUpdate({ priority: event.target.value as "Low" | "Medium" | "High" });
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ notes: event.target.value });
  };

  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ sendNotifications: event.target.checked });
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Tomorrow

  const isPastDue = state.dueDate <= new Date();
  const notesLength = state.notes.length;
  const maxNotesLength = 1000;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("assignments.details.title")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("assignments.details.description")}
      </Typography>

      <Stack spacing={3}>
        {/* Due Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("assignments.details.dueDate")}
            value={state.dueDate}
            onChange={handleDateChange}
            minDate={minDate}
            slots={{
              textField: (params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  error={isPastDue}
                  helperText={
                    isPastDue
                      ? t("assignments.details.dueDateError")
                      : t("assignments.details.dueDateHelper")
                  }
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              ),
            }}
          />
        </LocalizationProvider>

        {/* Priority */}
        <FormControl fullWidth>
          <InputLabel>{t("assignments.details.priority")}</InputLabel>
          <Select
            value={state.priority}
            onChange={handlePriorityChange as any}
            label={t("assignments.details.priority")}
            startAdornment={
              <InputAdornment position="start">
                <PriorityIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="Low">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                  }}
                />
                {t("assignments.details.priorityLow")}
              </Box>
            </MenuItem>
            <MenuItem value="Medium">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "warning.main",
                  }}
                />
                {t("assignments.details.priorityMedium")}
              </Box>
            </MenuItem>
            <MenuItem value="High">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "error.main",
                  }}
                />
                {t("assignments.details.priorityHigh")}
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Notes */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label={t("assignments.details.notes")}
          placeholder={t("assignments.details.notesPlaceholder")}
          value={state.notes}
          onChange={handleNotesChange}
          error={notesLength > maxNotesLength}
          helperText={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>{t("assignments.details.notesHelper")}</span>
              <span
                style={{
                  color: notesLength > maxNotesLength ? "error" : "inherit",
                }}
              >
                {notesLength} / {maxNotesLength}
              </span>
            </Box>
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                <NotesIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Email Notifications */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.sendNotifications}
                onChange={handleNotificationsChange}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20 }} />
                {t("assignments.details.sendNotifications")}
              </Box>
            }
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
            {t("assignments.details.sendNotificationsHelper")}
          </Typography>
        </Box>

        {/* Summary */}
        <Alert severity="info" icon={false}>
          <Typography variant="subtitle2" gutterBottom>
            {t("assignments.details.summary")}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • {t("assignments.details.selectedEntitiesCount", {
                count: state.selectedEntityIds.length,
              })}
            </Typography>
            <Typography variant="body2">
              • {t("assignments.details.dueIn", {
                days: Math.ceil(
                  (state.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                ),
              })}
            </Typography>
            <Typography variant="body2">
              • {t(`assignments.details.priority${state.priority}`)} {t("common.priority")}
            </Typography>
            {state.sendNotifications && (
              <Typography variant="body2">
                • {t("assignments.details.notificationsWillBeSent")}
              </Typography>
            )}
          </Stack>
        </Alert>
      </Stack>
    </Box>
  );
};