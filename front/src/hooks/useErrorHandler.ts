/**
 * Custom hook for consistent error handling across components
 * 
 * @fileoverview Provides standardized error state management, user notifications,
 * and error recovery patterns following [REH] Robust Error Handling principles
 */

import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  handleError, 
  AppError, 
  ErrorType, 
  ERROR_MESSAGES,
  determineErrorType 
} from '@/utils/errorHandling';

interface UseErrorHandlerOptions {
  component?: string;
  showToast?: boolean;
  defaultErrorType?: ErrorType;
}

interface UseErrorHandlerReturn {
  error: AppError | null;
  hasError: boolean;
  errorMessage: string;
  setError: (error: unknown, context?: Record<string, unknown>) => void;
  clearError: () => void;
  handleAsyncOperation: <T>(
    operation: () => Promise<T>,
    context?: Record<string, unknown>
  ) => Promise<{ data?: T; error?: AppError }>;
  retryOperation: (() => Promise<void>) | null;
}

/**
 * Custom hook for consistent error handling [REH]
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn {
  const { component, defaultErrorType = ErrorType.UNKNOWN } = options;
  const { t } = useTranslation();
  
  const [error, setErrorState] = useState<AppError | null>(null);
  const [retryFn, setRetryFn] = useState<(() => Promise<void>) | null>(null);

  // Memoized error message with i18n support [PA]
  const errorMessage = useMemo(() => {
    if (!error) return '';
    
    // Try to get translated message first
    const translationKey = `errors.${error.type}`;
    const translatedMessage = t(translationKey, { defaultValue: '' });
    
    if (translatedMessage) {
      return translatedMessage;
    }
    
    // Fallback to error message or type-based message
    return error.message || ERROR_MESSAGES[error.type];
  }, [error, t]);

  // Set error with consistent handling [REH]
  const setError = useCallback((
    errorInput: unknown, 
    context?: Record<string, unknown>
  ) => {
    const appError = handleError(errorInput, component, context);
    
    setErrorState(appError);
    setRetryFn(null); // Clear retry function when new error occurs
  }, [component]);

  // Clear error state [REH]
  const clearError = useCallback(() => {
    setErrorState(null);
    setRetryFn(null);
  }, []);

  // Handle async operations with consistent error handling [REH]
  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    context?: Record<string, unknown>
  ): Promise<{ data?: T; error?: AppError }> => {
    try {
      clearError(); // Clear previous errors
      const data = await operation();
      return { data };
    } catch (err) {
      const errorType = determineErrorType(err) || defaultErrorType;
      const appError = handleError(err, component, context);
      
      setErrorState(appError);
      
      // Set retry function for recoverable errors
      if (isRecoverableError(errorType)) {
        setRetryFn(() => async () => {
          await handleAsyncOperation(operation, context);
        });
      }
      
      return { error: appError };
    }
  }, [component, defaultErrorType, clearError]);

  // Retry the last failed operation [REH]
  const retryOperation = useCallback(async () => {
    if (retryFn) {
      await retryFn();
    }
  }, [retryFn]);

  return {
    error,
    hasError: error !== null,
    errorMessage,
    setError,
    clearError,
    handleAsyncOperation,
    retryOperation: retryFn ? retryOperation : null
  };
}

/**
 * Determines if an error type is recoverable (can be retried) [REH]
 */
function isRecoverableError(errorType: ErrorType): boolean {
  switch (errorType) {
    case ErrorType.NETWORK:
    case ErrorType.SERVER:
      return true;
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
    case ErrorType.VALIDATION:
    case ErrorType.NOT_FOUND:
      return false;
    default:
      return false;
  }
}

/**
 * Hook for handling form validation errors specifically [REH]
 */
export function useFormErrorHandler(component?: string) {
  const errorHandler = useErrorHandler({ 
    component, 
    defaultErrorType: ErrorType.VALIDATION 
  });

  // Enhanced setError for form validation
  const setValidationError = useCallback((
    fieldErrors: Record<string, string> | unknown,
    context?: Record<string, unknown>
  ) => {
    if (fieldErrors && typeof fieldErrors === 'object') {
      const errorContext = {
        ...context,
        fieldErrors,
        errorType: 'validation'
      };
      errorHandler.setError(fieldErrors, errorContext);
    } else {
      errorHandler.setError(fieldErrors, context);
    }
  }, [errorHandler]);

  return {
    ...errorHandler,
    setValidationError
  };
}

/**
 * Hook for handling API errors specifically [REH]
 */
export function useApiErrorHandler(component?: string) {
  const errorHandler = useErrorHandler({ 
    component, 
    defaultErrorType: ErrorType.SERVER 
  });

  // Enhanced error handling for API responses
  const handleApiError = useCallback((
    error: unknown,
    endpoint?: string,
    method?: string
  ) => {
    const context = {
      endpoint,
      method,
      timestamp: new Date().toISOString()
    };
    
    errorHandler.setError(error, context);
  }, [errorHandler]);

  return {
    ...errorHandler,
    handleApiError
  };
}
