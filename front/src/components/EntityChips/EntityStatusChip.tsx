import React from "react";
import { Chip } from "@mui/material";
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

export const EntityStatusChip: React.FC<EntityStatusChipProps> = ({
  active,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
  minimal = false,
}) => {
  const { t } = useTranslation();

  const colorScheme = active
    ? {
        color: "#2e7d32",
        backgroundColor: "#e8f5e8",
        borderColor: "#4caf50",
      }
    : {
        color: "#d32f2f",
        backgroundColor: "#ffebee",
        borderColor: "#f44336",
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
        height: minimal ? "auto" : (size === "small" ? "32px" : "36px"),
        padding: minimal ? "0" : (size === "small" ? "0 8px" : "0 12px"),
        border: minimal ? "none" : undefined,
        minHeight: minimal ? "24px" : undefined,
        "& .MuiChip-label": {
          paddingLeft: minimal ? "4px" : (showIcon ? "0px" : "8px"),
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
        ...(!minimal && style === "colorful" && {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          color: `${colorScheme.color} !important`,
          backgroundColor: `${colorScheme.backgroundColor} !important`,
          border: `1px solid ${colorScheme.borderColor} !important`,
          "& .MuiChip-icon": {
            color: `${colorScheme.color} !important`,
            marginLeft: "4px",
            marginRight: "8px",
          },
        }),
        ...(!minimal && style === "default" &&
          variant === "outlined" && {
            borderColor: "rgba(0, 0, 0, 0.23)",
          }),
      }}
    />
  );
};
