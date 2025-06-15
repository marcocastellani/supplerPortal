import React from "react";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DraftsIcon from "@mui/icons-material/Drafts";
import PauseIcon from "@mui/icons-material/Pause";
import { AccreditationStatus } from "../../types/supplyNetworkEntities";

interface AccreditationStatusChipProps {
  accreditationStatus: AccreditationStatus;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  showIcon?: boolean;
  style?: "default" | "colorful";
}

export const AccreditationStatusChip: React.FC<
  AccreditationStatusChipProps
> = ({
  accreditationStatus,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
}) => {
  const { t } = useTranslation();

  // Get status icon
  const getStatusIcon = (status: AccreditationStatus) => {
    switch (status) {
      case AccreditationStatus.Approved:
        return <CheckCircleIcon fontSize="small" />;
      case AccreditationStatus.Rejected:
        return <CancelIcon fontSize="small" />;
      case AccreditationStatus.Submitted:
        return <HourglassEmptyIcon fontSize="small" />;
      case AccreditationStatus.Suspended:
        return <PauseIcon fontSize="small" />;
      case AccreditationStatus.Draft:
        return <DraftsIcon fontSize="small" />;
      default:
        return <HourglassEmptyIcon fontSize="small" />;
    }
  };

  // Get status label
  const getStatusLabel = (status: AccreditationStatus) => {
    switch (status) {
      case AccreditationStatus.Approved:
        return t("networkEntities.accreditationStatus.approved");
      case AccreditationStatus.Rejected:
        return t("networkEntities.accreditationStatus.rejected");
      case AccreditationStatus.Submitted:
        return t("networkEntities.accreditationStatus.submitted");
      case AccreditationStatus.Suspended:
        return t("networkEntities.accreditationStatus.suspended");
      case AccreditationStatus.Draft:
        return t("networkEntities.accreditationStatus.draft");
      default:
        return status;
    }
  };

  // Get status color scheme
  const getStatusColor = (status: AccreditationStatus) => {
    switch (status) {
      case AccreditationStatus.Approved:
        return {
          color: "#2e7d32",
          backgroundColor: "#e8f5e8",
          borderColor: "#4caf50",
        };
      case AccreditationStatus.Rejected:
        return {
          color: "#d32f2f",
          backgroundColor: "#ffebee",
          borderColor: "#f44336",
        };
      case AccreditationStatus.Submitted:
        return {
          color: "#ed6c02",
          backgroundColor: "#fff3e0",
          borderColor: "#ff9800",
        };
      case AccreditationStatus.Suspended:
        return {
          color: "#9c27b0",
          backgroundColor: "#f3e5f5",
          borderColor: "#9c27b0",
        };
      case AccreditationStatus.Draft:
        return {
          color: "#757575",
          backgroundColor: "#f5f5f5",
          borderColor: "#9e9e9e",
        };
      default:
        return {
          color: "#757575",
          backgroundColor: "#f5f5f5",
          borderColor: "#9e9e9e",
        };
    }
  };

  const colorScheme = getStatusColor(accreditationStatus);

  return (
    <Chip
      icon={showIcon ? getStatusIcon(accreditationStatus) : undefined}
      label={getStatusLabel(accreditationStatus)}
      size={size}
      color={
        style === "default" &&
        variant === "filled" &&
        accreditationStatus === AccreditationStatus.Approved
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
