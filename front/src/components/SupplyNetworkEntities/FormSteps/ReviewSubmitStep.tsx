import React from 'react';
import { Grid, Text } from '@remira/unifiedui';
import { SupplyNetworkEntityFormData } from '../../../types/supplyNetworkEntities';

interface ReviewSubmitStepProps {
  formData: SupplyNetworkEntityFormData;
  isLoading: boolean;
  error: string | null;
  errorType: "network" | "validation" | "server" | "unknown";
  onSubmit: () => Promise<void>;
  onClearError: () => void;
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({
  formData,
  isLoading,
  error,
  errorType,
  onSubmit,
  onClearError,
}) => {
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
        <div
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fafafa",
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
        </div>
      </Grid>

      {isLoading && (
        <Grid item xs={12}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#d1ecf1",
              border: "1px solid #bee5eb",
              borderRadius: "8px",
              color: "#0c5460",
            }}
          >
            Creating entity...
          </div>
        </Grid>
      )}

      {/* Error display component for Step 4 */}
      {error && (
        <Grid item xs={12}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "8px",
              color: "#721c24",
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            {/* Error icon based on error type */}
            <span style={{ fontSize: "20px", flexShrink: 0 }}>
              {errorType === "network"
                ? "🌐"
                : errorType === "validation"
                ? "⚠️"
                : errorType === "server"
                ? "🔧"
                : "❌"}
            </span>

            {/* Error content */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {errorType === "network"
                  ? "Connection Error"
                  : errorType === "validation"
                  ? "Validation Error"
                  : errorType === "server"
                  ? "Server Error"
                  : "Error"}
              </div>
              <div style={{ fontSize: "14px", whiteSpace: "pre-line" }}>
                {error}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              {/* Retry button for network errors */}
              {errorType === "network" && (
                <button
                  onClick={onSubmit}
                  disabled={isLoading}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? "⏳" : "🔄 Retry"}
                </button>
              )}

              {/* Dismiss button */}
              <button
                onClick={onClearError}
                style={{
                  padding: "6px 8px",
                  backgroundColor: "transparent",
                  color: "#721c24",
                  border: "1px solid #721c24",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ✕ Dismiss
              </button>
            </div>
          </div>
        </Grid>
      )}
    </Grid>
  );
};
