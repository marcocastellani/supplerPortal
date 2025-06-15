import React from "react";
import { Card, CardContent, Divider } from "@mui/material";
import { Text } from "@remira/unifiedui";

interface EntityDetailCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Reusable card component for entity detail sections [DRY]
 */
export const EntityDetailCard: React.FC<EntityDetailCardProps> = ({
  title,
  children,
}) => {
  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <Text variant="h6" sx={{ mb: 1 }}>
          {title}
        </Text>
        <Divider sx={{ mb: 1 }} />
        {children}
      </CardContent>
    </Card>
  );
};
