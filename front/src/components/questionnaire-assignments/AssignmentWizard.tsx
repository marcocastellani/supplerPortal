import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AssignmentTurnedIn as AssignIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Done as DoneIcon,
} from "@mui/icons-material";

import { TemplateSelectionStep } from "./steps/TemplateSelectionStep";
import { EntitySelectionStep } from "./steps/EntitySelectionStep";
import { AssignmentDetailsStep } from "./steps/AssignmentDetailsStep";
import { ReviewConfirmStep } from "./steps/ReviewConfirmStep";
import { AssignmentResultDialog } from "./AssignmentResultDialog";

import {
  AssignQuestionnaireCommand,
  AssignQuestionnaireResult,
  ActiveTemplateResponse,
  QuestionnaireAssignmentsService,
} from "../../services/questionnaire-assignments-api";
import { log } from "../../utils/logger";

// Wizard state interface
export interface AssignmentWizardState {
  selectedTemplate: ActiveTemplateResponse | null;
  selectedEntityIds: string[];
  dueDate: Date;
  priority: "Low" | "Medium" | "High";
  notes: string;
  sendNotifications: boolean;
}

// Step configuration
interface WizardStep {
  label: string;
  component: React.FC<any>;
  optional?: boolean;
}

export const AssignmentWizard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Wizard state
  const [activeStep, setActiveStep] = useState(0);
  const [wizardState, setWizardState] = useState<AssignmentWizardState>({
    selectedTemplate: null,
    selectedEntityIds: [],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    priority: "Medium",
    notes: "",
    sendNotifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignmentResult, setAssignmentResult] = useState<AssignQuestionnaireResult | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // Step definitions
  const steps: WizardStep[] = [
    {
      label: t("assignments.wizard.steps.selectTemplate"),
      component: TemplateSelectionStep,
    },
    {
      label: t("assignments.wizard.steps.selectEntities"),
      component: EntitySelectionStep,
    },
    {
      label: t("assignments.wizard.steps.setDetails"),
      component: AssignmentDetailsStep,
    },
    {
      label: t("assignments.wizard.steps.reviewConfirm"),
      component: ReviewConfirmStep,
    },
  ];

  // Update state handler
  const updateWizardState = useCallback((updates: Partial<AssignmentWizardState>) => {
    setWizardState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setWizardState({
      selectedTemplate: null,
      selectedEntityIds: [],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      priority: "Medium",
      notes: "",
      sendNotifications: true,
    });
    setAssignmentResult(null);
    setShowResultDialog(false);
  };

  // Submit assignment
  const handleSubmit = async () => {
    if (!wizardState.selectedTemplate) {
      log.error("No template selected");
      return;
    }

    setIsSubmitting(true);

    try {
      const command: AssignQuestionnaireCommand = {
        templateId: wizardState.selectedTemplate.id,
        entityIds: wizardState.selectedEntityIds,
        dueDate: wizardState.dueDate.toISOString(),
        priority: wizardState.priority,
        notes: wizardState.notes || undefined,
        sendNotifications: wizardState.sendNotifications,
      };

      const result = await QuestionnaireAssignmentsService.assignQuestionnaire(command);
      setAssignmentResult(result);
      setShowResultDialog(true);
    } catch (error) {
      log.error("Failed to submit assignment", { error: String(error) });
      // TODO: Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation for current step
  const isStepValid = (): boolean => {
    switch (activeStep) {
      case 0:
        return wizardState.selectedTemplate !== null;
      case 1:
        return wizardState.selectedEntityIds.length > 0;
      case 2:
        return wizardState.dueDate > new Date();
      case 3:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        {/* Wizard Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <AssignIcon sx={{ mr: 2, verticalAlign: "middle" }} />
            {t("assignments.wizard.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("assignments.wizard.description")}
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{ mb: 4 }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              {isMobile && (
                <StepContent>
                  <Box sx={{ mt: 2 }}>
                    <CurrentStepComponent
                      state={wizardState}
                      onUpdate={updateWizardState}
                    />
                  </Box>
                </StepContent>
              )}
            </Step>
          ))}
        </Stepper>

        {/* Step Content (Desktop) */}
        {!isMobile && (
          <Box sx={{ mt: 4, mb: 4 }}>
            <CurrentStepComponent state={wizardState} onUpdate={updateWizardState} />
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<BackIcon />}
          >
            {t("common.back")}
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                startIcon={<DoneIcon />}
              >
                {isSubmitting
                  ? t("assignments.wizard.submitting")
                  : t("assignments.wizard.confirm")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!isStepValid()}
                endIcon={<NextIcon />}
              >
                {t("common.next")}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Results Dialog */}
      {assignmentResult && (
        <AssignmentResultDialog
          open={showResultDialog}
          onClose={() => setShowResultDialog(false)}
          result={assignmentResult}
          onNewAssignment={handleReset}
          onViewAssignments={() => navigate("/questionnaires")}
        />
      )}
    </Box>
  );
};