import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
  Grid,
} from "@mui/material";
import {
  QuestionnaireTemplate,
  CertificateType,
} from "../../../types/questionnaire-templates";

interface BasicInfoStepProps {
  templateData: Partial<QuestionnaireTemplate>;
  onUpdate: (data: Partial<QuestionnaireTemplate>) => void;
  errors: string[];
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  templateData,
  onUpdate,
  errors,
}) => {
  const handleFieldChange = (
    field: keyof QuestionnaireTemplate,
    value: any
  ) => {
    onUpdate({ [field]: value });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Basic Template Information
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Provide the essential information about your questionnaire template.
      </Typography>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Template Title"
            value={templateData.title || ""}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            required
            helperText="A clear, descriptive title for your questionnaire template"
            error={errors.some(
              (e) => e.includes("title") || e.includes("Title")
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={templateData.description || ""}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            required
            helperText="Describe the purpose and scope of this questionnaire"
            error={errors.some(
              (e) => e.includes("description") || e.includes("Description")
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Primary Language</InputLabel>
            <Select
              value={templateData.primaryLanguage || "en"}
              onChange={(e) =>
                handleFieldChange("primaryLanguage", e.target.value)
              }
              label="Primary Language"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="it">Italian</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Expiration (Months)"
            value={templateData.expirationMonths || 12}
            onChange={(e) =>
              handleFieldChange(
                "expirationMonths",
                parseInt(e.target.value) || 12
              )
            }
            required
            inputProps={{ min: 1, max: 120 }}
            helperText="How long questionnaire responses remain valid"
            error={errors.some(
              (e) => e.includes("expiration") || e.includes("Expiration")
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Certificate Type</InputLabel>
            <Select
              value={
                templateData.certificateType || CertificateType.SelfAssessment
              }
              onChange={(e) =>
                handleFieldChange(
                  "certificateType",
                  e.target.value as CertificateType
                )
              }
              label="Certificate Type"
            >
              <MenuItem value={CertificateType.SelfAssessment}>
                Self Assessment
              </MenuItem>
              <MenuItem value={CertificateType.InspectorRequired}>
                Inspector Required
              </MenuItem>
              <MenuItem value={CertificateType.Both}>Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            required
            error={errors.some(
              (e) => e.includes("target") || e.includes("entity")
            )}
          >
            <InputLabel>Target Entity Type</InputLabel>
            <Select
              value={templateData.targetEntityTypeId || 1}
              onChange={(e) =>
                handleFieldChange("targetEntityTypeId", e.target.value)
              }
              label="Target Entity Type"
            >
              <MenuItem value={1}>Supplier</MenuItem>
              <MenuItem value={2}>Sub-Supplier</MenuItem>
              <MenuItem value={3}>Site/Facility</MenuItem>
              <MenuItem value={4}>Person/Contact</MenuItem>
              <MenuItem value={5}>Company Group</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: "0.75rem" }}
          >
            Select the type of supply network entity this questionnaire template
            is designed for
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
