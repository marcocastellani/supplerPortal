import React from "react";
import { Text } from "@remira/unifiedui";

interface ErrorMessageProps {
  /** Error message to display */
  message?: string;
}

/**
 * ErrorMessage component for displaying validation and error messages [SF][CMV]
 *
 * Features:
 * - Uses Material-UI theme error.main token instead of hardcoded colors
 * - Consistent typography styling with proper font weight and size
 * - Accessible error styling with semantic color meaning
 * - Conditional rendering - returns null for empty messages
 * - Theme-aware colors that adapt to light/dark mode
 *
 * @param message - The error message text to display (empty string renders nothing)
 * @returns JSX.Element | null - Styled error message component or null if message is empty
 *
 * @example
 * ```tsx
 * <ErrorMessage message="This field is required" />
 * <ErrorMessage message={formErrors.email} />
 * <ErrorMessage message="" /> // Renders nothing
 * ```
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
