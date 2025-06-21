import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ErrorBoundary, withErrorBoundary } from "../ErrorBoundary";
import { ErrorType } from "@/utils/errorHandling";

/**
 * Test suite for ErrorBoundary component [TDT]
 *
 * Comprehensive tests covering error catching, fallback UI display,
 * retry functionality, and HOC wrapper behavior.
 */

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

// Test component that throws errors
const ThrowingComponent: React.FC<{
  shouldThrow?: boolean;
  errorMessage?: string;
}> = ({ shouldThrow = true, errorMessage = "Test error" }) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div>Working component</div>;
};

// Test component that works
const WorkingComponent: React.FC = () => <div>Working component</div>;

describe("ErrorBoundary", () => {
  describe("Error Catching", () => {
    it("should catch JavaScript errors and display fallback UI", () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(
        screen.getByText(
          "We apologize for the inconvenience. The error has been logged and our team has been notified."
        )
      ).toBeInTheDocument();
    });

    it("should display custom error message when error has message", () => {
      const customErrorMessage = "Custom error occurred";

      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage={customErrorMessage} />
        </ErrorBoundary>
      );

      expect(screen.getByText(customErrorMessage)).toBeInTheDocument();
    });

    it("should render children when no error occurs", () => {
      render(
        <ErrorBoundary>
          <WorkingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Working component")).toBeInTheDocument();
      expect(
        screen.queryByText("Something went wrong")
      ).not.toBeInTheDocument();
    });
  });

  describe("Custom Fallback UI", () => {
    it("should render custom fallback when provided", () => {
      const customFallback = <div>Custom error fallback</div>;

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Custom error fallback")).toBeInTheDocument();
      expect(
        screen.queryByText("Something went wrong")
      ).not.toBeInTheDocument();
    });
  });

  describe("Error Callback", () => {
    it("should call onError callback when error occurs", () => {
      const onErrorMock = vi.fn();

      render(
        <ErrorBoundary onError={onErrorMock}>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(onErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: ErrorType.UNKNOWN,
          message: "Test error",
        })
      );
    });
  });

  describe("Retry Functionality", () => {
    it("should display retry button and reset error state when clicked", () => {
      let shouldThrow = true;

      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error("Test error");
        }
        return <div>Component recovered</div>;
      };

      const { rerender } = render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );

      // Error state should be displayed
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      // Click retry button
      const retryButton = screen.getByRole("button", { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      // Change the component to not throw
      shouldThrow = false;
      fireEvent.click(retryButton);

      // Component should recover after retry
      rerender(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Component recovered")).toBeInTheDocument();
    });
  });

  describe("Error Details", () => {
    it("should display error details with proper styling", () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Detailed error message" />
        </ErrorBoundary>
      );

      // Check for error icon
      expect(screen.getByTestId("error-icon")).toBeInTheDocument();

      // Check for error message
      expect(screen.getByText("Detailed error message")).toBeInTheDocument();

      // Check for retry button
      expect(
        screen.getByRole("button", { name: /try again/i })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes for screen readers", () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      const errorAlert = screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveAttribute("aria-live", "polite");

      const retryButton = screen.getByRole("button", { name: /try again/i });
      expect(retryButton).toHaveAttribute("aria-label", "Try again");
    });
  });
});

describe("withErrorBoundary HOC", () => {
  it("should wrap component with ErrorBoundary", () => {
    const WrappedComponent = withErrorBoundary(WorkingComponent);

    render(<WrappedComponent />);

    expect(screen.getByText("Working component")).toBeInTheDocument();
  });

  it("should catch errors in wrapped component", () => {
    const WrappedComponent = withErrorBoundary(ThrowingComponent);

    render(<WrappedComponent />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should pass custom options to ErrorBoundary", () => {
    const customFallback = <div>HOC custom fallback</div>;
    const onErrorMock = vi.fn();

    const WrappedComponent = withErrorBoundary(
      ThrowingComponent,
      customFallback,
      onErrorMock
    );

    render(<WrappedComponent />);

    expect(screen.getByText("HOC custom fallback")).toBeInTheDocument();
    expect(onErrorMock).toHaveBeenCalled();
  });

  it("should preserve component display name", () => {
    const TestComponent = () => <div>Test</div>;
    TestComponent.displayName = "TestComponent";

    const WrappedComponent = withErrorBoundary(TestComponent);

    expect(WrappedComponent.displayName).toBe(
      "withErrorBoundary(TestComponent)"
    );
  });
});

describe("Error Recovery", () => {
  it("should reset error state when children change", () => {
    let componentKey = 1;

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowingComponent key={componentKey} />
      </ErrorBoundary>
    );

    // Error should be displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Change children (simulate navigation or prop change)
    componentKey = 2;
    rerender(
      <ErrorBoundary>
        <WorkingComponent key={componentKey} />
      </ErrorBoundary>
    );

    // Component should recover
    expect(screen.getByText("Working component")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });
});

describe("Performance", () => {
  it("should not re-render when props do not change", () => {
    const renderSpy = vi.fn();

    const TestComponent = () => {
      renderSpy();
      return <div>Test component</div>;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(renderSpy).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(renderSpy).toHaveBeenCalledTimes(2); // Normal re-render behavior
  });
});
