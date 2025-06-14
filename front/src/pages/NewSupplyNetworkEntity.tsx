import React, { useState, useEffect } from "react";
import { Container, Grid, Text } from "@remira/unifiedui";
import {
  FormWizard,
  WizardStep,
} from "../components/SupplyNetworkEntities/FormWizard";
import { EntityTypeRoleStep } from "../components/SupplyNetworkEntities/FormSteps/EntityTypeRoleStep";
import { GeneralInfoStep } from "../components/SupplyNetworkEntities/FormSteps/GeneralInfoStep";
import { StatusContactStep } from "../components/SupplyNetworkEntities/FormSteps/StatusContactStep";
import { ReviewSubmitStep } from "../components/SupplyNetworkEntities/FormSteps/ReviewSubmitStep";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import {
  EntityType,
  RoleInSupplyChain,
  AccreditationStatus,
  SupplyNetworkEntityFormData,
  EnumValues,
  SupplyNetworkEntitySearchResultDto,
} from "../types/supplyNetworkEntities";

export const NewSupplyNetworkEntity = () => {
  const [formData, setFormData] = useState<SupplyNetworkEntityFormData>({
    entityType: "" as EntityType, // Start with empty string to avoid controlled/uncontrolled issues
    roleInSupplyChain: "" as RoleInSupplyChain, // Start with empty string
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
    accreditationStatus: "" as AccreditationStatus, // Start with empty string
    tags: [],
    contactPersonName: "",
    vatCode: "",
    taxCode: "",
    active: true,
  });

  const [enumValues, setEnumValues] = useState<EnumValues | null>(null);
  const [selectedParent, setSelectedParent] =
    useState<SupplyNetworkEntitySearchResultDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "network" | "validation" | "server" | "unknown"
  >("unknown");
  const [success, setSuccess] = useState(false);
  const [tagsInputValue, setTagsInputValue] = useState<string>(""); // Local state for tags input

  // Field validation errors
  const [fieldErrors, setFieldErrors] = useState<{
    legalName?: string;
    externalCode?: string;
    email?: string;
    country?: string;
  }>({});

  // Validation in progress flags
  const [validationInProgress, setValidationInProgress] = useState<{
    legalName?: boolean;
    externalCode?: boolean;
  }>({});

  // Helper function to get input style based on error state
  const getInputStyle = (fieldName: string) => {
    const hasError = fieldErrors[fieldName as keyof typeof fieldErrors];
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
    field: keyof SupplyNetworkEntityFormData,
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
      // Country validation is handled by Select component with predefined values
    }

    setFieldErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }));
  };

  // Step validation functions
  const validateStep1 = () => {
    const isValid = !!(
      formData.entityType &&
      formData.roleInSupplyChain &&
      (!formData.isSubEntity || formData.parentId)
    );
    return isValid;
  };

  const validateStep2 = () => {
    const hasRequiredFields = !!(formData.legalName && formData.country);
    // External Code is optional, so only check if required fields don't have errors
    const hasNoRequiredFieldErrors =
      !fieldErrors.legalName && !fieldErrors.email;
    return hasRequiredFields && hasNoRequiredFieldErrors;
  };

  const validateStep3 = () => {
    return !!formData.accreditationStatus;
  };

  useEffect(() => {
    const loadEnumValues = async () => {
      try {
        const enums = await SupplyNetworkEntitiesService.getEnumValues();
        console.log("Loaded enum values:", enums);
        setEnumValues(enums);

        // Set default values after loading enums
        if (
          enums.entityTypes.length > 0 &&
          enums.rolesInSupplyChain.length > 0 &&
          enums.accreditationStatuses.length > 0
        ) {
          setFormData((prev) => ({
            ...prev,
            entityType: enums.entityTypes[0].value as EntityType,
            roleInSupplyChain: enums.rolesInSupplyChain[0]
              .value as RoleInSupplyChain,
            accreditationStatus:
              (enums.accreditationStatuses.find((s) => s.value === "Approved")
                ?.value as AccreditationStatus) ||
              (enums.accreditationStatuses[0].value as AccreditationStatus),
          }));
          // Initialize tags input value
          setTagsInputValue("");
        }
      } catch (err) {
        console.error("Error loading enum values:", err);
        setError(
          "Failed to load form data: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    };

    loadEnumValues();
  }, []);

  const handleInputChange = (
    field: keyof SupplyNetworkEntityFormData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    clearError(); // Clear errors when user starts typing
  };

  // Helper function to categorize and format errors
  const handleError = (err: unknown) => {
    let errorMessage = "";
    let errorCategory: "network" | "validation" | "server" | "unknown" =
      "unknown";

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
    setError(errorMessage);
    setErrorType(errorCategory);
  };

  // Helper function to clear error
  const clearError = () => {
    setError(null);
    setErrorType("unknown");
  };

  const handleSubmit = async () => {
    console.log("🚀 handleSubmit started");
    setIsLoading(true);
    clearError(); // Use the new clear error function

    try {
      console.log("📤 Sending request with data:", {
        externalCode: formData.externalCode,
        entityType: formData.entityType,
        parentId: formData.isSubEntity ? formData.parentId : undefined,
        legalName: formData.legalName,
        shortName: formData.shortName,
        vatCode: formData.vatCode,
        taxCode: formData.taxCode,
        country: formData.country,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        zipCode: formData.zipCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        contactPersonName: formData.contactPersonName,
        roleInSupplyChain: formData.roleInSupplyChain,
        tags: formData.tags,
        active: formData.active,
        accreditationStatus: formData.accreditationStatus,
        accreditationDate: formData.accreditationDate,
      });

      const result =
        await SupplyNetworkEntitiesService.createSupplyNetworkEntity({
          externalCode: formData.externalCode,
          entityType: formData.entityType,
          parentId: formData.isSubEntity ? formData.parentId : undefined,
          legalName: formData.legalName,
          shortName: formData.shortName,
          vatCode: formData.vatCode,
          taxCode: formData.taxCode,
          country: formData.country,
          region: formData.region,
          city: formData.city,
          address: formData.address,
          zipCode: formData.zipCode,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          contactPersonName: formData.contactPersonName,
          roleInSupplyChain: formData.roleInSupplyChain,
          tags: formData.tags,
          active: formData.active,
          accreditationStatus: formData.accreditationStatus,
          accreditationDate: formData.accreditationDate,
        });

      console.log("✅ Request successful:", result);
      setSuccess(true);
      // Reset form after successful creation
      setTimeout(() => {
        setSuccess(false);
        if (enumValues) {
          setFormData({
            entityType:
              (enumValues.entityTypes[0]?.value as EntityType) ||
              ("" as EntityType),
            roleInSupplyChain:
              (enumValues.rolesInSupplyChain[0]?.value as RoleInSupplyChain) ||
              ("" as RoleInSupplyChain),
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
              (enumValues.accreditationStatuses.find(
                (s) => s.value === "Approved"
              )?.value as AccreditationStatus) ||
              (enumValues.accreditationStatuses[0]
                ?.value as AccreditationStatus) ||
              ("" as AccreditationStatus),
            tags: [],
            contactPersonName: "",
            vatCode: "",
            taxCode: "",
            active: true,
          });
          // Reset tags input value
          setTagsInputValue("");
        }
      }, 3000);
    } catch (err) {
      console.error("❌ Request failed:", err);
      console.log("📋 Error object details:", {
        name: (err as any)?.name,
        message: (err as any)?.message,
        response: (err as any)?.response,
        status: (err as any)?.response?.status,
        data: (err as any)?.response?.data,
        config: (err as any)?.config,
      });
      handleError(err); // Use the new error handling function
    } finally {
      console.log("🏁 handleSubmit finished");
      setIsLoading(false);
    }
  };

  if (!enumValues) {
    return (
      <Container type="page">
        <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
          <Grid item xs={12}>
            {error ? (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "8px",
                  color: "#721c24",
                }}
              >
                <Text variant="h6">Error loading form</Text>
                <Text variant="body2">{error}</Text>
              </div>
            ) : (
              <Text variant="h3">Loading...</Text>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (success) {
    return (
      <Container type="page">
        <Grid container rowSpacing={3} sx={{ paddingTop: 5 }}>
          <Grid item xs={12}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "8px",
                color: "#155724",
              }}
            >
              Supply Network Entity created successfully!
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <FormWizard onComplete={handleSubmit} isLoading={isLoading}>
      {/* Step 1: Entity Type & Role */}
      <WizardStep title="Entity Type & Role" isValid={validateStep1()}>
        <EntityTypeRoleStep
          formData={formData}
          enumValues={enumValues}
          onInputChange={handleInputChange}
          selectedParent={selectedParent}
          onParentChange={(entity) => {
            setSelectedParent(entity);
            handleInputChange("parentId", entity?.id || "");
          }}
        />
      </WizardStep>

      {/* Step 2: General Information */}
      <WizardStep title="General Information" isValid={validateStep2()}>
        <GeneralInfoStep
          formData={formData}
          fieldErrors={fieldErrors}
          validationInProgress={validationInProgress}
          onInputChange={handleInputChange}
          onFieldBlur={handleFieldBlur}
          getHelperText={getHelperText}
          getInputStyle={getInputStyle}
          setFieldErrors={setFieldErrors}
        />
      </WizardStep>

      {/* Step 3: Status & Contact */}
      <WizardStep title="Status & Contact" isValid={validateStep3()}>
        <StatusContactStep
          formData={formData}
          enumValues={enumValues}
          tagsInputValue={tagsInputValue}
          setTagsInputValue={setTagsInputValue}
          onInputChange={handleInputChange}
        />
      </WizardStep>

      {/* Step 4: Review & Submit */}
      <WizardStep title="Review & Submit" isValid={true}>
        <ReviewSubmitStep
          formData={formData}
          isLoading={isLoading}
          error={error}
          errorType={errorType}
          onSubmit={handleSubmit}
          onClearError={clearError}
        />
      </WizardStep>
    </FormWizard>
  );
};
