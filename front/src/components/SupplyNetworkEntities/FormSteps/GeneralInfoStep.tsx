import React from "react";
import { Grid, Text, Input, Select } from "@remira/unifiedui";
import {
  RequiredFieldsLegend,
  ErrorMessage,
  ValidationProgress,
  FormLabel,
} from "../../Forms";
import { ISO_COUNTRIES } from "../../../utils/countries";
import { SupplyNetworkEntityFormData } from "../../../types/supplyNetworkEntities";

interface GeneralInfoStepProps {
  formData: SupplyNetworkEntityFormData;
  fieldErrors: {
    legalName?: string;
    externalCode?: string;
    email?: string;
    country?: string;
  };
  validationInProgress: {
    legalName?: boolean;
    externalCode?: boolean;
  };
  onInputChange: (field: keyof SupplyNetworkEntityFormData, value: any) => void;
  onFieldBlur: (
    field: keyof SupplyNetworkEntityFormData,
    value: string
  ) => void;
  getInputStyle: (fieldName: string) => any;
  getHelperText: (fieldName: string, defaultText: string) => string;
  setFieldErrors: React.Dispatch<
    React.SetStateAction<{
      legalName?: string;
      externalCode?: string;
      email?: string;
      country?: string;
    }>
  >;
}

export const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({
  formData,
  fieldErrors,
  validationInProgress,
  onInputChange,
  onFieldBlur,
  getInputStyle,
  getHelperText,
  setFieldErrors,
}) => {
  return (
    <>
      <RequiredFieldsLegend />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Text variant="h6" sx={{ mb: 2 }}>
            Basic Information
          </Text>
        </Grid>

        <Grid item xs={12} md={8}>
          <Input
            label={
              <FormLabel required={true} hasError={!!fieldErrors.legalName}>
                Legal Name
              </FormLabel>
            }
            value={formData.legalName}
            onChange={(value: string) => onInputChange("legalName", value)}
            fullWidth
            helperText={getHelperText("legalName", "Official registered name")}
            onBlur={() => onFieldBlur("legalName", formData.legalName)}
            style={getInputStyle("legalName")}
          />
          <ErrorMessage message={fieldErrors.legalName} />
          <ValidationProgress
            isValidating={validationInProgress.legalName || false}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Input
            label="Short Name"
            value={formData.shortName}
            onChange={(value: string) => onInputChange("shortName", value)}
            fullWidth
            helperText="Display name"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Input
            label={
              <FormLabel required={false} hasError={!!fieldErrors.externalCode}>
                External Code
              </FormLabel>
            }
            value={formData.externalCode}
            onChange={(value: string) => onInputChange("externalCode", value)}
            fullWidth
            helperText={getHelperText(
              "externalCode",
              "ERP, PLM reference code (optional)"
            )}
            style={getInputStyle("externalCode")}
          />
          <ErrorMessage message={fieldErrors.externalCode} />
          <ValidationProgress
            isValidating={validationInProgress.externalCode || false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Input
            label={
              <FormLabel required={false} hasError={!!fieldErrors.email}>
                Email
              </FormLabel>
            }
            value={formData.email}
            onChange={(value: string) => onInputChange("email", value)}
            fullWidth
            helperText={getHelperText("email", "Contact email address")}
            onBlur={() => onFieldBlur("email", formData.email)}
            style={getInputStyle("email")}
          />
          <ErrorMessage message={fieldErrors.email} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Input
            label="VAT Code"
            value={formData.vatCode}
            onChange={(value: string) => onInputChange("vatCode", value)}
            fullWidth
            helperText="Value Added Tax identification number"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Input
            label="Tax Code"
            value={formData.taxCode}
            onChange={(value: string) => onInputChange("taxCode", value)}
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
            label={
              <FormLabel required={true} hasError={!!fieldErrors.country}>
                Country
              </FormLabel>
            }
            value={formData.country || ""}
            onChange={(event, option: any) => {
              const newValue = option?.value || event?.target?.value;
              onInputChange("country", newValue);
              // Clear country error when selecting
              if (fieldErrors.country) {
                setFieldErrors((prev) => ({ ...prev, country: undefined }));
              }
            }}
            options={ISO_COUNTRIES}
            fullWidth
            helperText={getHelperText(
              "country",
              "Select country (ISO 3166-1 alpha-2)"
            )}
          />
          <ErrorMessage message={fieldErrors.country} />
        </Grid>

        <Grid item xs={12} md={3}>
          <Input
            label="Region"
            value={formData.region}
            onChange={(value: string) => onInputChange("region", value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Input
            label="City"
            value={formData.city}
            onChange={(value: string) => onInputChange("city", value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Input
            label="ZIP Code"
            value={formData.zipCode}
            onChange={(value: string) => onInputChange("zipCode", value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            label="Address"
            value={formData.address}
            onChange={(value: string) => onInputChange("address", value)}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Input
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(value: string) => onInputChange("phoneNumber", value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};
