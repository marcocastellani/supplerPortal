import React from "react";
import { Box } from "@mui/material";
import { SubEntitiesList } from "../SubEntitiesList";

interface EntitySubEntitiesTabProps {
  parentEntityId: string;
  onAddNew: () => void;
}

/**
 * Sub-entities tab wrapper [SF]
 */
export const EntitySubEntitiesTab: React.FC<EntitySubEntitiesTabProps> = ({
  parentEntityId,
  onAddNew,
}) => {
  return (
    <Box>
      <SubEntitiesList parentEntityId={parentEntityId} onAddNew={onAddNew} />
    </Box>
  );
};
