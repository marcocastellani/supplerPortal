import { useState, useCallback } from "react";
import {
  SupplyNetworkEntityFormData,
  EntityType,
  RoleInSupplyChain,
  AccreditationStatus,
  SupplyNetworkEntitySearchResultDto,
} from "../types/supplyNetworkEntities";
import { DefaultEnumValues } from "./useEntityEnums";
import { log } from "../utils/logger";

const createInitialFormData = (
  defaults?: DefaultEnumValues
): SupplyNetworkEntityFormData => ({
  entityType: defaults?.entityType || ("" as EntityType),
  roleInSupplyChain: defaults?.roleInSupplyChain || ("" as RoleInSupplyChain),
  isSubEntity: false,
  legalName: "",
  shortName: "",
  externalCode: "",
  country: "",
  region: "",
  city: "",
  address: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
  accreditationStatus:
    defaults?.accreditationStatus || ("" as AccreditationStatus),
  tags: [],
  contactPersonName: "",
  vatCode: "",
  taxCode: "",
  active: true,
});

export interface UseNewEntityFormReturn {
  formData: SupplyNetworkEntityFormData;
  selectedParent: SupplyNetworkEntitySearchResultDto | null;
  tagsInputValue: string;
  handleInputChange: (
    field: keyof SupplyNetworkEntityFormData,
    value: any
  ) => void;
  handleParentChange: (
    entity: SupplyNetworkEntitySearchResultDto | null
  ) => void;
  setTagsInputValue: (value: string) => void;
  resetForm: (defaults?: DefaultEnumValues) => void;
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  validateStep3: () => boolean;
}

export const useNewEntityForm = (
  initialDefaults?: DefaultEnumValues,
  fieldErrors?: { [key: string]: string }
): UseNewEntityFormReturn => {
  const [formData, setFormData] = useState<SupplyNetworkEntityFormData>(
    createInitialFormData(initialDefaults)
  );
  const [selectedParent, setSelectedParent] =
    useState<SupplyNetworkEntitySearchResultDto | null>(null);
  const [tagsInputValue, setTagsInputValue] = useState<string>("");

  // Initialize form with defaults when they become available
  const resetForm = useCallback((defaults?: DefaultEnumValues) => {
    const newFormData = createInitialFormData(defaults);
    setFormData(newFormData);
    setSelectedParent(null);
    setTagsInputValue("");

    log.debug("Form reset with new defaults", {
      component: "useNewEntityForm",
      defaults,
      formData: newFormData,
    });
  }, []);

  const handleInputChange = useCallback(
    (field: keyof SupplyNetworkEntityFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      log.debug("Form field updated", {
        component: "useNewEntityForm",
        field,
        value: typeof value === "string" ? value : "[object]",
      });
    },
    []
  );

  const handleParentChange = useCallback(
    (entity: SupplyNetworkEntitySearchResultDto | null) => {
      setSelectedParent(entity);
      handleInputChange("parentId", entity?.id || "");

      log.debug("Parent entity changed", {
        component: "useNewEntityForm",
        parentId: entity?.id,
        parentName: entity?.legalName,
      });
    },
    [handleInputChange]
  );

  // Step validation functions - memoized to prevent infinite loops [PA]
  const validateStep1 = useCallback(() => {
    const isValid = !!(
      formData.entityType &&
      formData.roleInSupplyChain &&
      (!formData.isSubEntity || formData.parentId)
    );

    // Only log validation during actual user interaction, not during renders
    if (formData.entityType || formData.roleInSupplyChain) {
      log.debug("Step 1 validation", {
        component: "useNewEntityForm",
        isValid,
        entityType: formData.entityType,
        roleInSupplyChain: formData.roleInSupplyChain,
        isSubEntity: formData.isSubEntity,
        hasParentId: !!formData.parentId,
      });
    }

    return isValid;
  }, [
    formData.entityType,
    formData.roleInSupplyChain,
    formData.isSubEntity,
    formData.parentId,
  ]);

  const validateStep2 = useCallback(() => {
    const hasRequiredFields = !!(formData.legalName && formData.country);
    const hasNoRequiredFieldErrors =
      !fieldErrors?.legalName && !fieldErrors?.email;
    const isValid = hasRequiredFields && hasNoRequiredFieldErrors;

    // Only log validation during actual user interaction, not during renders
    if (formData.legalName || formData.country) {
      log.debug("Step 2 validation", {
        component: "useNewEntityForm",
        isValid,
        hasRequiredFields,
        hasNoRequiredFieldErrors,
        legalName: formData.legalName,
        country: formData.country,
      });
    }

    return isValid;
  }, [formData.legalName, formData.country, fieldErrors]);

  const validateStep3 = useCallback(() => {
    const isValid = !!formData.accreditationStatus;

    // Only log validation during actual user interaction, not during renders
    if (formData.accreditationStatus) {
      log.debug("Step 3 validation", {
        component: "useNewEntityForm",
        isValid,
        accreditationStatus: formData.accreditationStatus,
      });
    }

    return isValid;
  }, [formData.accreditationStatus]);

  return {
    formData,
    selectedParent,
    tagsInputValue,
    handleInputChange,
    handleParentChange,
    setTagsInputValue,
    resetForm,
    validateStep1,
    validateStep2,
    validateStep3,
  };
};
