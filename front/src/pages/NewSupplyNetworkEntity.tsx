import React, { useEffect, useCallback, useMemo } from "react";
import {
  FormWizard,
  WizardStep,
} from "../components/SupplyNetworkEntities/FormWizard";
import { EntityTypeRoleStep } from "../components/SupplyNetworkEntities/FormSteps/EntityTypeRoleStep";
import { GeneralInfoStep } from "../components/SupplyNetworkEntities/FormSteps/GeneralInfoStep";
import { StatusContactStep } from "../components/SupplyNetworkEntities/FormSteps/StatusContactStep";
import { ReviewSubmitStep } from "../components/SupplyNetworkEntities/FormSteps/ReviewSubmitStep";
import { useFormValidation } from "../hooks/useFormValidation";
import { useEntityEnums } from "../hooks/useEntityEnums";
import { useNewEntityForm } from "../hooks/useNewEntityForm";
import { useEntitySubmission } from "../hooks/useEntitySubmission";
import { LoadingState, SuccessState } from "../components/NewEntity";
import { ErrorNotification } from "../components/ErrorNotification";
import { TIMING } from "../constants/ui";

const NewSupplyNetworkEntity: React.FC = () => {
  // Custom hooks for state management
  const { enumValues, defaultValues, isLoading: enumsLoading, error: enumsError } = useEntityEnums();
  const { fieldErrors, validationInProgress, handleFieldBlur, getInputStyle, getHelperText, setFieldErrors } = useFormValidation();
  
  const {
    formData,
    selectedParent,
    tagsInputValue,
    handleInputChange,
    handleParentChange,
    setTagsInputValue,
    resetForm,
    validateStep1,
    validateStep2,
    validateStep3,
  } = useNewEntityForm(defaultValues || undefined, fieldErrors);

  const {
    isLoading: submissionLoading,
    isSuccess,
    error: submissionError,
    errorType,
    submitEntity,
    clearError,
  } = useEntitySubmission();

  // Initialize form with default values when they become available
  useEffect(() => {
    if (defaultValues) {
      resetForm(defaultValues);
    }
  }, [defaultValues, resetForm]);

  // Memoized form submission handler [PA]
  const handleSubmit = useCallback(async () => {
    await submitEntity(formData);
    // Reset form after successful submission
    if (defaultValues) {
      setTimeout(() => {
        resetForm(defaultValues);
      }, TIMING.SUCCESS_MESSAGE_DURATION);
    }
  }, [submitEntity, formData, defaultValues, resetForm]);

  // Memoized input change handler with error clearing [PA]
  const handleInputChangeWithErrorClear = useCallback((field: keyof typeof formData, value: any) => {
    handleInputChange(field, value);
    clearError(); // Clear submission errors when user starts typing
  }, [handleInputChange, clearError]);

  // Memoized loading state check [PA]
  const isLoadingState = useMemo(() => 
    enumsLoading || !enumValues
  , [enumsLoading, enumValues]);

  // Memoized wizard steps [PA]
  const wizardSteps = useMemo(() => [
    {
      title: "Entity Type & Role",
      isValid: validateStep1(),
      component: (
        <EntityTypeRoleStep
          formData={formData}
          enumValues={enumValues!}
          onInputChange={handleInputChangeWithErrorClear}
          selectedParent={selectedParent}
          onParentChange={handleParentChange}
        />
      )
    },
    {
      title: "General Information",
      isValid: validateStep2(),
      component: (
        <GeneralInfoStep
          formData={formData}
          fieldErrors={fieldErrors}
          validationInProgress={validationInProgress}
          onInputChange={handleInputChangeWithErrorClear}
          onFieldBlur={handleFieldBlur}
          getHelperText={getHelperText}
          getInputStyle={getInputStyle}
          setFieldErrors={setFieldErrors}
        />
      )
    },
    {
      title: "Status & Contact",
      isValid: validateStep3(),
      component: (
        <StatusContactStep
          formData={formData}
          enumValues={enumValues!}
          tagsInputValue={tagsInputValue}
          setTagsInputValue={setTagsInputValue}
          onInputChange={handleInputChangeWithErrorClear}
        />
      )
    },
    {
      title: "Review & Submit",
      isValid: true,
      component: (
        <ReviewSubmitStep
          formData={formData}
          isLoading={submissionLoading}
          error={submissionError}
          errorType={errorType}
          onSubmit={handleSubmit}
          onClearError={clearError}
        />
      )
    }
  ], [
    validateStep1, validateStep2, validateStep3,
    formData, enumValues, selectedParent, fieldErrors, validationInProgress,
    tagsInputValue, submissionLoading, submissionError, errorType,
    handleInputChangeWithErrorClear, handleParentChange, handleFieldBlur,
    getHelperText, getInputStyle, setFieldErrors, setTagsInputValue,
    handleSubmit, clearError
  ]);

  // Loading state
  if (isLoadingState) {
    return <LoadingState error={enumsError} />;
  }

  // Success state
  if (isSuccess) {
    return <SuccessState />;
  }

  // Main form
  return (
    <FormWizard onComplete={handleSubmit} isLoading={submissionLoading}>
      {wizardSteps.map((step, index) => (
        <WizardStep key={index} title={step.title} isValid={step.isValid}>
          {step.component}
        </WizardStep>
      ))}
    </FormWizard>
  );
};

// Memoize the component to prevent unnecessary re-renders [PA]
export default React.memo(NewSupplyNetworkEntity);
