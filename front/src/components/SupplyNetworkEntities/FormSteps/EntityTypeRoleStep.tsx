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

// ✅ Proper TypeScript interfaces instead of any types [IV]
interface SelectOption {
  value: string;
  label: string;
}

interface EntityTypeRoleStepProps {
  formData: SupplyNetworkEntityFormData;
  enumValues: EnumValues;
  selectedParent: SupplyNetworkEntitySearchResultDto | null;
  /** Handler for form field changes with proper typing [IV] */
  onInputChange: (
    field: keyof SupplyNetworkEntityFormData,
    value: string | boolean
  ) => void;
  onParentChange: (entity: SupplyNetworkEntitySearchResultDto | null) => void;
}

/**
 * EntityTypeRoleStep component with proper TypeScript interfaces [IV]
 *
 * Form step for selecting entity type and role in supply chain
 * with type-safe event handlers and proper interface definitions.
 */
export const EntityTypeRoleStep: React.FC<EntityTypeRoleStepProps> = ({
  formData,
  enumValues,
  selectedParent,
  onInputChange,
  onParentChange,
}) => {
  // ✅ Type-safe event handlers [IV]
  const handleEntityTypeChange = (
    event: React.SyntheticEvent,
    option: SelectOption | null
  ) => {
    const newValue =
      option?.value || (event?.target as HTMLSelectElement)?.value;
    onInputChange("entityType", newValue as EntityType);
  };

  const handleRoleChange = (
    event: React.SyntheticEvent,
    option: SelectOption | null
  ) => {
    const newValue =
      option?.value || (event?.target as HTMLSelectElement)?.value;
    onInputChange("roleInSupplyChain", newValue as RoleInSupplyChain);
  };

  const handleSubEntityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange("isSubEntity", e.target.checked);
  };

  const handleParentEntityChange = (
    entity: SupplyNetworkEntitySearchResultDto | null
  ) => {
    onParentChange(entity);
    onInputChange("parentId", entity?.id || "");
  };

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
            onChange={handleEntityTypeChange}
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
            onChange={handleRoleChange}
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
              onChange={handleSubEntityChange}
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
              onChange={handleParentEntityChange}
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
