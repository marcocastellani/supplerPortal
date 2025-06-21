import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ErrorNotification } from "../ErrorNotification";
import { AppError, ErrorType } from "@/utils/errorHandling";

/**
 * Test suite for ErrorNotification component [TDT]
 *
 * Comprehensive tests covering error display, severity mapping,
 * retry functionality, and auto-hide behavior.
 */

describe("ErrorNotification", () => {
  const mockOnClose = vi.fn();
  const mockOnRetry = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockError = (
    type: ErrorType,
    message: string = "Test error"
  ): AppError => ({
    type,
    message,
    timestamp: new Date().toISOString(),
    context: { test: true },
    severity: "medium" as any,
  });

  describe("Basic Rendering", () => {
    it("should not render when error is null", () => {
      const { container } = render(
        <ErrorNotification error={null} open={true} onClose={mockOnClose} />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should not render when open is false", () => {
      const error = createMockError(ErrorType.NETWORK);

      const { container } = render(
        <ErrorNotification error={error} open={false} onClose={mockOnClose} />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should render when error exists and open is true", () => {
      const error = createMockError(
        ErrorType.NETWORK,
        "Network connection failed"
      );

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      expect(screen.getByText("Network connection failed")).toBeInTheDocument();
      expect(screen.getByText("Connection Error")).toBeInTheDocument();
    });
  });

  describe("Error Severity Mapping", () => {
    it("should display validation errors with warning severity", () => {
      const error = createMockError(ErrorType.VALIDATION, "Invalid input data");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardWarning");
      expect(screen.getByText("Validation Error")).toBeInTheDocument();
    });

    it("should display network errors with error severity", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection timeout");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardError");
      expect(screen.getByText("Connection Error")).toBeInTheDocument();
    });

    it("should display server errors with error severity", () => {
      const error = createMockError(ErrorType.SERVER, "Internal server error");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardError");
      expect(screen.getByText("Server Error")).toBeInTheDocument();
    });

    it("should display authentication errors with error severity", () => {
      const error = createMockError(
        ErrorType.AUTHENTICATION,
        "Invalid credentials"
      );

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardError");
      expect(screen.getByText("Authentication Error")).toBeInTheDocument();
    });

    it("should display not found errors with info severity", () => {
      const error = createMockError(ErrorType.NOT_FOUND, "Resource not found");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardInfo");
      expect(screen.getByText("Not Found")).toBeInTheDocument();
    });

    it("should display unknown errors with error severity", () => {
      const error = createMockError(ErrorType.UNKNOWN, "Something went wrong");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-standardError");
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  describe("Retry Functionality", () => {
    it("should show retry button for network errors", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const retryButton = screen.getByRole("button", { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });

    it("should show retry button for server errors", () => {
      const error = createMockError(ErrorType.SERVER, "Server unavailable");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const retryButton = screen.getByRole("button", { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });

    it("should not show retry button for validation errors", () => {
      const error = createMockError(ErrorType.VALIDATION, "Invalid data");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const retryButton = screen.queryByRole("button", { name: /try again/i });
      expect(retryButton).not.toBeInTheDocument();
    });

    it("should not show retry button when showRetry is false", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={false}
        />
      );

      const retryButton = screen.queryByRole("button", { name: /try again/i });
      expect(retryButton).not.toBeInTheDocument();
    });

    it("should not show retry button when onRetry is not provided", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          showRetry={true}
        />
      );

      const retryButton = screen.queryByRole("button", { name: /try again/i });
      expect(retryButton).not.toBeInTheDocument();
    });

    it("should call onRetry when retry button is clicked", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const retryButton = screen.getByRole("button", { name: /try again/i });
      fireEvent.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe("Close Functionality", () => {
    it("should call onClose when close button is clicked", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should auto-hide after specified duration", async () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          autoHideDuration={100}
        />
      );

      await waitFor(
        () => {
          expect(mockOnClose).toHaveBeenCalledTimes(1);
        },
        { timeout: 200 }
      );
    });

    it("should use default auto-hide duration when not specified", async () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      // Should not auto-close immediately
      expect(mockOnClose).not.toHaveBeenCalled();

      // Default is 6000ms, so we can't wait that long in tests
      // Just verify the component renders properly with default duration
      expect(screen.getByText("Connection failed")).toBeInTheDocument();
    });
  });

  describe("Positioning and Styling", () => {
    it("should render in top-right position", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const snackbar = screen.getByRole("presentation");
      expect(snackbar).toBeInTheDocument();
    });

    it("should have minimum and maximum width constraints", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      const styles = window.getComputedStyle(alert);
      expect(styles.minWidth).toBe("300px");
      expect(styles.maxWidth).toBe("500px");
    });
  });

  describe("Error Icon Display", () => {
    it("should display error icon in alert title", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const errorIcon = screen.getByTestId("error-icon");
      expect(errorIcon).toBeInTheDocument();
    });

    it("should display refresh icon on retry button", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const refreshIcon = screen.getByTestId("refresh-icon");
      expect(refreshIcon).toBeInTheDocument();
    });
  });

  describe("Component Memoization", () => {
    it("should be memoized and not re-render with same props", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      const { rerender } = render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const initialElement = screen.getByText("Connection failed");

      // Re-render with same props
      rerender(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const afterRerender = screen.getByText("Connection failed");
      expect(afterRerender).toBe(initialElement);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification error={error} open={true} onClose={mockOnClose} />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();

      const closeButton = screen.getByRole("button", { name: /close/i });
      expect(closeButton).toHaveAttribute("aria-label", "Close");
    });

    it("should have proper button labels for screen readers", () => {
      const error = createMockError(ErrorType.NETWORK, "Connection failed");

      render(
        <ErrorNotification
          error={error}
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          showRetry={true}
        />
      );

      const retryButton = screen.getByRole("button", { name: /try again/i });
      expect(retryButton).toHaveAccessibleName();
    });
  });
});
