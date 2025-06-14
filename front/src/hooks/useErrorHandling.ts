import { useState } from 'react';

export type ErrorType = "network" | "validation" | "server" | "unknown";

interface ErrorState {
  message: string | null;
  type: ErrorType;
}

export const useErrorHandling = () => {
  const [error, setError] = useState<ErrorState>({
    message: null,
    type: "unknown"
  });

  const handleError = (err: unknown) => {
    let errorMessage = "";
    let errorCategory: ErrorType = "unknown";

    console.error("Error caught in handleError:", err);

    // Handle axios errors specifically
    if (err && typeof err === "object" && "response" in err) {
      const axiosError = err as any;
      const status = axiosError.response?.status;
      const responseData = axiosError.response?.data;

      console.log("Axios error details:", { status, responseData });

      if (status === 400) {
        // Validation errors from server
        errorCategory = "validation";

        if (
          responseData?.error?.details &&
          Array.isArray(responseData.error.details)
        ) {
          // Format detailed validation errors
          const fieldErrors = responseData.error.details
            .map((detail: any) => `${detail.code}: ${detail.message}`)
            .join("\n• ");
          errorMessage = `Validation errors:\n• ${fieldErrors}`;
        } else if (responseData?.error?.message) {
          errorMessage = `Validation error: ${responseData.error.message}`;
        } else {
          errorMessage = "Please check your input data and try again.";
        }
      } else if (status >= 500) {
        // Server errors
        errorCategory = "server";
        errorMessage =
          "Server error occurred. Please try again later or contact support.";
      } else if (status === 401) {
        errorCategory = "validation";
        errorMessage = "Authentication required. Please log in again.";
      } else if (status === 403) {
        errorCategory = "validation";
        errorMessage = "You do not have permission to perform this action.";
      } else {
        errorCategory = "server";
        errorMessage = `HTTP ${status}: ${
          responseData?.error?.message || axiosError.message
        }`;
      }
    }
    // Handle network errors (no response)
    else if (err && typeof err === "object" && "code" in err) {
      const networkError = err as any;
      if (
        networkError.code === "NETWORK_ERROR" ||
        networkError.code === "ERR_NETWORK"
      ) {
        errorCategory = "network";
        errorMessage =
          "Network connection error. Please check your internet connection and try again.";
      }
    }
    // Handle Error instances
    else if (err instanceof Error) {
      const message = err.message.toLowerCase();

      // Network errors
      if (
        message.includes("network") ||
        message.includes("fetch") ||
        message.includes("connection")
      ) {
        errorCategory = "network";
        errorMessage =
          "Network connection error. Please check your internet connection and try again.";
      }
      // Generic errors
      else {
        errorCategory = "unknown";
        errorMessage = `Error: ${err.message}`;
      }
    }
    // Fallback for unknown error types
    else {
      errorCategory = "unknown";
      errorMessage = "An unexpected error occurred. Please try again.";
    }

    console.log("Final error categorization:", { errorCategory, errorMessage });
    setError({ message: errorMessage, type: errorCategory });
  };

  const clearError = () => {
    setError({ message: null, type: "unknown" });
  };

  return {
    error: error.message,
    errorType: error.type,
    handleError,
    clearError,
  };
};
