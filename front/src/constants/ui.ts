/**
 * UI Constants - Centralized magic numbers for consistent UI behavior
 * Following [CMV] Constants Over Magic Values principle
 */

// Layout and Spacing
export const UI_SPACING = {
  PAGE_TOP_PADDING: 5,
  GRID_ROW_SPACING: 3,
  GRID_CONTAINER_SPACING: 2,
  CARD_PADDING: 2,
  BUTTON_MARGIN: 2,
  ICON_MARGIN: 0.5,
  SMALL: 1,
  SMALL_MARGIN: 1,
  MEDIUM: 2,
  MEDIUM_MARGIN: 2,
  LARGE: 3,
  LARGE_MARGIN: 3,
} as const;

// Icon Sizes
export const ICON_SIZES = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
  EXTRA_LARGE: 64,
} as const;

// Component Dimensions
export const COMPONENT_SIZES = {
  LOGO_WIDTH: 400,
  LOGO_MARGIN_BOTTOM: 20,
  CARD_MAX_WIDTH: 300,
  INPUT_MIN_WIDTH: 200,
  TEXTAREA_ROWS: 3,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  TOOLTIP: 1300,
  MODAL: 1400,
  POPOVER: 1500,
} as const;

// Timing Constants
export const TIMING = {
  DEBOUNCE_DELAY: 500,
  SUCCESS_MESSAGE_DURATION: 3000,
  ANIMATION_DURATION: 300,
  TOOLTIP_DELAY: 200,
} as const;

// Pagination and Data
export const DATA_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  LARGE_PAGE_SIZE: 100,
  FIRST_PAGE: 1,
  MAX_SEARCH_RESULTS: 1,
} as const;

// API Versions
export const API_VERSIONS = {
  SUPPLY_NETWORK: '2025-06-01',
  RBAC: '2024-10-24-preview',
  DASHBOARD: '2025-06-01',
} as const;

// Form Constants
export const FORM_CONSTANTS = {
  VALIDATION_TIMEOUT: 200,
  MAX_TAG_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 8,
} as const;

// Opacity and Visual Effects
export const VISUAL_EFFECTS = {
  HOVER_OPACITY: 1,
  DEFAULT_OPACITY: 0.7,
  DISABLED_OPACITY: 0.5,
  LINE_HEIGHT: 1.3,
  FONT_WEIGHT_MEDIUM: 500,
  FONT_WEIGHT_BOLD: 600,
} as const;

// Font Constants
export const FONT = {
  WEIGHT_NORMAL: 400,
  WEIGHT_MEDIUM: 500,
  WEIGHT_SEMIBOLD: 600,
  WEIGHT_BOLD: 700,
  
  // Font sizes in rem
  SIZE_XS: '0.7rem',      // 11.2px
  SIZE_SM: '0.75rem',     // 12px
  SIZE_BASE: '0.875rem',  // 14px
  SIZE_MD: '1rem',        // 16px
  SIZE_LG: '1.125rem',    // 18px
  SIZE_XL: '1.25rem',     // 20px
  SIZE_2XL: '1.75rem',    // 28px
} as const;
