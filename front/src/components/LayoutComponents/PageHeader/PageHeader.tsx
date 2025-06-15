import React from "react";
import { Grid, Text } from "@remira/unifiedui";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface PageHeaderProps {
  /** Main title of the page */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Optional icon to display before the title */
  icon?: React.ReactNode;
  /** Show back button */
  showBackButton?: boolean;
  /** Back button click handler */
  onBackClick?: () => void;
  /** Show refresh button */
  showRefreshButton?: boolean;
  /** Refresh button click handler */
  onRefreshClick?: () => void;
  /** Additional actions to display on the right */
  actions?: React.ReactNode;
}

/**
 * Standardized page header component [SF, CA, RP]
 * 
 * Provides CONSISTENT header layout across all pages with:
 * - Fixed typography: h3 title, body1 subtitle (NO customization)
 * - Optional icon, back button, and refresh button
 * - Flexible action area for additional controls
 * - Consistent spacing and responsive design
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  showBackButton = false,
  onBackClick,
  showRefreshButton = false,
  onRefreshClick,
  actions,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3, alignItems: "center" }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Left side: Navigation + Icon + Title */}
          <Box display="flex" alignItems="center">
            {/* Back button */}
            {showBackButton && (
              <IconButton 
                onClick={onBackClick} 
                sx={{ mr: 2 }}
                aria-label="Go back"
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            
            {/* Icon */}
            {icon && (
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                {icon}
              </Box>
            )}
            
            {/* Title and subtitle - FIXED STYLING */}
            <Box>
              <Text variant="h3" sx={{ mb: subtitle ? 0.5 : 0 }}>
                {title}
              </Text>
              {subtitle && (
                <Text variant="body1" color="text.secondary">
                  {subtitle}
                </Text>
              )}
            </Box>
          </Box>
          
          {/* Right side: Refresh + Actions */}
          <Box display="flex" alignItems="center" gap={1}>
            {showRefreshButton && (
              <IconButton 
                onClick={onRefreshClick}
                aria-label="Refresh"
              >
                <RefreshIcon />
              </IconButton>
            )}
            {actions}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
