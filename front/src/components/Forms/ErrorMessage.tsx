import React from "react";
import { Text } from "@remira/unifiedui";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Text
      variant="body2"
      sx={{
        color: "#d32f2f",
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
