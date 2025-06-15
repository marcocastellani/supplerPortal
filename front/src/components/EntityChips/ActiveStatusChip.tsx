import React from "react";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface ActiveStatusChipProps {
  active: boolean;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  showIcon?: boolean;
  style?: "default" | "colorful";
}

export const ActiveStatusChip: React.FC<ActiveStatusChipProps> = ({
  active,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
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
        borderRadius: "20px",
        height: size === "small" ? "32px" : "36px",
        padding: size === "small" ? "0 8px" : "0 12px",
        "& .MuiChip-label": {
          paddingLeft: showIcon ? "0px" : "8px",
          paddingRight: "8px",
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        },
        ...(style === "colorful" && {
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
        ...(style === "default" &&
          variant === "outlined" && {
            borderColor: "rgba(0, 0, 0, 0.23)",
          }),
      }}
    />
  );
};
