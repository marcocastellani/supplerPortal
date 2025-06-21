import React from "react";
import { Chip, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface EntityStatusChipProps {
  active: boolean;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  showIcon?: boolean;
  style?: "default" | "colorful";
  minimal?: boolean;
}

/**
 * EntityStatusChip component with full theme support [TH]
 *
 * Displays entity status with theme-aware colors that automatically
 * adapt to light/dark mode switching while maintaining accessibility.
 */
export const EntityStatusChip: React.FC<EntityStatusChipProps> = ({
  active,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
  minimal = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  // ✅ Theme-aware color scheme [TH]
  const colorScheme = active
    ? {
        color: theme.palette.success.main, // ✅ Instead of #2e7d32 [TH]
        backgroundColor: theme.palette.success.light, // ✅ Instead of #e8f5e8 [TH]
        borderColor: theme.palette.success.main, // ✅ Instead of #4caf50 [TH]
      }
    : {
        color: theme.palette.error.main, // ✅ Instead of #d32f2f [TH]
        backgroundColor: theme.palette.error.light, // ✅ Instead of #ffebee [TH]
        borderColor: theme.palette.error.main, // ✅ Instead of #f44336 [TH]
      };

  return (
    <Chip
      icon={
        showIcon ? (
          active ? (
            <CheckCircleIcon fontSize="small" />
          ) : (
            <CancelIcon fontSize="small" />
          )
        ) : undefined
      }
      label={
        active
          ? t("networkEntities.status.active")
          : t("networkEntities.status.inactive")
      }
      size={size}
      color={
        style === "default" && variant === "filled" && active
          ? "success"
          : undefined
      }
      sx={{
        fontWeight: "medium",
        borderRadius: minimal ? "16px" : "20px",
        height: minimal ? "auto" : size === "small" ? "32px" : "36px",
        padding: minimal ? "0" : size === "small" ? "0 8px" : "0 12px",
        border: minimal ? "none" : undefined,
        minHeight: minimal ? "24px" : undefined,
        "& .MuiChip-label": {
          paddingLeft: minimal ? "4px" : showIcon ? "0px" : "8px",
          paddingRight: minimal ? "4px" : "8px",
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        },
        "& .MuiChip-icon": {
          marginLeft: minimal ? "2px" : "4px",
          marginRight: minimal ? "2px" : "8px",
        },
        ...(minimal && {
          backgroundColor: "transparent !important",
          color: `${colorScheme.color} !important`,
          boxShadow: "none !important",
          "& .MuiChip-icon": {
            color: `${colorScheme.color} !important`,
            marginLeft: "2px",
            marginRight: "2px",
          },
        }),
        ...(!minimal &&
          style === "colorful" && {
            boxShadow: theme.shadows[1], // ✅ Theme-aware shadow instead of hardcoded [TH]
            color: `${colorScheme.color} !important`,
            backgroundColor: `${colorScheme.backgroundColor} !important`,
            border: `1px solid ${colorScheme.borderColor} !important`,
            "& .MuiChip-icon": {
              color: `${colorScheme.color} !important`,
              marginLeft: "4px",
              marginRight: "8px",
            },
          }),
        ...(!minimal &&
          style === "default" &&
          variant === "outlined" && {
            borderColor: theme.palette.divider, // ✅ Theme-aware border instead of rgba [TH]
          }),
      }}
    />
  );
};
