import React from "react";
import { Text } from "@remira/unifiedui";

export const RequiredFieldsLegend: React.FC = () => (
  <div
    style={{
      backgroundColor: "#f5f5f5",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "12px 16px",
      marginBottom: "16px",
    }}
  >
    <Text variant="body2" sx={{ color: "#666", fontSize: "0.875rem" }}>
      📋 <strong>Required fields are marked with an asterisk (*)</strong>
    </Text>
    <Text variant="body2" sx={{ color: "#666", fontSize: "0.75rem", mt: 0.5 }}>
      Fields with errors are highlighted in red with warning messages.
    </Text>
  </div>
);
