import React from "react";

interface FormLabelProps {
  children: string;
  required?: boolean;
  hasError?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required = false,
  hasError = false,
}) => {
  const baseLabel = required ? `${children} *` : children;

  if (hasError) {
    return (
      <span style={{ color: "#d32f2f", fontWeight: "bold" }}>{baseLabel}</span>
    );
  }

  return baseLabel;
};
