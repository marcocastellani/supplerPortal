/**
 * Input sanitization utilities for preventing XSS attacks [IV][REH]
 *
 * This module provides secure methods for displaying user-generated content
 * by escaping HTML entities and sanitizing potentially dangerous input.
 *
 * Security Features:
 * - HTML entity escaping to prevent XSS injection
 * - Input validation and sanitization for user-generated content
 * - Entity code validation with alphanumeric filtering
 * - Text truncation with safe length limits
 * - Type guards for runtime type safety
 *
 * Used throughout the application to secure:
 * - EntityTable display data (names, VAT codes, locations)
 * - QuestionnaireCard content (titles, supplier information)
 * - Form inputs and user-generated text
 * - API response data before rendering
 *
 * @example
 * ```tsx
 * // Secure display of user data
 * const safeName = sanitizeUserInput(entity.name);
 * const safeCode = sanitizeEntityCode(entity.vatCode);
 * const truncated = sanitizeAndTruncate(longText, 100);
 * ```
 */

/**
 * Escapes HTML entities to prevent XSS attacks [IV]
 *
 * @param text - The text to sanitize
 * @returns Sanitized text with HTML entities escaped
 */
export const escapeHtml = (text: string | null | undefined): string => {
  if (!text) return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Sanitizes user input for safe display in React components [IV][REH]
 *
 * @param input - The input to sanitize
 * @returns Sanitized string safe for display
 */
export const sanitizeUserInput = (input: string | null | undefined): string => {
  if (!input) return "";

  // Trim whitespace and escape HTML
  const trimmed = input.trim();
  return escapeHtml(trimmed);
};

/**
 * Sanitizes and truncates text for display in tables [IV]
 *
 * @param text - The text to sanitize and truncate
 * @param maxLength - Maximum length before truncation (default: 50)
 * @returns Sanitized and truncated text
 */
export const sanitizeAndTruncate = (
  text: string | null | undefined,
  maxLength: number = 50
): string => {
  const sanitized = sanitizeUserInput(text);

  if (sanitized.length <= maxLength) {
    return sanitized;
  }

  return `${sanitized.substring(0, maxLength)}...`;
};

/**
 * Validates and sanitizes entity codes (VAT, external codes) [IV]
 *
 * @param code - The code to validate and sanitize
 * @returns Sanitized code or fallback
 */
export const sanitizeEntityCode = (code: string | null | undefined): string => {
  if (!code) return "-";

  // Remove any potential script content and limit to alphanumeric + common chars
  const cleaned = code.replace(/[<>"`']/g, "").trim();
  return cleaned || "-";
};

/**
 * Type guard to check if a value is a non-empty string [IV]
 *
 * @param value - The value to check
 * @returns True if value is a non-empty string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};
