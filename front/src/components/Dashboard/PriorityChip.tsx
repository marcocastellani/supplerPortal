import React from "react";
import { Chip, ChipProps, useTheme } from "@mui/material";
import { AccessTime, Warning, Error, CheckCircle } from "@mui/icons-material";

interface PriorityChipProps extends Omit<ChipProps, "color"> {
  daysToDeadline: number;
  isOverdue: boolean;
}

/**
 * PriorityChip component with improved contrast and theme support [SF][CMV]
 *
 * Features:
 * - Uses solid theme colors with white text for better readability
 * - Theme-aware colors that adapt to light/dark mode
 * - WCAG 2.1 AA compliant color contrast ratios
 * - Semantic icons for different priority levels
 */
export const PriorityChip: React.FC<PriorityChipProps> = ({
  daysToDeadline,
  isOverdue,
  ...props
}) => {
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  const getPriorityConfig = () => {
    if (isOverdue) {
      return {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.error.main, // Solid error color
        label: "Overdue",
        icon: (
          <Error sx={{ fontSize: 14, color: theme.palette.common.white }} />
        ),
      };
    }

    if (daysToDeadline <= 2) {
      return {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.error.main, // Solid error color
        label: "Critical",
        icon: (
          <Error sx={{ fontSize: 14, color: theme.palette.common.white }} />
        ),
      };
    }

    if (daysToDeadline <= 7) {
      return {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.warning.main, // Solid warning color
        label: "High",
        icon: (
          <Warning sx={{ fontSize: 14, color: theme.palette.common.white }} />
        ),
      };
    }

    if (daysToDeadline <= 14) {
      return {
        color: theme.palette.common.white, // White text for better contrast
        bg: theme.palette.info.main, // Solid info color for medium priority
        label: "Medium",
        icon: (
          <AccessTime
            sx={{ fontSize: 14, color: theme.palette.common.white }}
          />
        ),
      };
    }

    return {
      color: theme.palette.common.white, // White text for better contrast
      bg: theme.palette.success.main, // Solid success color
      label: "Low",
      icon: (
        <CheckCircle sx={{ fontSize: 14, color: theme.palette.common.white }} />
      ),
    };
  };

  const config = getPriorityConfig();

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        backgroundColor: `${config.bg} !important`,
        color: `${config.color} !important`,
        fontWeight: 500,
        fontSize: "0.75rem",
        border: `1px solid ${config.bg}`,
        "& .MuiChip-label": {
          px: 1,
          color: `${config.color} !important`,
        },
        "& .MuiChip-icon": {
          color: `${config.color} !important`,
        },
      }}
      {...props}
    />
  );
};
