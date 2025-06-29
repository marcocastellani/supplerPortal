import React from "react";
import { Chip, ChipProps, useTheme } from "@mui/material";

export type QuestionnaireStatus =
  | "Draft"
  | "Published"
  | "InProgress"
  | "Completed"
  | "Overdue";

interface StatusChipProps extends Omit<ChipProps, "color"> {
  status: QuestionnaireStatus;
}

/**
 * StatusChip component for displaying questionnaire status with improved contrast [SF][CMV]
 *
 * Features:
 * - Uses solid theme colors with white text for better readability
 * - Supports all questionnaire status types with semantic color mapping
 * - Fully responsive design with consistent typography
 * - WCAG 2.1 AA compliant color contrast ratios
 * - Light/dark theme compatible
 *
 * @param status - The questionnaire status type (Draft, Published, InProgress, Completed, Overdue)
 * @param props - Additional Material-UI Chip props (size, variant, onClick, etc.)
 * @returns JSX.Element - Styled chip component with status-specific colors
 *
 * @example
 * ```tsx
 * <StatusChip status="Completed" />
 * <StatusChip status="Overdue" onClick={handleClick} />
 * ```
 */
export const StatusChip: React.FC<StatusChipProps> = ({ status, ...props }) => {
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  const getStatusConfig = (status: QuestionnaireStatus) => {
    // ✅ Using solid theme colors with white text for better contrast [SF][CMV]
    const configs = {
      Draft: {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.grey[600], // Darker grey for contrast
        label: "Draft",
      },
      Published: {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.primary.main, // Solid primary color
        label: "Published",
      },
      InProgress: {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.warning.main, // Solid warning color
        label: "In Progress",
      },
      Completed: {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.success.main, // Solid success color
        label: "Completed",
      },
      Overdue: {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.error.main, // Solid error color
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
        backgroundColor: `${config.bg} !important`,
        color: `${config.color} !important`,
        fontWeight: 500,
        fontSize: "0.75rem",
        border: `1px solid ${config.bg}`,
        "& .MuiChip-label": {
          px: 1.5,
          color: `${config.color} !important`,
        },
      }}
      {...props}
    />
  );
};
