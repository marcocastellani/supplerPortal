import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useErrorHandling } from '../useErrorHandling';

describe('useErrorHandling', () => {
  let result: any;

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useErrorHandling());
    result = hookResult;
  });

  it('should initialize with no error', () => {
    expect(result.current.error).toBeNull();
    expect(result.current.errorType).toBe('unknown');
  });

  it('should handle network errors correctly', () => {
    const networkError = {
      code: 'ERR_NETWORK',
      message: 'Network Error'
    };

    act(() => {
      result.current.handleError(networkError);
    });

    expect(result.current.error).toContain('Network connection error');
    expect(result.current.errorType).toBe('network');
  });

  it('should handle axios 400 validation errors', () => {
    const validationError = {
      response: {
        status: 400,
        data: {
          error: {
            message: 'Validation failed',
            details: [
              { code: 'REQUIRED', message: 'Field is required' },
              { code: 'INVALID', message: 'Field is invalid' }
            ]
          }
        }
      }
    };

    act(() => {
      result.current.handleError(validationError);
    });

    expect(result.current.error).toContain('Validation errors:');
    expect(result.current.error).toContain('REQUIRED: Field is required');
    expect(result.current.error).toContain('INVALID: Field is invalid');
    expect(result.current.errorType).toBe('validation');
  });

  it('should handle axios 500 server errors', () => {
    const serverError = {
      response: {
        status: 500,
        data: {
          error: {
            message: 'Internal server error'
          }
        }
      }
    };

    act(() => {
      result.current.handleError(serverError);
    });

    expect(result.current.error).toContain('Server error occurred');
    expect(result.current.errorType).toBe('server');
  });

  it('should handle axios 401 unauthorized errors', () => {
    const unauthorizedError = {
      response: {
        status: 401,
        data: {}
      }
    };

    act(() => {
      result.current.handleError(unauthorizedError);
    });

    expect(result.current.error).toContain('Authentication required');
    expect(result.current.errorType).toBe('validation');
  });

  it('should handle axios 403 forbidden errors', () => {
    const forbiddenError = {
      response: {
        status: 403,
        data: {}
      }
    };

    act(() => {
      result.current.handleError(forbiddenError);
    });

    expect(result.current.error).toContain('You do not have permission');
    expect(result.current.errorType).toBe('validation');
  });

  it('should handle generic Error instances', () => {
    const genericError = new Error('Something went wrong');

    act(() => {
      result.current.handleError(genericError);
    });

    expect(result.current.error).toContain('Error: Something went wrong');
    expect(result.current.errorType).toBe('unknown');
  });

  it('should handle Error instances with network keywords', () => {
    const networkError = new Error('Network connection failed');

    act(() => {
      result.current.handleError(networkError);
    });

    expect(result.current.error).toContain('Network connection error');
    expect(result.current.errorType).toBe('network');
  });

  it('should handle unknown error types', () => {
    const unknownError = 'Some string error';

    act(() => {
      result.current.handleError(unknownError);
    });

    expect(result.current.error).toContain('An unexpected error occurred');
    expect(result.current.errorType).toBe('unknown');
  });

  it('should clear errors correctly', () => {
    // First set an error
    act(() => {
      result.current.handleError(new Error('Test error'));
    });

    expect(result.current.error).toBeTruthy();

    // Then clear it
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.errorType).toBe('unknown');
  });
});
