import React, { useState, useEffect } from "react";
import { Container, Grid, Text, Input, Select } from "@remira/unifiedui";
import {
  FormWizard,
  WizardStep,
} from "../components/SupplyNetworkEntities/FormWizard";
import { EntitySelector } from "../components/SupplyNetworkEntities/EntitySelector";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import {
  EntityType,
  RoleInSupplyChain,
  AccreditationStatus,
  SupplyNetworkEntityFormData,
  EnumValues,
  SupplyNetworkEntitySearchResultDto,
} from "../types/supplyNetworkEntities";
import { ISO_COUNTRIES } from "../utils/countries";

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

  // Helper function to create labels with required indicator and error styling
  const createLabel = (
    baseLabel: string,
    isRequired: boolean = false,
    fieldName?: keyof typeof fieldErrors
  ) => {
    const requiredLabel = isRequired ? `${baseLabel} *` : baseLabel;

    // Se c'è un errore per questo campo, restituire un elemento JSX con styling
    if (fieldName && fieldErrors[fieldName]) {
      return (
        <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
          {requiredLabel}
        </span>
      );
    }

    return requiredLabel;
  };

  // Helper function to get input style based on error state
  const getInputStyle = (fieldName: keyof typeof fieldErrors) => {
    const hasError = fieldErrors[fieldName];
    return {
      // Solo il colore del testo, NO bordi rossi
      color: hasError ? "#d32f2f" : undefined,
      fontWeight: hasError ? "bold" : undefined,
    };
  };

  // Helper function to get helper text (NO ERROR MESSAGES HERE - only default text)
  const getHelperText = (
    fieldName: keyof typeof fieldErrors,
    defaultText: string
  ) => {
    // Non mostrare errori qui - solo testo di aiuto predefinito
    // Gli errori sono gestiti dal componente ErrorMessage separato
    return defaultText;
  };

  // Helper function to create error message component
  const ErrorMessage = ({
    fieldName,
  }: {
    fieldName: keyof typeof fieldErrors;
  }) => {
    const error = fieldErrors[fieldName];
    if (!error) return null;

    return (
      <Text
        variant="body2"
        sx={{
          color: "#d32f2f",
          mt: 0.5,
          fontSize: "0.75rem",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        ⚠️ {error}
      </Text>
    );
  };

  // Helper function to create validation progress indicator
  const ValidationProgress = ({
    fieldName,
  }: {
    fieldName: "legalName" | "externalCode";
  }) => {
    const isValidating = validationInProgress[fieldName];
    if (!isValidating) return null;

    return (
      <Text
        variant="body2"
        sx={{
          color: "#1976d2",
          mt: 0.5,
          fontSize: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        🔄 Checking availability...
      </Text>
    );
  };

  // Component to show required fields legend
  const RequiredFieldsLegend = () => (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "16px",
      }}
    >
      <Text variant="body2" sx={{ color: "#666", fontSize: "0.875rem" }}>
        📋 <strong>Required fields are marked with an asterisk (*)</strong>
      </Text>
      <Text
        variant="body2"
        sx={{ color: "#666", fontSize: "0.75rem", mt: 0.5 }}
      >
        Fields with errors are highlighted in red with warning messages.
      </Text>
    </div>
  );

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
        <RequiredFieldsLegend />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>
              Entity Configuration
            </Text>
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label={createLabel("Entity Type", true)}
              value={formData.entityType || ""}
              onChange={(event, option: any) => {
                console.log(
                  "EntityType onChange - event:",
                  event,
                  "option:",
                  option
                );
                console.log("event.target.value:", event?.target?.value);
                const newValue = option?.value || event?.target?.value;
                console.log("Using value:", newValue);
                handleInputChange("entityType", newValue as EntityType);
              }}
              options={enumValues.entityTypes.map((et) => ({
                value: et.value,
                label: et.display,
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label={createLabel("Role in Supply Chain", true)}
              value={formData.roleInSupplyChain || ""}
              onChange={(event, option: any) => {
                console.log(
                  "RoleInSupplyChain onChange - event:",
                  event,
                  "option:",
                  option
                );
                console.log("event.target.value:", event?.target?.value);
                const newValue = option?.value || event?.target?.value;
                console.log("Using value:", newValue);
                handleInputChange(
                  "roleInSupplyChain",
                  newValue as RoleInSupplyChain
                );
              }}
              options={enumValues.rolesInSupplyChain.map((role) => ({
                value: role.value,
                label: role.display,
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={formData.isSubEntity}
                onChange={(e) =>
                  handleInputChange("isSubEntity", e.target.checked)
                }
                style={{ marginRight: "8px" }}
              />
              <Text variant="body1">
                This is a sub-entity (linked to a parent)
              </Text>
            </label>
          </Grid>

          {formData.isSubEntity && (
            <Grid item xs={12}>
              <EntitySelector
                label="Parent Entity"
                value={selectedParent}
                onChange={(entity) => {
                  setSelectedParent(entity);
                  handleInputChange("parentId", entity?.id || "");
                }}
                entityType={EntityType.Supplier}
                placeholder="Type at least 3 characters to search for parent entity..."
                helperText="Search by name, code, VAT number, city, or contact person"
              />
            </Grid>
          )}
        </Grid>
      </WizardStep>

      {/* Step 2: General Information */}
      <WizardStep title="General Information" isValid={validateStep2()}>
        <RequiredFieldsLegend />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>
              Basic Information
            </Text>
          </Grid>

          <Grid item xs={12} md={8}>
            <Input
              label={createLabel("Legal Name", true, "legalName")}
              value={formData.legalName}
              onChange={(value: string) =>
                handleInputChange("legalName", value)
              }
              fullWidth
              helperText={getHelperText(
                "legalName",
                "Official registered name"
              )}
              onBlur={() => handleFieldBlur("legalName", formData.legalName)}
              style={getInputStyle("legalName")}
            />
            <ErrorMessage fieldName="legalName" />
            <ValidationProgress fieldName="legalName" />
          </Grid>

          <Grid item xs={12} md={4}>
            <Input
              label="Short Name"
              value={formData.shortName}
              onChange={(value: string) =>
                handleInputChange("shortName", value)
              }
              fullWidth
              helperText="Display name"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label={createLabel("External Code", false, "externalCode")}
              value={formData.externalCode}
              onChange={(value: string) =>
                handleInputChange("externalCode", value)
              }
              fullWidth
              helperText={getHelperText(
                "externalCode",
                "ERP, PLM reference code (optional)"
              )}
              style={getInputStyle("externalCode")}
            />
            <ErrorMessage fieldName="externalCode" />
            <ValidationProgress fieldName="externalCode" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label={createLabel("Email", false, "email")}
              value={formData.email}
              onChange={(value: string) => handleInputChange("email", value)}
              fullWidth
              helperText={getHelperText("email", "Contact email address")}
              onBlur={() => handleFieldBlur("email", formData.email)}
              style={getInputStyle("email")}
            />
            <ErrorMessage fieldName="email" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="VAT Code"
              value={formData.vatCode}
              onChange={(value: string) => handleInputChange("vatCode", value)}
              fullWidth
              helperText="Value Added Tax identification number"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Tax Code"
              value={formData.taxCode}
              onChange={(value: string) => handleInputChange("taxCode", value)}
              fullWidth
              helperText="National tax identification code"
            />
          </Grid>

          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2, mt: 2 }}>
              Address Information
            </Text>
          </Grid>

          <Grid item xs={12} md={3}>
            <Select
              label={createLabel("Country", true, "country")}
              value={formData.country || ""}
              onChange={(event, option: any) => {
                const newValue = option?.value || event?.target?.value;
                handleInputChange("country", newValue);
                // Clear country error when selecting
                if (fieldErrors.country) {
                  setFieldErrors((prev) => ({ ...prev, country: "" }));
                }
              }}
              options={ISO_COUNTRIES}
              fullWidth
              helperText={getHelperText(
                "country",
                "Select country (ISO 3166-1 alpha-2)"
              )}
            />
            <ErrorMessage fieldName="country" />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="Region"
              value={formData.region}
              onChange={(value: string) => handleInputChange("region", value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="City"
              value={formData.city}
              onChange={(value: string) => handleInputChange("city", value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(value: string) => handleInputChange("zipCode", value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              label="Address"
              value={formData.address}
              onChange={(value: string) => handleInputChange("address", value)}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(value: string) =>
                handleInputChange("phoneNumber", value)
              }
              fullWidth
            />
          </Grid>
        </Grid>
      </WizardStep>

      {/* Step 3: Status & Contact */}
      <WizardStep title="Status & Contact" isValid={validateStep3()}>
        <RequiredFieldsLegend />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>
              Status Information
            </Text>
          </Grid>

          <Grid item xs={12} md={6}>
            <Select
              label={createLabel("Accreditation Status", true)}
              value={formData.accreditationStatus || ""}
              onChange={(event, option: any) => {
                const newValue = option?.value || event?.target?.value;
                handleInputChange(
                  "accreditationStatus",
                  newValue as AccreditationStatus
                );
              }}
              options={enumValues.accreditationStatuses.map((status) => ({
                value: status.value,
                label: status.display,
              }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Input
              label="Tags"
              value={tagsInputValue}
              onChange={(value: string) => setTagsInputValue(value)}
              onBlur={() => {
                // Process tags when user finishes typing
                const processedTags = tagsInputValue
                  .split(",")
                  .map((tag: string) => tag.trim())
                  .filter((tag: string) => tag);
                handleInputChange("tags", processedTags);
              }}
              fullWidth
              helperText="Comma-separated tags (e.g., leather, Asia, highRisk)"
            />
          </Grid>

          {(formData.entityType === EntityType.Person ||
            formData.roleInSupplyChain === RoleInSupplyChain.ContactPerson) && (
            <Grid item xs={12}>
              <Input
                label="Contact Person Name"
                value={formData.contactPersonName}
                onChange={(value: string) =>
                  handleInputChange("contactPersonName", value)
                }
                fullWidth
              />
            </Grid>
          )}
        </Grid>
      </WizardStep>

      {/* Step 4: Review & Submit */}
      <WizardStep title="Review & Submit" isValid={true}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text variant="h6" sx={{ mb: 2 }}>
              Review Information
            </Text>
            <Text variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Please review all the information before submitting.
            </Text>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#fafafa",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Entity Type:</Text>
                  <Text variant="body2">{formData.entityType}</Text>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Role:</Text>
                  <Text variant="body2">{formData.roleInSupplyChain}</Text>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle2">Legal Name:</Text>
                  <Text variant="body2">{formData.legalName}</Text>
                </Grid>
                {formData.shortName && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Short Name:</Text>
                    <Text variant="body2">{formData.shortName}</Text>
                  </Grid>
                )}
                {formData.externalCode && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">External Code:</Text>
                    <Text variant="body2">{formData.externalCode}</Text>
                  </Grid>
                )}
                {formData.email && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Email:</Text>
                    <Text variant="body2">{formData.email}</Text>
                  </Grid>
                )}
                {formData.phoneNumber && (
                  <Grid item xs={12} md={6}>
                    <Text variant="subtitle2">Phone:</Text>
                    <Text variant="body2">{formData.phoneNumber}</Text>
                  </Grid>
                )}
                {(formData.country || formData.city) && (
                  <Grid item xs={12}>
                    <Text variant="subtitle2">Location:</Text>
                    <Text variant="body2">
                      {[formData.city, formData.region, formData.country]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <Text variant="subtitle2">Accreditation Status:</Text>
                  <Text variant="body2">{formData.accreditationStatus}</Text>
                </Grid>
                {formData.tags.length > 0 && (
                  <Grid item xs={12}>
                    <Text variant="subtitle2">Tags:</Text>
                    <Text variant="body2">{formData.tags.join(", ")}</Text>
                  </Grid>
                )}
              </Grid>
            </div>
          </Grid>

          {isLoading && (
            <Grid item xs={12}>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#d1ecf1",
                  border: "1px solid #bee5eb",
                  borderRadius: "8px",
                  color: "#0c5460",
                }}
              >
                Creating entity...
              </div>
            </Grid>
          )}

          {/* Error display component for Step 4 */}
          {error && (
            <Grid item xs={12}>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "8px",
                  color: "#721c24",
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                {/* Error icon based on error type */}
                <span style={{ fontSize: "20px", flexShrink: 0 }}>
                  {errorType === "network"
                    ? "🌐"
                    : errorType === "validation"
                    ? "⚠️"
                    : errorType === "server"
                    ? "🔧"
                    : "❌"}
                </span>

                {/* Error content */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {errorType === "network"
                      ? "Connection Error"
                      : errorType === "validation"
                      ? "Validation Error"
                      : errorType === "server"
                      ? "Server Error"
                      : "Error"}
                  </div>
                  <div style={{ fontSize: "14px", whiteSpace: "pre-line" }}>
                    {error}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {/* Retry button for network errors */}
                  {errorType === "network" && (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                      }}
                    >
                      {isLoading ? "⏳" : "🔄 Retry"}
                    </button>
                  )}

                  {/* Dismiss button */}
                  <button
                    onClick={clearError}
                    style={{
                      padding: "6px 8px",
                      backgroundColor: "transparent",
                      color: "#721c24",
                      border: "1px solid #721c24",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    ✕ Dismiss
                  </button>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </WizardStep>
    </FormWizard>
  );
};
