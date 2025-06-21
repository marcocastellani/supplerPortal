import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTemplateWizard } from "../../hooks/useTemplateWizard";
import { WizardStep } from "../../types/questionnaire-templates";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { SectionsStep } from "./steps/SectionsStep";
import { QuestionsStep } from "./steps/QuestionsStep";
import { ConditionsStep } from "./steps/ConditionsStep";
import { ReviewStep } from "./steps/ReviewStep";

interface TemplateWizardProps {
  templateId?: string;
  onComplete?: (templateId: string) => void;
  onCancel?: () => void;
}

const stepLabels = {
  [WizardStep.BasicInfo]: "Basic Information",
  [WizardStep.Sections]: "Sections",
  [WizardStep.Questions]: "Questions",
  [WizardStep.Conditions]: "Conditional Logic",
  [WizardStep.Review]: "Review & Publish",
};

export const TemplateWizard: React.FC<TemplateWizardProps> = ({
  templateId,
  onComplete,
  onCancel,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);

  const {
    state,
    isLoading,
    currentTemplateId,
    currentStep,
    canGoNext,
    canGoPrevious,
    nextStep,
    previousStep,
    goToStep,
    updateTemplateData,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    addCondition,
    updateCondition,
    deleteCondition,
    saveDraft,
    publishTemplate,
    validateCurrentStep,
    getStepErrors,
  } = useTemplateWizard({
    templateId,
    autoSave: { enabled: autoSaveEnabled },
    onSave: () => {
      setSnackbarMessage("Template saved successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    },
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handlePublish = async () => {
    try {
      await publishTemplate();
      onComplete?.(currentTemplateId!);
      setSnackbarMessage("Template published successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      let errorMessage = "Failed to publish template";

      // Handle specific error types
      if (error?.response?.status === 404) {
        errorMessage =
          "Publish endpoint not available yet. This feature is currently under development.";
      } else if (error?.response?.status === 400) {
        errorMessage =
          error?.response?.data?.error ||
          "Template validation failed. Please check all required fields.";
      } else if (error?.response?.status === 500) {
        errorMessage =
          "Server error occurred while publishing. Please try again later.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraft();
    } catch (error) {
      setSnackbarMessage(
        error instanceof Error ? error.message : "Failed to save draft"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case WizardStep.BasicInfo:
        return (
          <BasicInfoStep
            templateData={state.templateData}
            onUpdate={updateTemplateData}
            errors={getStepErrors(WizardStep.BasicInfo)}
          />
        );
      case WizardStep.Sections:
        return (
          <SectionsStep
            sections={state.sections}
            onAdd={addSection}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onReorder={reorderSections}
            errors={getStepErrors(WizardStep.Sections)}
          />
        );
      case WizardStep.Questions:
        return (
          <QuestionsStep
            questions={state.questions}
            sections={state.sections}
            onAdd={addQuestion}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
            onReorder={reorderQuestions}
            errors={getStepErrors(WizardStep.Questions)}
          />
        );
      case WizardStep.Conditions:
        return (
          <ConditionsStep
            conditions={state.conditions}
            questions={state.questions}
            sections={state.sections}
            onAdd={addCondition}
            onUpdate={updateCondition}
            onDelete={deleteCondition}
            errors={getStepErrors(WizardStep.Conditions)}
          />
        );
      case WizardStep.Review:
        return (
          <ReviewStep
            templateData={state.templateData}
            sections={state.sections}
            questions={state.questions}
            conditions={state.conditions}
            errors={getStepErrors(WizardStep.Review)}
          />
        );
      default:
        return null;
    }
  };

  const steps = Object.values(WizardStep);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{ maxWidth: 1200, width: "100%", mx: "auto", p: { xs: 2, md: 3 } }}
    >
      <Card elevation={1}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              {currentTemplateId ? "Edit Template" : "Create New Template"}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label="Auto-save"
              sx={{ m: 0 }}
            />
          </Box>

          {/* Auto-save indicator */}
          {state.isAutoSaving && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Auto-saving changes...
            </Alert>
          )}

          {state.lastSaved && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Last saved: {new Date(state.lastSaved).toLocaleString()}
            </Typography>
          )}

          {/* Stepper */}
          <Stepper
            activeStep={steps.indexOf(currentStep)}
            sx={{
              mb: 4,
              px: { xs: 1, md: 2 },
              width: "100%",
              "& .MuiStepperHorizontal-root": {
                width: "100%",
              },
              "& .MuiStep-root": {
                flex: "1 1 0px !important", // Force equal flex basis
                minWidth: "0 !important",
                maxWidth: "none !important",
                width: `${100 / steps.length}% !important`, // Force equal width
                padding: "0 !important",
                margin: "0 !important",
                display: "flex !important",
                justifyContent: "center !important",
              },
              "& .MuiStepLabel-root": {
                textAlign: "center !important",
                flexDirection: "column !important",
                width: "100% !important",
                minWidth: "0 !important",
                padding: "8px 4px !important",
                margin: "0 !important",
                "& .MuiStepLabel-labelContainer": {
                  width: "100% !important",
                  justifyContent: "center !important",
                  display: "flex !important",
                  margin: "0 !important",
                },
              },
              "& .MuiStepLabel-label": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: "400 !important",
                whiteSpace: "nowrap !important",
                overflow: "hidden !important",
                textOverflow: "ellipsis !important",
                width: "100% !important",
                textAlign: "center !important",
                margin: "0 !important",
              },
              "& .MuiStepConnector-root": {
                flex: "0 0 16px !important",
                minWidth: "16px !important",
                maxWidth: "16px !important",
                width: "16px !important",
                margin: "0 !important",
                padding: "0 !important",
              },
              "& .MuiStepConnector-line": {
                minHeight: "1px !important",
                borderTopWidth: "1px !important",
              },
            }}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel
                  onClick={() => goToStep(step)}
                  sx={{
                    cursor: "pointer",
                  }}
                  error={getStepErrors(step).length > 0}
                >
                  {stepLabels[step]}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ minHeight: 400, mb: 4 }}>{renderCurrentStep()}</Box>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              {canGoPrevious && (
                <Button onClick={previousStep} sx={{ mr: 2 }}>
                  Previous
                </Button>
              )}
              <Button onClick={onCancel} color="secondary">
                Cancel
              </Button>
            </Box>

            <Box>
              <Button
                variant="outlined"
                onClick={handleSaveDraft}
                disabled={!state.isDirty || state.isAutoSaving}
                sx={{ mr: 2 }}
              >
                Save Draft
              </Button>

              {canGoNext ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={getStepErrors(currentStep).length > 0}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePublish}
                  disabled={getStepErrors(currentStep).length > 0}
                >
                  Publish Template
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
