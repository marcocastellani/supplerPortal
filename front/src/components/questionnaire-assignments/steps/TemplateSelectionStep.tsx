import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Skeleton,
  Alert,
  Chip,
  Stack,
  Radio,
} from "@mui/material";
import {
  Search as SearchIcon,
  Description as TemplateIcon,
  Language as LanguageIcon,
  Quiz as QuestionIcon,
} from "@mui/icons-material";

import { AssignmentWizardState } from "../AssignmentWizard";
import {
  ActiveTemplateResponse,
  QuestionnaireAssignmentsService,
} from "../../../services/questionnaire-assignments-api";
import { log } from "../../../utils/logger";
import { useDebounce } from "../../../hooks/useDebounce";

interface TemplateSelectionStepProps {
  state: AssignmentWizardState;
  onUpdate: (updates: Partial<AssignmentWizardState>) => void;
}

export const TemplateSelectionStep: React.FC<TemplateSelectionStepProps> = ({
  state,
  onUpdate,
}: TemplateSelectionStepProps) => {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<ActiveTemplateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await QuestionnaireAssignmentsService.getActiveTemplates(
          debouncedSearchTerm || undefined
        );
        setTemplates(result);
      } catch (err) {
        log.error("Failed to load templates", { error: String(err) });
        setError(t("assignments.templates.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [debouncedSearchTerm, t]);

  const handleTemplateSelect = (template: ActiveTemplateResponse) => {
    onUpdate({ selectedTemplate: template });
  };

  const renderTemplateCard = (template: ActiveTemplateResponse) => {
    const isSelected = state.selectedTemplate?.id === template.id;

    return (
      <Grid item xs={12} md={6} key={template.id}>
        <Card
          variant={isSelected ? "outlined" : "elevation"}
          sx={{
            borderColor: isSelected ? "primary.main" : undefined,
            borderWidth: isSelected ? 2 : 1,
          }}
        >
          <CardActionArea onClick={() => handleTemplateSelect(template)}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                <Radio
                  checked={isSelected}
                  color="primary"
                  sx={{ mt: -1, mr: 1 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    <TemplateIcon sx={{ mr: 1, verticalAlign: "middle", fontSize: 20 }} />
                    {template.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t("common.version")}: {template.version}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {template.description}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {template.targetEntityTypes.map((type) => (
                  <Chip
                    key={type}
                    label={t(`entityTypes.${type}`)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  <LanguageIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                  {template.supportedLanguages.join(", ")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <QuestionIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }} />
                  {t("assignments.templates.questionCount", { count: template.questionCount })}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("assignments.templates.selectTitle")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("assignments.templates.selectDescription")}
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t("assignments.templates.searchPlaceholder")}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Templates Grid */}
      {loading && (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && templates.length === 0 && (
        <Alert severity="info">
          {searchTerm
            ? t("assignments.templates.noSearchResults")
            : t("assignments.templates.noTemplates")}
        </Alert>
      )}

      {!loading && !error && templates.length > 0 && (
        <Grid container spacing={3}>
          {templates.map(renderTemplateCard)}
        </Grid>
      )}

      {/* Selected Template Summary */}
      {state.selectedTemplate && (
        <Box sx={{ mt: 3, p: 2, bgcolor: "primary.light", borderRadius: 1 }}>
          <Typography variant="subtitle2">
            {t("assignments.templates.selected")}: <strong>{state.selectedTemplate.title}</strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
};