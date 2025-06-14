import React from "react";
import { Grid, Text, Input, Select } from "@remira/unifiedui";
import { RequiredFieldsLegend, FormLabel } from "../../Forms";
import {
  EntityType,
  RoleInSupplyChain,
  AccreditationStatus,
  SupplyNetworkEntityFormData,
  EnumValues,
} from "../../../types/supplyNetworkEntities";

interface StatusContactStepProps {
  formData: SupplyNetworkEntityFormData;
  enumValues: EnumValues;
  tagsInputValue: string;
  onInputChange: (field: keyof SupplyNetworkEntityFormData, value: any) => void;
  setTagsInputValue: (value: string) => void;
}

export const StatusContactStep: React.FC<StatusContactStepProps> = ({
  formData,
  enumValues,
  tagsInputValue,
  onInputChange,
  setTagsInputValue,
}) => {
  return (
    <>
      <RequiredFieldsLegend />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Text variant="h6" sx={{ mb: 2 }}>
            Status Information
          </Text>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select
            label={
              <FormLabel required={true} hasError={false}>
                Accreditation Status
              </FormLabel>
            }
            value={formData.accreditationStatus || ""}
            onChange={(event, option: any) => {
              const newValue = option?.value || event?.target?.value;
              onInputChange(
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
              onInputChange("tags", processedTags);
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
                onInputChange("contactPersonName", value)
              }
              fullWidth
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
