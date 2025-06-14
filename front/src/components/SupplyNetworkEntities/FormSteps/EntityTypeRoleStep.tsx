import React from "react";
import { Grid, Text, Select } from "@remira/unifiedui";
import { EntitySelector } from "../EntitySelector";
import { RequiredFieldsLegend, FormLabel } from "../../Forms";
import {
  EntityType,
  RoleInSupplyChain,
  SupplyNetworkEntityFormData,
  EnumValues,
  SupplyNetworkEntitySearchResultDto,
} from "../../../types/supplyNetworkEntities";

interface EntityTypeRoleStepProps {
  formData: SupplyNetworkEntityFormData;
  enumValues: EnumValues;
  selectedParent: SupplyNetworkEntitySearchResultDto | null;
  onInputChange: (field: keyof SupplyNetworkEntityFormData, value: any) => void;
  onParentChange: (entity: SupplyNetworkEntitySearchResultDto | null) => void;
}

export const EntityTypeRoleStep: React.FC<EntityTypeRoleStepProps> = ({
  formData,
  enumValues,
  selectedParent,
  onInputChange,
  onParentChange,
}) => {
  return (
    <>
      <RequiredFieldsLegend />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Text variant="h6" sx={{ mb: 2 }}>
            Entity Configuration
          </Text>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select
            label={
              <FormLabel required={true} hasError={false}>
                Entity Type
              </FormLabel>
            }
            value={formData.entityType || ""}
            onChange={(event, option: any) => {
              const newValue = option?.value || event?.target?.value;
              onInputChange("entityType", newValue as EntityType);
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
            label={
              <FormLabel required={true} hasError={false}>
                Role in Supply Chain
              </FormLabel>
            }
            value={formData.roleInSupplyChain || ""}
            onChange={(event, option: any) => {
              const newValue = option?.value || event?.target?.value;
              onInputChange("roleInSupplyChain", newValue as RoleInSupplyChain);
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
              onChange={(e) => onInputChange("isSubEntity", e.target.checked)}
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
                onParentChange(entity);
                onInputChange("parentId", entity?.id || "");
              }}
              entityType={EntityType.Supplier}
              placeholder="Type at least 3 characters to search for parent entity..."
              helperText="Search by name, code, VAT number, city, or contact person"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
