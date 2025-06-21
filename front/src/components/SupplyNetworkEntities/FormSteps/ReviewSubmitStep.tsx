import React from "react";
import { Grid, Text } from "@remira/unifiedui";
import { useTheme, Box } from "@mui/material";
import { SupplyNetworkEntityFormData } from "../../../types/supplyNetworkEntities";

interface ReviewSubmitStepProps {
  formData: SupplyNetworkEntityFormData;
  isLoading: boolean;
  error: string | null;
  errorType: "network" | "validation" | "server" | "unknown";
  onSubmit: () => Promise<void>;
  onClearError: () => void;
}

/**
 * ReviewSubmitStep component with full theme support [TH]
 *
 * Displays form review information with theme-aware colors and styles
 * that adapt to light/dark mode switching while maintaining accessibility.
 */
export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({
  formData,
  isLoading,
  error,
  errorType,
  onSubmit,
  onClearError,
}) => {
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Text variant="h6" sx={{ mb: 2 }}>
          Review Information
        </Text>
        <Text variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Please review all the information before submitting.
        </Text>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`, // ✅ Instead of #e0e0e0 [TH]
            borderRadius: 2,
            p: 2,
            backgroundColor: theme.palette.grey[50], // ✅ Instead of #fafafa [TH]
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Text variant="subtitle2">Entity Type:</Text>
              <Text variant="body2">{formData.entityType}</Text>
            </Grid>
            <Grid item xs={12} md={6}>
              <Text variant="subtitle2">Role:</Text>
              <Text variant="body2">{formData.roleInSupplyChain}</Text>
            </Grid>
            <Grid item xs={12}>
              <Text variant="subtitle2">Legal Name:</Text>
              <Text variant="body2">{formData.legalName}</Text>
            </Grid>
            {formData.shortName && (
              <Grid item xs={12} md={6}>
                <Text variant="subtitle2">Short Name:</Text>
                <Text variant="body2">{formData.shortName}</Text>
              </Grid>
            )}
            {formData.externalCode && (
              <Grid item xs={12} md={6}>
                <Text variant="subtitle2">External Code:</Text>
                <Text variant="body2">{formData.externalCode}</Text>
              </Grid>
            )}
            {formData.email && (
              <Grid item xs={12} md={6}>
                <Text variant="subtitle2">Email:</Text>
                <Text variant="body2">{formData.email}</Text>
              </Grid>
            )}
            {formData.phoneNumber && (
              <Grid item xs={12} md={6}>
                <Text variant="subtitle2">Phone:</Text>
                <Text variant="body2">{formData.phoneNumber}</Text>
              </Grid>
            )}
            {(formData.country || formData.city) && (
              <Grid item xs={12}>
                <Text variant="subtitle2">Location:</Text>
                <Text variant="body2">
                  {[formData.city, formData.region, formData.country]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Text variant="subtitle2">Accreditation Status:</Text>
              <Text variant="body2">{formData.accreditationStatus}</Text>
            </Grid>
            {formData.tags.length > 0 && (
              <Grid item xs={12}>
                <Text variant="subtitle2">Tags:</Text>
                <Text variant="body2">{formData.tags.join(", ")}</Text>
              </Grid>
            )}
          </Grid>
        </Box>
      </Grid>

      {isLoading && (
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.info.light, // ✅ Instead of #d1ecf1 [TH]
              border: `1px solid ${theme.palette.info.main}`, // ✅ Instead of #bee5eb [TH]
              borderRadius: 2,
              color: theme.palette.info.contrastText, // ✅ Instead of #0c5460 [TH]
            }}
          >
            Creating entity...
          </Box>
        </Grid>
      )}

      {/* Error display component for Step 4 */}
      {error && (
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.error.light, // ✅ Instead of #f8d7da [TH]
              border: `1px solid ${theme.palette.error.main}`, // ✅ Instead of #f5c6cb [TH]
              borderRadius: 2,
              color: theme.palette.error.contrastText, // ✅ Instead of #721c24 [TH]
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            {/* Error icon based on error type */}
            <Box sx={{ fontSize: "20px", flexShrink: 0 }}>
              {errorType === "network"
                ? "🌐"
                : errorType === "validation"
                ? "⚠️"
                : errorType === "server"
                ? "🔧"
                : "❌"}
            </Box>

            {/* Error content */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: "bold", mb: 0.5 }}>
                {errorType === "network"
                  ? "Connection Error"
                  : errorType === "validation"
                  ? "Validation Error"
                  : errorType === "server"
                  ? "Server Error"
                  : "Error"}
              </Box>
              <Box sx={{ fontSize: "14px", whiteSpace: "pre-line" }}>
                {error}
              </Box>
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
              {/* Retry button for network errors */}
              {errorType === "network" && (
                <Box
                  component="button"
                  onClick={onSubmit}
                  disabled={isLoading}
                  sx={{
                    p: "6px 12px",
                    backgroundColor: theme.palette.error.main, // ✅ Instead of #dc3545 [TH]
                    color: theme.palette.error.contrastText, // ✅ Theme-aware text color [TH]
                    border: "none",
                    borderRadius: 1,
                    fontSize: "12px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.7 : 1,
                    "&:hover": {
                      backgroundColor: theme.palette.error.dark, // ✅ Theme-aware hover [TH]
                    },
                  }}
                >
                  {isLoading ? "⏳" : "🔄 Retry"}
                </Box>
              )}

              {/* Dismiss button */}
              <Box
                component="button"
                onClick={onClearError}
                sx={{
                  p: "6px 8px",
                  backgroundColor: "transparent",
                  color: theme.palette.error.contrastText, // ✅ Instead of #721c24 [TH]
                  border: `1px solid ${theme.palette.error.contrastText}`, // ✅ Instead of #721c24 [TH]
                  borderRadius: 1,
                  fontSize: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover, // ✅ Theme-aware hover [TH]
                  },
                }}
              >
                ✕ Dismiss
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
