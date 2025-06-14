import { useState } from 'react';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';

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
  const [validationInProgress, setValidationInProgress] = useState<ValidationProgress>({});

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
      console.error(`Error validating ${field}:`, error);
      return `Error validating ${field}. Please try again.`;
    } finally {
      setValidationInProgress((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle field blur for validation
  const handleFieldBlur = async (
    field: "legalName" | "externalCode" | "email",
    value: string
  ) => {
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

  return {
    fieldErrors,
    validationInProgress,
    handleFieldBlur,
    clearFieldError,
    hasFieldError,
    getFieldError,
    isValidating,
  };
};
