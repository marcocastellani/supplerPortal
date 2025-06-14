import React from "react";
import { Text } from "@remira/unifiedui";

interface ValidationProgressProps {
  isValidating: boolean;
  message?: string;
}

export const ValidationProgress: React.FC<ValidationProgressProps> = ({
  isValidating,
  message = "Checking availability...",
}) => {
  if (!isValidating) return null;

  return (
    <Text
      variant="body2"
      sx={{
        color: "#1976d2",
        mt: 0.5,
        fontSize: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      🔄 {message}
    </Text>
  );
};
