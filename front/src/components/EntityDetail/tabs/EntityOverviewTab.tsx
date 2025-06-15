import React from "react";
import { Grid, Box } from "@mui/material";
import { Text } from "@remira/unifiedui";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntityDto } from "../../../types/supplyNetworkEntities";
import { EntityInfoField } from "../EntityInfoField";
import { EntityDetailCard } from "../EntityDetailCard";
import { EntityTypeChip, AccreditationStatusChip } from "../../EntityChips";

interface EntityOverviewTabProps {
  entity: SupplyNetworkEntityDto;
  onFieldUpdate: (
    fieldName: string,
    fieldValue: string | boolean | null
  ) => Promise<void>;
}

/**
 * Overview tab showing essential entity information [SF, RP]
 */
export const EntityOverviewTab: React.FC<EntityOverviewTabProps> = ({
  entity,
  onFieldUpdate,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      {/* Essential Information */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.general")}>
          <EntityInfoField
            label={t("entityDetail.fields.legalName")}
            value={entity.legalName}
            fieldName="legalName"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.displayName")}
            value={entity.shortName}
            fieldName="shortName"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.externalCode")}
            value={entity.externalCode}
            fieldName="externalCode"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.vatNumber")}
            value={entity.vatCode}
            fieldName="vatCode"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.active")}
            value={entity.active}
            fieldName="active"
            type="boolean"
            onUpdate={onFieldUpdate}
          />
        </EntityDetailCard>
      </Grid>

      {/* Quick Stats */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.quickStats")}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="body2" color="textSecondary">
                {t("entityDetail.fields.entityType")}
              </Text>
              <EntityTypeChip entityType={entity.entityType} />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="body2" color="textSecondary">
                {t("entityDetail.fields.accreditationStatus")}
              </Text>
              <AccreditationStatusChip
                accreditationStatus={entity.accreditationStatus}
              />
            </Box>

            {entity.country && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="body2" color="textSecondary">
                  {t("entityDetail.fields.location")}
                </Text>
                <Text variant="body2">
                  {[entity.city, entity.country].filter(Boolean).join(", ")}
                </Text>
              </Box>
            )}
          </Box>
        </EntityDetailCard>
      </Grid>
    </Grid>
  );
};
