import React from "react";
import { useTheme } from "@mui/material/styles";

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  hasError?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required = false,
  hasError = false,
}) => {
  const theme = useTheme();
  const baseLabel = required ? `${children} *` : children;

  if (hasError) {
    return (
      <span style={{ color: theme.palette.error.main, fontWeight: "bold" }}>
        {baseLabel}
      </span>
    );
  }

  return baseLabel;
};
