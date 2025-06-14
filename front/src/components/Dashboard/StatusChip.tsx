import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { statusColors } from "./theme";

type QuestionnaireStatus =
  | "Draft"
  | "Published"
  | "InProgress"
  | "Completed"
  | "Overdue";

interface StatusChipProps extends Omit<ChipProps, "color"> {
  status: QuestionnaireStatus;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, ...props }) => {
  const getStatusConfig = (status: QuestionnaireStatus) => {
    const configs = {
      Draft: { color: "#757575", bg: "#f5f5f5", label: "Draft" },
      Published: { color: "#1976d2", bg: "#e3f2fd", label: "Published" },
      InProgress: { color: "#f57c00", bg: "#fff3e0", label: "In Progress" },
      Completed: { color: "#388e3c", bg: "#e8f5e8", label: "Completed" },
      Overdue: { color: "#d32f2f", bg: "#ffebee", label: "Overdue" },
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
