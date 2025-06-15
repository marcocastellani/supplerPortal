import React from "react";
import { Grid, Box, Chip } from "@mui/material";
import { Text } from "@remira/unifiedui";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntityDto } from "../../../types/supplyNetworkEntities";
import { EntityInfoField } from "../EntityInfoField";
import { EntityDetailCard } from "../EntityDetailCard";

interface EntityBusinessTabProps {
  entity: SupplyNetworkEntityDto;
  onFieldUpdate: (
    fieldName: string,
    fieldValue: string | boolean | null
  ) => Promise<void>;
}

/**
 * Business tab showing business details and tags [SF, RP]
 */
export const EntityBusinessTab: React.FC<EntityBusinessTabProps> = ({
  entity,
  onFieldUpdate,
}) => {
  const { t } = useTranslation();

  // Format date for display [CMV]
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Grid container spacing={2}>
      {/* Business Details */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.business")}>
          <EntityInfoField
            label={t("entityDetail.fields.taxCode")}
            value={entity.taxCode}
            fieldName="taxCode"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.roleInSupplyChain")}
            value={entity.roleInSupplyChain}
            fieldName="roleInSupplyChain"
            editable={false}
          />
          <EntityInfoField
            label={t("entityDetail.fields.accreditationStatus")}
            value={entity.accreditationStatus}
            fieldName="accreditationStatus"
            editable={false}
          />
          {entity.accreditationDate && (
            <EntityInfoField
              label={t("entityDetail.fields.accreditationDate")}
              value={formatDate(entity.accreditationDate)}
              fieldName="accreditationDate"
              editable={false}
            />
          )}
          {entity.deactivationDate && (
            <EntityInfoField
              label={t("entityDetail.fields.deactivationDate")}
              value={formatDate(entity.deactivationDate)}
              fieldName="deactivationDate"
              editable={false}
            />
          )}
        </EntityDetailCard>
      </Grid>

      {/* Tags */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.tags")}>
          {entity.tags && entity.tags.length > 0 ? (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {entity.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          ) : (
            <Text variant="body2" color="textSecondary">
              {t("entityDetail.noTags")}
            </Text>
          )}
        </EntityDetailCard>
      </Grid>
    </Grid>
  );
};
