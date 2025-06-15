import React from "react";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import BusinessIcon from "@mui/icons-material/Business";
import FactoryIcon from "@mui/icons-material/Factory";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { EntityType } from "../../types/supplyNetworkEntities";

interface EntityTypeChipProps {
  entityType: EntityType;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  showIcon?: boolean;
  style?: "default" | "colorful";
  minimal?: boolean;
}

export const EntityTypeChip: React.FC<EntityTypeChipProps> = ({
  entityType,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
  minimal = false,
}) => {
  const { t } = useTranslation();

  // Get entity type icon
  const getEntityTypeIcon = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return <BusinessIcon fontSize="small" />;
      case EntityType.Site:
        return <FactoryIcon fontSize="small" />;
      case EntityType.SubSupplier:
        return <AccountTreeIcon fontSize="small" />;
      case EntityType.Person:
        return <PersonIcon fontSize="small" />;
      case EntityType.CompanyGroup:
        return <ApartmentIcon fontSize="small" />;
      default:
        return <BusinessIcon fontSize="small" />;
    }
  };

  // Get entity type display name
  const getEntityTypeDisplay = (type: EntityType): string => {
    switch (type) {
      case EntityType.Supplier:
        return t("networkEntities.entityType.supplier");
      case EntityType.Site:
        return t("networkEntities.entityType.site");
      case EntityType.SubSupplier:
        return t("networkEntities.entityType.subSupplier");
      case EntityType.Person:
        return t("networkEntities.entityType.person");
      case EntityType.CompanyGroup:
        return t("networkEntities.entityType.companyGroup");
      default:
        return type;
    }
  };

  // Get entity type color scheme
  const getEntityTypeColor = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return {
          color: "#1976d2",
          backgroundColor: "#e3f2fd",
          borderColor: "#1976d2",
        };
      case EntityType.Site:
        return {
          color: "#f57c00",
          backgroundColor: "#fff3e0",
          borderColor: "#f57c00",
        };
      case EntityType.SubSupplier:
        return {
          color: "#7b1fa2",
          backgroundColor: "#f3e5f5",
          borderColor: "#7b1fa2",
        };
      case EntityType.Person:
        return {
          color: "#388e3c",
          backgroundColor: "#e8f5e8",
          borderColor: "#388e3c",
        };
      case EntityType.CompanyGroup:
        return {
          color: "#d32f2f",
          backgroundColor: "#ffebee",
          borderColor: "#d32f2f",
        };
      default:
        return {
          color: "#757575",
          backgroundColor: "#f5f5f5",
          borderColor: "#757575",
        };
    }
  };

  const colorScheme = getEntityTypeColor(entityType);

  return (
    <Chip
      icon={showIcon ? getEntityTypeIcon(entityType) : undefined}
      label={getEntityTypeDisplay(entityType)}
      size={size}
      sx={{
        fontWeight: "medium",
        borderRadius: minimal ? "16px" : "20px",
        height: minimal ? "auto" : size === "small" ? "32px" : "36px",
        padding: minimal ? "0" : size === "small" ? "0 8px" : "0 12px",
        border: minimal ? "none" : undefined,
        minHeight: minimal ? "24px" : undefined,
        "& .MuiChip-label": {
          paddingLeft: minimal ? "4px" : showIcon ? "0px" : "8px",
          paddingRight: minimal ? "4px" : "8px",
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        },
        "& .MuiChip-icon": {
          marginLeft: minimal ? "2px" : "4px",
          marginRight: minimal ? "2px" : "8px",
        },
        ...(minimal && {
          backgroundColor: "transparent !important",
          color: `${colorScheme.color} !important`,
          boxShadow: "none !important",
          "& .MuiChip-icon": {
            color: `${colorScheme.color} !important`,
            marginLeft: "2px",
            marginRight: "2px",
          },
        }),
        ...(!minimal &&
          style === "colorful" && {
            ...colorScheme,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: `1px solid ${colorScheme.borderColor} !important`,
            "& .MuiChip-icon": {
              color: `${colorScheme.color} !important`,
              marginLeft: "4px",
              marginRight: "8px",
            },
          }),
        ...(!minimal &&
          style === "default" &&
          variant === "outlined" && {
            borderColor: "rgba(0, 0, 0, 0.23)",
          }),
      }}
    />
  );
};
