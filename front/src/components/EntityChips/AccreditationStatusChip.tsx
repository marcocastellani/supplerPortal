import React from "react";
import { Chip, useTheme } from "@mui/material";
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

/**
 * AccreditationStatusChip component with full theme support [TH]
 *
 * Displays accreditation status with theme-aware colors that automatically
 * adapt to light/dark mode switching while maintaining accessibility and
 * semantic color meanings across all status types.
 */
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
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

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

  // ✅ Get status color scheme with theme support [TH]
  const getStatusColor = (status: AccreditationStatus) => {
    switch (status) {
      case AccreditationStatus.Approved:
        return {
          color: theme.palette.success.main, // ✅ Instead of #2e7d32 [TH]
          backgroundColor: theme.palette.success.light, // ✅ Instead of #e8f5e8 [TH]
          borderColor: theme.palette.success.main, // ✅ Instead of #4caf50 [TH]
        };
      case AccreditationStatus.Rejected:
        return {
          color: theme.palette.error.main, // ✅ Instead of #d32f2f [TH]
          backgroundColor: theme.palette.error.light, // ✅ Instead of #ffebee [TH]
          borderColor: theme.palette.error.main, // ✅ Instead of #f44336 [TH]
        };
      case AccreditationStatus.Submitted:
        return {
          color: theme.palette.warning.main, // ✅ Instead of #ed6c02 [TH]
          backgroundColor: theme.palette.warning.light, // ✅ Instead of #fff3e0 [TH]
          borderColor: theme.palette.warning.main, // ✅ Instead of #ff9800 [TH]
        };
      case AccreditationStatus.Suspended:
        return {
          color: theme.palette.secondary.main, // ✅ Instead of #9c27b0 [TH]
          backgroundColor: theme.palette.secondary.light, // ✅ Instead of #f3e5f5 [TH]
          borderColor: theme.palette.secondary.main, // ✅ Theme-aware [TH]
        };
      case AccreditationStatus.Draft:
        return {
          color: theme.palette.text.secondary, // ✅ Instead of #757575 [TH]
          backgroundColor: theme.palette.grey[50], // ✅ Instead of #f5f5f5 [TH]
          borderColor: theme.palette.grey[400], // ✅ Instead of #9e9e9e [TH]
        };
      default:
        return {
          color: theme.palette.text.secondary, // ✅ Instead of #757575 [TH]
          backgroundColor: theme.palette.grey[50], // ✅ Instead of #f5f5f5 [TH]
          borderColor: theme.palette.grey[400], // ✅ Instead of #9e9e9e [TH]
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
        ...(style === "default" &&
          variant === "outlined" && {
            borderColor: theme.palette.divider, // ✅ Theme-aware border instead of rgba [TH]
          }),
      }}
    />
  );
};
