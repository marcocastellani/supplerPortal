import React from "react";
import { Container, Grid, Text } from "@remira/unifiedui";
import { useTheme, Box } from "@mui/material";

export interface LoadingStateProps {
  error?: string | null;
}

/**
 * LoadingState component with full theme support [TH]
 *
 * Displays loading and error states with theme-aware colors that automatically
 * adapt to light/dark mode switching while maintaining accessibility.
 */
export const LoadingState: React.FC<LoadingStateProps> = ({ error }) => {
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          {error ? (
            <Box
              sx={{
                p: 2,
                backgroundColor: theme.palette.error.light, // ✅ Instead of #f8d7da [TH]
                border: `1px solid ${theme.palette.error.main}`, // ✅ Instead of #f5c6cb [TH]
                borderRadius: 2,
                color: theme.palette.error.contrastText, // ✅ Instead of #721c24 [TH]
              }}
            >
              <Text variant="h6">Error loading form</Text>
              <Text variant="body2">{error}</Text>
            </Box>
          ) : (
            <Text variant="h3">Loading...</Text>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

/**
 * SuccessState component with full theme support [TH]
 *
 * Displays success message with theme-aware colors that automatically
 * adapt to light/dark mode switching while maintaining accessibility.
 */
export const SuccessState: React.FC = () => {
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.success.light, // ✅ Instead of #d4edda [TH]
              border: `1px solid ${theme.palette.success.main}`, // ✅ Instead of #c3e6cb [TH]
              borderRadius: 2,
              color: theme.palette.success.contrastText, // ✅ Instead of #155724 [TH]
            }}
          >
            Supply Network Entity created successfully!
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
