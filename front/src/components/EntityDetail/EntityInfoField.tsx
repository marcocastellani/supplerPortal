import React, { useState } from "react";
import { Box, IconButton, TextField, Chip } from "@mui/material";
import { Text } from "@remira/unifiedui";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EntityInfoFieldProps {
  label: string;
  value: string | boolean | null | undefined;
  fieldName: string;
  editable?: boolean;
  type?: "text" | "email" | "boolean" | "textarea";
  icon?: React.ReactNode;
  onUpdate?: (
    fieldName: string,
    newValue: string | boolean | null
  ) => Promise<void>;
  isLoading?: boolean;
}

export const EntityInfoField: React.FC<EntityInfoFieldProps> = ({
  label,
  value,
  fieldName,
  editable = true,
  type = "text",
  icon,
  onUpdate,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStartEdit = () => {
    setEditValue(value?.toString() || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!onUpdate) return;

    setIsUpdating(true);
    try {
      let finalValue: string | boolean | null = editValue;

      if (type === "boolean") {
        finalValue = editValue === "true";
      } else if (editValue.trim() === "") {
        finalValue = null;
      }

      await onUpdate(fieldName, finalValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update field:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value?.toString() || "");
    setIsEditing(false);
  };

  const displayValue = () => {
    if (value === null || value === undefined) return "-";
    if (type === "boolean") {
      return (
        <Chip
          label={value ? "True" : "False"}
          color={value ? "success" : "default"}
          size="medium"
          variant="outlined"
          style={{ padding: "0 8px", fontSize: "0.875rem" }}
        />
      );
    }
    return value.toString();
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        {icon}
        <Text variant="body2" color="textSecondary">
          {label}
        </Text>
      </Box>

      {isEditing ? (
        <Box display="flex" alignItems="center" gap={1}>
          {type === "boolean" ? (
            <TextField
              select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              size="small"
              SelectProps={{
                native: true,
              }}
              disabled={isUpdating}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </TextField>
          ) : (
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              size="small"
              multiline={type === "textarea"}
              rows={type === "textarea" ? 3 : 1}
              type={type === "email" ? "email" : "text"}
              disabled={isUpdating}
              sx={{ minWidth: 200 }}
            />
          )}

          <IconButton
            size="small"
            onClick={handleSave}
            disabled={isUpdating}
            color="primary"
          >
            <CheckIcon />
          </IconButton>

          <IconButton size="small" onClick={handleCancel} disabled={isUpdating}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={1}>
          <Text variant="body1" sx={{ minHeight: "24px" }}>
            {displayValue()}
          </Text>

          {editable && onUpdate && (
            <IconButton
              size="small"
              onClick={handleStartEdit}
              disabled={isLoading}
              sx={{
                opacity: 0.7,
                "&:hover": { opacity: 1 },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};
