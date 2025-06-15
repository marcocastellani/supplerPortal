/**
 * Error handling utilities for consistent error management across the application
 * 
 * @fileoverview Provides standardized error types, handling functions, and logging utilities
 * following the principles of [REH] Robust Error Handling and [SFT] Security-First Thinking
 */

import { logger } from '@/utils/logger';

// Standardized error types [REH]
export enum ErrorType {
  NETWORK = 'network',
  VALIDATION = 'validation', 
  SERVER = 'server',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  UNKNOWN = 'unknown'
}

// Error severity levels for consistent logging [SFT]
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Standardized error interface [REH]
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  context?: Record<string, unknown>;
  severity: ErrorSeverity;
  timestamp: string;
  component?: string;
}

// User-friendly error messages mapping [REH]
export const ERROR_MESSAGES = {
  [ErrorType.NETWORK]: 'Connection error. Please check your internet connection and try again.',
  [ErrorType.VALIDATION]: 'Please check the form data and correct any errors.',
  [ErrorType.SERVER]: 'Server error occurred. Please try again later.',
  [ErrorType.AUTHENTICATION]: 'Authentication failed. Please log in again.',
  [ErrorType.AUTHORIZATION]: 'You do not have permission to perform this action.',
  [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.'
} as const;

/**
 * Creates a standardized AppError from any error [REH]
 */
export function createAppError(
  error: unknown,
  type: ErrorType = ErrorType.UNKNOWN,
  component?: string,
  context?: Record<string, unknown>
): AppError {
  const severity = getSeverityForErrorType(type);
  
  return {
    type,
    message: getErrorMessage(error, type),
    originalError: error,
    context,
    severity,
    timestamp: new Date().toISOString(),
    component
  };
}

/**
 * Extracts user-friendly message from error [REH]
 */
function getErrorMessage(error: unknown, type: ErrorType): string {
  // Try to extract message from error object
  if (error && typeof error === 'object' && 'message' in error) {
    const errorMessage = (error as { message: string }).message;
    if (errorMessage && typeof errorMessage === 'string') {
      return errorMessage;
    }
  }
  
  // Fallback to type-based message
  return ERROR_MESSAGES[type];
}

/**
 * Determines error severity based on type [REH]
 */
function getSeverityForErrorType(type: ErrorType): ErrorSeverity {
  switch (type) {
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
      return ErrorSeverity.HIGH;
    case ErrorType.SERVER:
      return ErrorSeverity.MEDIUM;
    case ErrorType.NETWORK:
    case ErrorType.NOT_FOUND:
      return ErrorSeverity.MEDIUM;
    case ErrorType.VALIDATION:
      return ErrorSeverity.LOW;
    default:
      return ErrorSeverity.MEDIUM;
  }
}

/**
 * Logs error with consistent format and security considerations [SFT]
 */
export function logError(appError: AppError): void {
  const logData = {
    type: appError.type,
    message: appError.message,
    severity: appError.severity,
    timestamp: appError.timestamp,
    component: appError.component,
    context: appError.context
    // Note: originalError is intentionally excluded from logs for security [SFT]
  };

  switch (appError.severity) {
    case ErrorSeverity.CRITICAL:
    case ErrorSeverity.HIGH:
      logger.error('Application error occurred', logData);
      break;
    case ErrorSeverity.MEDIUM:
      logger.warn('Application warning', logData);
      break;
    case ErrorSeverity.LOW:
      logger.info('Application info', logData);
      break;
    default:
      logger.error('Unknown severity error', logData);
  }
}

/**
 * Determines error type from HTTP status or error object [REH]
 */
export function determineErrorType(error: unknown): ErrorType {
  // Check for HTTP status codes
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    
    switch (true) {
      case status === 401:
        return ErrorType.AUTHENTICATION;
      case status === 403:
        return ErrorType.AUTHORIZATION;
      case status === 404:
        return ErrorType.NOT_FOUND;
      case status >= 400 && status < 500:
        return ErrorType.VALIDATION;
      case status >= 500:
        return ErrorType.SERVER;
      default:
        return ErrorType.UNKNOWN;
    }
  }
  
  // Check for network errors
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    if (code === 'NETWORK_ERROR' || code === 'ECONNREFUSED') {
      return ErrorType.NETWORK;
    }
  }
  
  // Check error message for common patterns
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message?.toLowerCase() || '';
    
    if (message.includes('network') || message.includes('connection')) {
      return ErrorType.NETWORK;
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return ErrorType.VALIDATION;
    }
    if (message.includes('unauthorized') || message.includes('authentication')) {
      return ErrorType.AUTHENTICATION;
    }
    if (message.includes('forbidden') || message.includes('permission')) {
      return ErrorType.AUTHORIZATION;
    }
    if (message.includes('not found')) {
      return ErrorType.NOT_FOUND;
    }
  }
  
  return ErrorType.UNKNOWN;
}

/**
 * Handles error with consistent logging and user feedback [REH]
 */
export function handleError(
  error: unknown,
  component?: string,
  context?: Record<string, unknown>
): AppError {
  const errorType = determineErrorType(error);
  const appError = createAppError(error, errorType, component, context);
  
  // Log the error with consistent format [SFT]
  logError(appError);
  
  return appError;
}

/**
 * Async error handler for promises [REH]
 */
export async function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  component?: string,
  context?: Record<string, unknown>
): Promise<{ data?: T; error?: AppError }> {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    const appError = handleError(error, component, context);
    return { error: appError };
  }
}
