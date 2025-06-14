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
import { useErrorHandling } from "../hooks/useErrorHandling";
import { useFormValidation } from "../hooks/useFormValidation";
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
  const [success, setSuccess] = useState(false);
  const [tagsInputValue, setTagsInputValue] = useState<string>(""); // Local state for tags input

  // Use custom hook for error handling
  const { error, errorType, handleError: hookHandleError, clearError } = useErrorHandling();

  // Use custom hook for form validation
  const {
    fieldErrors,
    validationInProgress,
    handleFieldBlur: hookHandleFieldBlur,
    getInputStyle,
    getHelperText,
    setFieldErrors,
  } = useFormValidation();

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
        hookHandleError(err); // Use hook error handling
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

  const handleSubmit = async () => {
    console.log("🚀 handleSubmit started");
    setIsLoading(true);
    clearError(); // Use the hook clear error function

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
      hookHandleError(err); // Use the hook error handling function
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
          onFieldBlur={hookHandleFieldBlur}
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
