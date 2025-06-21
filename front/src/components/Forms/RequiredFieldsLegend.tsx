import React from "react";
import { Text } from "@remira/unifiedui";
import { useTheme } from "@mui/material/styles";

export const RequiredFieldsLegend: React.FC = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.grey[50],
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "16px",
      }}
    >
      <Text
        variant="body2"
        sx={{ color: theme.palette.text.secondary, fontSize: "0.875rem" }}
      >
        📋 <strong>Required fields are marked with an asterisk (*)</strong>
      </Text>
      <Text
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "0.75rem",
          mt: 0.5,
        }}
      >
        Fields with errors are highlighted in red with warning messages.
      </Text>
    </div>
  );
};
