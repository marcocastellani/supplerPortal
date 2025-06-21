import React from "react";
import { Chip, ChipProps } from "@mui/material";

type QuestionnaireStatus =
  | "Draft"
  | "Published"
  | "InProgress"
  | "Completed"
  | "Overdue";

interface StatusChipProps extends Omit<ChipProps, "color"> {
  status: QuestionnaireStatus;
}

/**
 * StatusChip component for displaying questionnaire status with design system compliant colors [SF]
 *
 * @param status - The questionnaire status type
 * @param props - Additional chip props
 * @returns JSX.Element
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status, ...props }) => {
  const getStatusConfig = (status: QuestionnaireStatus) => {
    // ✅ Using design tokens instead of hardcoded colors [SF][CMV]
    const configs = {
      Draft: {
        color: "text.secondary", // Instead of #757575
        bg: "grey.50", // Instead of #f5f5f5
        label: "Draft",
      },
      Published: {
        color: "primary.main", // Instead of #1976d2
        bg: "primary.light", // Instead of #e3f2fd
        label: "Published",
      },
      InProgress: {
        color: "warning.main", // Instead of #f57c00
        bg: "warning.light", // Instead of #fff3e0
        label: "In Progress",
      },
      Completed: {
        color: "success.main", // Instead of #388e3c
        bg: "success.light", // Instead of #e8f5e8
        label: "Completed",
      },
      Overdue: {
        color: "error.main", // Instead of #d32f2f
        bg: "error.light", // Instead of #ffebee
        label: "Overdue",
      },
    };
    return configs[status] || configs.Draft;
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 500,
        fontSize: "0.75rem",
        "& .MuiChip-label": {
          px: 1.5,
        },
      }}
      {...props}
    />
  );
};
