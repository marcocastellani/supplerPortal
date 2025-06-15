import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SupplyNetworkEntityDto } from "../../../types/supplyNetworkEntities";
import { EntityInfoField } from "../EntityInfoField";
import { EntityDetailCard } from "../EntityDetailCard";

interface EntityContactsTabProps {
  entity: SupplyNetworkEntityDto;
  onFieldUpdate: (
    fieldName: string,
    fieldValue: string | boolean | null
  ) => Promise<void>;
}

/**
 * Contacts tab showing contact and address information [SF, RP]
 */
export const EntityContactsTab: React.FC<EntityContactsTabProps> = ({
  entity,
  onFieldUpdate,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      {/* Contact Information */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.contact")}>
          <EntityInfoField
            label={t("entityDetail.fields.email")}
            value={entity.email}
            fieldName="email"
            type="email"
            icon={<EmailIcon fontSize="small" />}
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.phone")}
            value={entity.phoneNumber}
            fieldName="phoneNumber"
            icon={<PhoneIcon fontSize="small" />}
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.contactPerson")}
            value={entity.contactPersonName}
            fieldName="contactPersonName"
            icon={<PersonIcon fontSize="small" />}
            onUpdate={onFieldUpdate}
          />
        </EntityDetailCard>
      </Grid>

      {/* Address Information */}
      <Grid item xs={12} md={6}>
        <EntityDetailCard title={t("entityDetail.sections.addresses")}>
          <EntityInfoField
            label={t("entityDetail.fields.country")}
            value={entity.country}
            fieldName="country"
            icon={<LocationOnIcon fontSize="small" />}
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.region")}
            value={entity.region}
            fieldName="region"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.city")}
            value={entity.city}
            fieldName="city"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.address")}
            value={entity.address}
            fieldName="address"
            type="textarea"
            onUpdate={onFieldUpdate}
          />
          <EntityInfoField
            label={t("entityDetail.fields.postalCode")}
            value={entity.zipCode}
            fieldName="zipCode"
            onUpdate={onFieldUpdate}
          />
        </EntityDetailCard>
      </Grid>
    </Grid>
  );
};
