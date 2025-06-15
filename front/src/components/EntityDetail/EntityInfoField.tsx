import React, { useState, useEffect } from "react";
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
  const [currentValue, setCurrentValue] = useState(value);

  // Sync with prop changes [SF]
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleStartEdit = () => {
    setEditValue(currentValue?.toString() || "");
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
      
      // Update local state immediately for optimistic UI [SF]
      setCurrentValue(finalValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update field:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditValue(currentValue?.toString() || "");
    setIsEditing(false);
  };

  const displayValue = () => {
    if (currentValue === null || currentValue === undefined) return "-";
    if (type === "boolean") {
      return (
        <Chip
          label={currentValue ? "True" : "False"}
          color={currentValue ? "success" : "default"}
          size="small"
          variant="outlined"
          sx={{
            fontSize: "0.8125rem",
            height: "24px",
            "& .MuiChip-label": {
              px: 1.5,
            },
          }}
        />
      );
    }
    return currentValue.toString();
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 2.3fr"
      gap={2}
      sx={{
        py: 1.25,
        px: 2,
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "action.hover",
        },
        transition: "background-color 0.2s ease",
        minHeight: "44px",
        alignItems: "start",
      }}
    >
      {/* Label Section */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          pt: 0.25,
        }}
      >
        {icon && (
          <Box
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              mr: 0.5,
            }}
          >
            {icon}
          </Box>
        )}
        <Text
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            fontSize: "0.875rem",
            lineHeight: 1.3,
          }}
        >
          {label}
        </Text>
      </Box>

      {/* Value Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minHeight: "32px",
        }}
      >
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

            <IconButton
              size="small"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
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
            <Text variant="body1" sx={{ minHeight: "24px" }}>
              {displayValue()}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
