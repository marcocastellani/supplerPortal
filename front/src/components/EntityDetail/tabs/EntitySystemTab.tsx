import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntityDto } from "../../../types/supplyNetworkEntities";
import { EntityInfoField } from "../EntityInfoField";
import { EntityDetailCard } from "../EntityDetailCard";

interface EntitySystemTabProps {
  entity: SupplyNetworkEntityDto;
}

/**
 * System tab showing metadata and identifiers [SF, RP]
 */
export const EntitySystemTab: React.FC<EntitySystemTabProps> = ({ entity }) => {
  const { t } = useTranslation();

  // Format date for display [CMV]
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Grid container spacing={2}>
      {/* System Information */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.metadata")}>
          <EntityInfoField
            label={t("entityDetail.fields.createdAt")}
            value={formatDate(entity.created)}
            fieldName="created"
            editable={false}
          />
          <EntityInfoField
            label={t("entityDetail.fields.updatedAt")}
            value={formatDate(entity.lastModified)}
            fieldName="lastModified"
            editable={false}
          />
          <EntityInfoField
            label={t("entityDetail.fields.createdBy")}
            value={entity.createdBy}
            fieldName="createdBy"
            editable={false}
          />
          <EntityInfoField
            label={t("entityDetail.fields.updatedBy")}
            value={entity.lastModifiedBy}
            fieldName="lastModifiedBy"
            editable={false}
          />
        </EntityDetailCard>
      </Grid>

      {/* System Identifiers */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.identifiers")}>
          <EntityInfoField
            label={t("entityDetail.fields.id")}
            value={entity.id}
            fieldName="id"
            editable={false}
          />
          {entity.parentId && (
            <EntityInfoField
              label={t("entityDetail.fields.parentId")}
              value={entity.parentId}
              fieldName="parentId"
              editable={false}
            />
          )}
        </EntityDetailCard>
      </Grid>
    </Grid>
  );
};
