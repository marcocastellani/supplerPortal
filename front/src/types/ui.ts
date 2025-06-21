/**
 * UI Component Types [ISA, TDT]
 * 
 * Type definitions for UI components to improve type safety
 * and eliminate 'any' usage in event handlers
 */

// Select component types for @remira/unifiedui
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectChangeEvent {
  target: {
    value: string;
  };
}

// Union type for Select onChange handler parameters
export type SelectChangeHandler = (
  event: SelectChangeEvent | null,
  option: SelectOption | null
) => void;

// Form event types
export interface FormInputChangeEvent {
  target: {
    value: string;
    name?: string;
  };
}

export type InputChangeHandler = (event: FormInputChangeEvent) => void;

// Pagination types
export interface PaginationChangeEvent {
  page: number;
  pageSize?: number;
}

export type PaginationChangeHandler = (event: PaginationChangeEvent) => void;

// Tab change types
export interface TabChangeEvent {
  target?: {
    value: number;
  };
}

export type TabChangeHandler = (
  event: React.SyntheticEvent | TabChangeEvent,
  newValue: number
) => void;

// Generic event handler types
export type GenericEventHandler<T = any> = (event: T) => void;

// Error types for better error handling
export interface ApiError {
  response?: {
    status: number;
    data?: {
      error?: {
        message?: string;
        details?: Array<{
          code: string;
          message: string;
        }>;
      };
    };
  };
  message: string;
  code?: string;
  name?: string;
}

export interface NetworkError {
  code: 'NETWORK_ERROR' | 'ERR_NETWORK' | string;
  message: string;
}

export type AppError = ApiError | NetworkError | Error;

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Filter types for common filtering patterns
export interface FilterState<T = string> {
  [key: string]: T;
}

export interface SearchFilters {
  search: string;
  type: string;
  status: string;
  page: number;
}

export default {};
