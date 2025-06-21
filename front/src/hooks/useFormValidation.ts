import { useState } from "react";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import { SupplyNetworkEntityFormData } from "../types/supplyNetworkEntities";
import { log } from "@/utils/logger";

interface FieldErrors {
  legalName?: string;
  externalCode?: string;
  email?: string;
  country?: string;
}

interface ValidationProgress {
  legalName?: boolean;
  externalCode?: boolean;
}

export const useFormValidation = () => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [validationInProgress, setValidationInProgress] =
    useState<ValidationProgress>({});

  // Email validation
  const validateEmail = (email: string): string | null => {
    if (!email) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email must contain @ and at least one dot after @";
    }
    return null;
  };

  // Validate field uniqueness (external code, legal name)
  const validateFieldUniqueness = async (
    field: "externalCode" | "legalName",
    value: string
  ): Promise<string | null> => {
    if (!value) return null;

    try {
      setValidationInProgress((prev) => ({ ...prev, [field]: true }));

      if (field === "externalCode") {
        const response =
          await SupplyNetworkEntitiesService.validateExternalCode(value);
        if (!response.isUnique) {
          return "External code already exists. Please choose a different code.";
        }
      } else if (field === "legalName") {
        // For legal name, we search to see if any entity with same name exists
        const searchResults =
          await SupplyNetworkEntitiesService.searchSupplyNetworkEntities({
            searchTerm: value,
            maxResults: 1,
            activeOnly: false,
          });

        if (
          searchResults.length > 0 &&
          searchResults[0].legalName.toLowerCase() === value.toLowerCase()
        ) {
          return "An entity with this legal name already exists.";
        }
      }

      return null;
    } catch (error) {
      log.error(`Error validating ${field}:`, {
        hook: "useFormValidation",
        field,
        error,
      });
      return `Error validating ${field}. Please try again.`;
    } finally {
      setValidationInProgress((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle field blur for validation
  const handleFieldBlur = async (
    field: keyof SupplyNetworkEntityFormData,
    value: string
  ): Promise<void> => {
    // Only handle validation for supported fields
    const supportedFields = ["email", "legalName", "externalCode"] as const;
    if (!supportedFields.includes(field as any)) {
      return;
    }

    let error: string | null = null;

    switch (field) {
      case "email":
        error = validateEmail(value);
        break;
      case "externalCode":
        // Only validate if value is provided (since it's optional)
        if (value.trim()) {
          error = await validateFieldUniqueness("externalCode", value);
        }
        break;
      case "legalName":
        error = await validateFieldUniqueness("legalName", value);
        break;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const hasFieldError = (field: keyof FieldErrors): boolean => {
    return !!fieldErrors[field];
  };

  const getFieldError = (field: keyof FieldErrors): string | undefined => {
    return fieldErrors[field];
  };

  const isValidating = (field: "legalName" | "externalCode"): boolean => {
    return !!validationInProgress[field];
  };

  // Helper function to get input style based on error state
  const getInputStyle = (fieldName: string) => {
    const hasError = fieldErrors[fieldName as keyof FieldErrors];
    return {
      // Solo il colore del testo, NO bordi rossi
      color: hasError ? "#d32f2f" : undefined,
      fontWeight: hasError ? "bold" : undefined,
    };
  };

  // Helper function to get helper text (NO ERROR MESSAGES HERE - only default text)
  const getHelperText = (fieldName: string, defaultText: string) => {
    // Non mostrare errori qui - solo testo di aiuto predefinito
    // Gli errori sono gestiti dal componente ErrorMessage separato
    return defaultText;
  };

  return {
    fieldErrors,
    validationInProgress,
    handleFieldBlur,
    clearFieldError,
    hasFieldError,
    getFieldError,
    isValidating,
    getInputStyle,
    getHelperText,
    setFieldErrors,
  };
};
