import React from "react";
import { Grid, Box, Typography, Stack, Fade } from "@mui/material";
import { UpcomingQuestionnaireDto } from "../../types/dashboard";
import { QuestionnaireCard } from "./QuestionnaireCard";

interface QuestionnaireGridProps {
  questionnaires: UpcomingQuestionnaireDto[];
  onQuestionnaireAction?: (questionnaire: UpcomingQuestionnaireDto) => void;
}

export const QuestionnaireGrid: React.FC<QuestionnaireGridProps> = ({
  questionnaires,
  onQuestionnaireAction,
}) => {
  const urgentCount = questionnaires.filter(
    (q) => q.daysToDeadline <= 2 || q.isOverdue
  ).length;
  const overdueCount = questionnaires.filter((q) => q.isOverdue).length;

  if (!questionnaires || questionnaires.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          color: "text.secondary",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Nessun questionario trovato
        </Typography>
        <Typography variant="body2">
          Non ci sono questionari in scadenza per i criteri selezionati.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Statistics */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Totale:
            </Typography>
            <Typography variant="h6" color="primary">
              {questionnaires.length}
            </Typography>
          </Box>

          {urgentCount > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Urgenti:
              </Typography>
              <Typography variant="h6" color="warning.main">
                {urgentCount}
              </Typography>
            </Box>
          )}

          {overdueCount > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                In ritardo:
              </Typography>
              <Typography variant="h6" color="error.main">
                {overdueCount}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Grid of Cards */}
      <Grid container spacing={3}>
        {questionnaires.map((questionnaire, index) => (
          <Grid item xs={12} sm={6} lg={4} key={questionnaire.id}>
            <Fade
              in={true}
              timeout={300}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Box>
                <QuestionnaireCard
                  questionnaire={questionnaire}
                  onActionClick={onQuestionnaireAction}
                />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
