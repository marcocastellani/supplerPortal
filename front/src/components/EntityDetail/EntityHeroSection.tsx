import React from "react";
import { Box, Paper } from "@mui/material";
import { Text } from "@remira/unifiedui";
import { SupplyNetworkEntityDto } from "../../types/supplyNetworkEntities";
import { EntityTypeChip, EntityStatusChip } from "../EntityChips";

interface EntityHeroSectionProps {
  entity: SupplyNetworkEntityDto;
}

/**
 * Hero section displaying entity name and key chips [SF]
 */
export const EntityHeroSection: React.FC<EntityHeroSectionProps> = ({
  entity,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Text variant="h4" sx={{ mb: 1 }}>
              {entity.legalName || entity.shortName}
            </Text>
            {entity.shortName && entity.shortName !== entity.legalName && (
              <Text variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                {entity.shortName}
              </Text>
            )}
            <Box display="flex" alignItems="center" gap={2}>
              <EntityTypeChip entityType={entity.entityType} />
              <EntityStatusChip active={entity.active} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
