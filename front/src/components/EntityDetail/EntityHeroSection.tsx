import React from "react";
import { Box, Paper, Divider, Link } from "@mui/material";
import { Text } from "@remira/unifiedui";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SupplyNetworkEntityDto } from "../../types/supplyNetworkEntities";
import { EntityTypeChip, EntityStatusChip } from "../EntityChips";

interface EntityHeroSectionProps {
  entity: SupplyNetworkEntityDto;
  parentEntity?: SupplyNetworkEntityDto;
}

/**
 * Hero section displaying entity name and key chips [SF]
 */
export const EntityHeroSection: React.FC<EntityHeroSectionProps> = ({
  entity,
  parentEntity,
}) => {
  const navigate = useNavigate();

  const handleParentClick = () => {
    if (parentEntity) {
      navigate(`/supply-network/entity/${parentEntity.id}`);
    }
  };
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Text variant="h4" sx={{ mb: 1 }}>
              {entity.legalName} | {entity.shortName}
            </Text>
          </Box>{" "}
        </Box>{" "}
        <Box display="flex" alignItems="right" gap={2}>
          <EntityTypeChip entityType={entity.entityType} />
          <EntityStatusChip active={entity.active} />
        </Box>
      </Box>
      <Box display={"flex"} flexDirection="column" mt={1}>
        <Box display="flex" alignItems="center" gap={1}>
          {entity.vatCode && (
            <Text variant="body2" color="textSecondary">
              VAT: {entity.vatCode}
            </Text>
          )}
          {entity.externalCode && (
            <Text variant="body2" color="textSecondary">
              Code: {entity.externalCode}
            </Text>
          )}
        </Box>
      </Box>

      {/* Parent Entity Information */}
      {parentEntity && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Text
              variant="body2"
              color="textSecondary"
              sx={{ mb: 1, fontWeight: 500 }}
            >
              Part of:
            </Text>

            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Link
                component="button"
                variant="subtitle2"
                onClick={handleParentClick}
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                  cursor: "pointer",
                }}
              >
                {parentEntity.legalName}
              </Link>
              |
              <EntityTypeChip entityType={parentEntity.entityType} minimal />
              |
              <EntityStatusChip active={parentEntity.active} minimal />
              {parentEntity.externalCode && (
                <Text variant="body2" color="textSecondary">
                  | Code: {parentEntity.externalCode}
                </Text>
              )}
              {parentEntity.vatCode && (
                <Text variant="body2" color="textSecondary">
                  | VAT: {parentEntity.vatCode}
                </Text>
              )}
              {parentEntity.taxCode && (
                <Text variant="body2" color="textSecondary">
                  | Tax: {parentEntity.taxCode}
                </Text>
              )}
              {(parentEntity.city || parentEntity.country) && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Text variant="body2" color="textSecondary">
                    {[parentEntity.city, parentEntity.country]
                      .filter(Boolean)
                      .join(", ")}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};
