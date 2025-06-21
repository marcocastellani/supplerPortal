import React from "react";
import { Text } from "@remira/unifiedui";

interface ErrorMessageProps {
  /** Error message to display */
  message?: string;
}

/**
 * ErrorMessage component for displaying validation and error messages [SF]
 *
 * @param message - The error message to display
 * @returns JSX.Element | null
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Text
      variant="body2"
      sx={{
        color: "error.main",
        mt: 0.5,
        fontSize: "0.75rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      ⚠️ {message}
    </Text>
  );
};
