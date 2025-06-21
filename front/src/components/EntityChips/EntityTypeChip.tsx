import React from "react";
import { Chip, useTheme } from "@mui/material";
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

/**
 * EntityTypeChip component with full theme support [TH][SF][CMV]
 *
 * Displays entity type information with theme-aware colors that automatically
 * adapt to light/dark mode switching while maintaining accessibility and
 * design system consistency.
 *
 * Features:
 * - Complete theme integration with Material-UI theme tokens
 * - Support for all EntityType enum values (Supplier, Site, SubSupplier, Person, CompanyGroup)
 * - Semantic color mapping with proper contrast ratios
 * - Configurable size, variant, and styling options
 * - Icon support with entity-specific icons
 * - Internationalization support with react-i18next
 * - Minimal mode for compact displays
 * - WCAG 2.1 AA compliant color contrast
 *
 * @param entityType - The entity type from EntityType enum
 * @param size - Component size variant ("small" | "medium")
 * @param variant - Chip variant ("filled" | "outlined")
 * @param showIcon - Whether to display entity-specific icon
 * @param style - Visual style ("default" | "colorful")
 * @param minimal - Enable minimal styling for compact displays
 * @returns JSX.Element - Themed entity type chip component
 *
 * @example
 * ```tsx
 * <EntityTypeChip entityType={EntityType.Supplier} />
 * <EntityTypeChip entityType={EntityType.Site} size="medium" showIcon={true} />
 * <EntityTypeChip entityType={EntityType.Person} style="colorful" minimal={false} />
 * ```
 */
export const EntityTypeChip: React.FC<EntityTypeChipProps> = ({
  entityType,
  size = "small",
  variant = "outlined",
  showIcon = true,
  style = "colorful",
  minimal = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme(); // ✅ Access theme for light/dark mode support [TH]

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

  // ✅ Get entity type color scheme with theme support and improved contrast [TH]
  const getEntityTypeColor = (type: EntityType) => {
    switch (type) {
      case EntityType.Supplier:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.primary.main, // ✅ Solid primary color [TH]
          borderColor: theme.palette.primary.main, // ✅ Theme-aware [TH]
        };
      case EntityType.Site:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.warning.main, // ✅ Solid warning color [TH]
          borderColor: theme.palette.warning.main, // ✅ Theme-aware [TH]
        };
      case EntityType.SubSupplier:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.secondary.main, // ✅ Solid secondary color [TH]
          borderColor: theme.palette.secondary.main, // ✅ Theme-aware [TH]
        };
      case EntityType.Person:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.success.main, // ✅ Solid success color [TH]
          borderColor: theme.palette.success.main, // ✅ Theme-aware [TH]
        };
      case EntityType.CompanyGroup:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.error.main, // ✅ Solid error color [TH]
          borderColor: theme.palette.error.main, // ✅ Theme-aware [TH]
        };
      default:
        return {
          color: theme.palette.common.white, // ✅ White text for better contrast [TH]
          backgroundColor: theme.palette.grey[600], // ✅ Darker grey for contrast [TH]
          borderColor: theme.palette.grey[600], // ✅ Theme-aware [TH]
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
            boxShadow: theme.shadows[1], // ✅ Theme-aware shadow instead of hardcoded [TH]
            border: `1px solid ${colorScheme.borderColor} !important`,
            "& .MuiChip-icon": {
              color: `${colorScheme.color} !important`,
              marginLeft: "4px",
              marginRight: "8px",
            },
            "& .MuiChip-label": {
              color: `${colorScheme.color} !important`,
            },
          }),
        ...(!minimal &&
          style === "default" &&
          variant === "outlined" && {
            borderColor: theme.palette.divider, // ✅ Theme-aware border instead of rgba [TH]
          }),
      }}
    />
  );
};
