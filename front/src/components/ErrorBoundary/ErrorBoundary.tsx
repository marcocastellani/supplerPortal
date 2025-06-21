/**
 * Error Boundary component for catching and handling React errors
 *
 * @fileoverview Provides error boundary functionality with consistent error handling,
 * user-friendly error display, and structured error logging following [REH] principles
 */

import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { handleError, AppError } from "@/utils/errorHandling";
import { ICON_SIZES, UI_SPACING } from "@/constants/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError) => void;
}

interface State {
  hasError: boolean;
  error?: AppError;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree [REH]
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    const appError = handleError(error, "ErrorBoundary", {
      errorBoundary: true,
      stack: error.stack,
    });

    return {
      hasError: true,
      error: appError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error with component stack information [REH]
    const appError = handleError(error, "ErrorBoundary", {
      errorBoundary: true,
      componentStack: errorInfo.componentStack,
      stack: error.stack,
    });

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(appError);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when children change [REH]
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
          padding={UI_SPACING.LARGE}
        >
          <Card sx={{ maxWidth: 600, width: "100%" }}>
            <CardContent>
              <Alert
                severity="error"
                sx={{ mb: UI_SPACING.MEDIUM }}
                role="alert"
                aria-live="polite"
              >
                <AlertTitle>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={UI_SPACING.SMALL}
                  >
                    <ErrorIcon
                      sx={{ fontSize: ICON_SIZES.MEDIUM }}
                      data-testid="error-icon"
                    />
                    Something went wrong
                  </Box>
                </AlertTitle>
                {this.state.error?.message || "An unexpected error occurred"}
              </Alert>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: UI_SPACING.MEDIUM }}
              >
                We apologize for the inconvenience. The error has been logged
                and our team has been notified.
              </Typography>

              <Box display="flex" gap={UI_SPACING.SMALL} flexWrap="wrap">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleRetry}
                  startIcon={<RefreshIcon />}
                  aria-label="Try again"
                >
                  Try Again
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleReload}
                  aria-label="Reload page"
                >
                  Reload Page
                </Button>
              </Box>

              {/* Development mode: show error details */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <Box sx={{ mt: UI_SPACING.MEDIUM }}>
                  <Typography variant="caption" color="text.secondary">
                    Development Info:
                  </Typography>
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{
                      display: "block",
                      backgroundColor: "grey.100",
                      padding: UI_SPACING.SMALL,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      overflow: "auto",
                      mt: UI_SPACING.SMALL,
                    }}
                  >
                    {JSON.stringify(this.state.error, null, 2)}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap components with error boundary [REH]
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: AppError) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}
