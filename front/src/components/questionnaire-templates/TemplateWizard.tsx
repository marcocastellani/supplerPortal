import React, { useState } from 'react';
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
  Snackbar
} from '@mui/material';
import { useTemplateWizard } from '../../hooks/useTemplateWizard';
import { WizardStep } from '../../types/questionnaire-templates';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { SectionsStep } from './steps/SectionsStep';
import { QuestionsStep } from './steps/QuestionsStep';
import { ConditionsStep } from './steps/ConditionsStep';
import { ReviewStep } from './steps/ReviewStep';

interface TemplateWizardProps {
  templateId?: string;
  onComplete?: (templateId: string) => void;
  onCancel?: () => void;
}

const stepLabels = {
  [WizardStep.BasicInfo]: 'Basic Information',
  [WizardStep.Sections]: 'Sections',
  [WizardStep.Questions]: 'Questions',
  [WizardStep.Conditions]: 'Conditional Logic',
  [WizardStep.Review]: 'Review & Publish'
};

export const TemplateWizard: React.FC<TemplateWizardProps> = ({
  templateId,
  onComplete,
  onCancel
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const {
    state,
    isLoading,
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
    getStepErrors
  } = useTemplateWizard({
    templateId,
    onSave: () => {
      setSnackbarMessage('Template saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep();
    }
  };

  const handlePublish = async () => {
    try {
      await publishTemplate();
      onComplete?.(templateId!);
      setSnackbarMessage('Template published successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Failed to publish template');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraft();
    } catch (error) {
      setSnackbarMessage(error instanceof Error ? error.message : 'Failed to save draft');
      setSnackbarSeverity('error');
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
            onPublish={handlePublish}
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {templateId ? 'Edit Template' : 'Create New Template'}
          </Typography>
          
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
          <Stepper activeStep={steps.indexOf(currentStep)} sx={{ mb: 4 }}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel
                  onClick={() => goToStep(step)}
                  sx={{ cursor: 'pointer' }}
                  error={getStepErrors(step).length > 0}
                >
                  {stepLabels[step]}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Box sx={{ minHeight: 400, mb: 4 }}>
            {renderCurrentStep()}
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              {templateId && (
                <Button
                  variant="outlined"
                  onClick={handleSaveDraft}
                  disabled={!state.isDirty}
                  sx={{ mr: 2 }}
                >
                  Save Draft
                </Button>
              )}
              
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
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
