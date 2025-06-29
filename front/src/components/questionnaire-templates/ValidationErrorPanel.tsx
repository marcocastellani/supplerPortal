import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ErrorOutline,
  Warning,
} from "@mui/icons-material";

export interface ValidationError {
  isValid: boolean;
  errors: string[];
  message: string;
}

interface ValidationErrorPanelProps {
  validationError: ValidationError | null;
  onClose: () => void;
}

export const ValidationErrorPanel: React.FC<ValidationErrorPanelProps> = ({
  validationError,
  onClose,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  if (!validationError || validationError.isValid) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity="error"
        onClose={onClose}
        sx={{
          "& .MuiAlert-message": {
            width: "100%",
          },
        }}
      >
        <AlertTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="span">
              Template Validation Failed
            </Typography>
            {validationError.errors.length > 1 && (
              <IconButton
                size="small"
                onClick={() => setExpanded(!expanded)}
                sx={{ ml: 1 }}
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </Box>
        </AlertTitle>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {validationError.message}
        </Typography>

        {validationError.errors.length === 1 ? (
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <ErrorOutline sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{validationError.errors[0]}</Typography>
          </Box>
        ) : (
          <Collapse in={expanded}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Issues found ({validationError.errors.length}):
            </Typography>
            <List dense sx={{ pl: 0 }}>
              {validationError.errors.map((error, index) => (
                <ListItem key={index} sx={{ pl: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Warning color="error" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={error}
                    primaryTypographyProps={{
                      variant: "body2",
                      sx: { wordBreak: "break-word" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}

        <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
          Please fix these issues before publishing the template.
        </Typography>
      </Alert>
    </Box>
  );
};
