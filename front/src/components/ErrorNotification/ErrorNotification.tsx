/**
 * Error Notification component for consistent error display
 * 
 * @fileoverview Provides standardized error notifications with user-friendly messages,
 * retry functionality, and consistent styling following [REH] principles
 */

import React, { useMemo } from 'react';
import { Alert, AlertTitle, Box, Button, Snackbar } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { AppError, ErrorType } from '@/utils/errorHandling';
import { ICON_SIZES, UI_SPACING } from '@/constants/ui';

interface ErrorNotificationProps {
  error: AppError | null;
  open: boolean;
  onClose: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
  autoHideDuration?: number;
}

/**
 * Displays error notifications with consistent styling and behavior [REH]
 */
export const ErrorNotification: React.FC<ErrorNotificationProps> = React.memo(({
  error,
  open,
  onClose,
  onRetry,
  showRetry = true,
  autoHideDuration = 6000
}) => {
  // Memoized error severity mapping [PA]
  const alertSeverity = useMemo(() => {
    if (!error) return 'error';
    
    switch (error.type) {
      case ErrorType.VALIDATION:
        return 'warning';
      case ErrorType.NETWORK:
      case ErrorType.SERVER:
        return 'error';
      case ErrorType.AUTHENTICATION:
      case ErrorType.AUTHORIZATION:
        return 'error';
      case ErrorType.NOT_FOUND:
        return 'info';
      default:
        return 'error';
    }
  }, [error]);

  // Memoized retry button visibility [PA]
  const showRetryButton = useMemo(() => {
    if (!showRetry || !onRetry || !error) return false;
    
    // Show retry for recoverable errors
    return error.type === ErrorType.NETWORK || error.type === ErrorType.SERVER;
  }, [showRetry, onRetry, error]);

  if (!error) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        severity={alertSeverity}
        onClose={onClose}
        sx={{ minWidth: 300, maxWidth: 500 }}
      >
        <AlertTitle>
          <Box display="flex" alignItems="center" gap={UI_SPACING.SMALL}>
            <ErrorIcon sx={{ fontSize: ICON_SIZES.MEDIUM }} />
            {getErrorTitle(error.type)}
          </Box>
        </AlertTitle>
        
        <Box>
          {error.message}
          
          {showRetryButton && (
            <Box sx={{ mt: UI_SPACING.SMALL }}>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={onRetry}
                startIcon={<RefreshIcon />}
              >
                Try Again
              </Button>
            </Box>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
});

ErrorNotification.displayName = 'ErrorNotification';

/**
 * Gets user-friendly error title based on error type [REH]
 */
function getErrorTitle(errorType: ErrorType): string {
  switch (errorType) {
    case ErrorType.NETWORK:
      return 'Connection Error';
    case ErrorType.VALIDATION:
      return 'Validation Error';
    case ErrorType.SERVER:
      return 'Server Error';
    case ErrorType.AUTHENTICATION:
      return 'Authentication Required';
    case ErrorType.AUTHORIZATION:
      return 'Access Denied';
    case ErrorType.NOT_FOUND:
      return 'Not Found';
    default:
      return 'Error';
  }
}
