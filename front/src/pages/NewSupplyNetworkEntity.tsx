import React, { useEffect } from "react";
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

export const NewSupplyNetworkEntity = () => {
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

  // Handle form submission
  const handleSubmit = async () => {
    await submitEntity(formData);
    // Reset form after successful submission
    if (defaultValues) {
      setTimeout(() => {
        resetForm(defaultValues);
      }, 3000);
    }
  };

  // Handle input changes with error clearing
  const handleInputChangeWithErrorClear = (field: keyof typeof formData, value: any) => {
    handleInputChange(field, value);
    clearError(); // Clear submission errors when user starts typing
  };

  // Loading state
  if (enumsLoading || !enumValues) {
    return <LoadingState error={enumsError} />;
  }

  // Success state
  if (isSuccess) {
    return <SuccessState />;
  }

  // Main form
  return (
    <FormWizard onComplete={handleSubmit} isLoading={submissionLoading}>
      {/* Step 1: Entity Type & Role */}
      <WizardStep title="Entity Type & Role" isValid={validateStep1()}>
        <EntityTypeRoleStep
          formData={formData}
          enumValues={enumValues}
          onInputChange={handleInputChangeWithErrorClear}
          selectedParent={selectedParent}
          onParentChange={handleParentChange}
        />
      </WizardStep>

      {/* Step 2: General Information */}
      <WizardStep title="General Information" isValid={validateStep2()}>
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
      </WizardStep>

      {/* Step 3: Status & Contact */}
      <WizardStep title="Status & Contact" isValid={validateStep3()}>
        <StatusContactStep
          formData={formData}
          enumValues={enumValues}
          tagsInputValue={tagsInputValue}
          setTagsInputValue={setTagsInputValue}
          onInputChange={handleInputChangeWithErrorClear}
        />
      </WizardStep>

      {/* Step 4: Review & Submit */}
      <WizardStep title="Review & Submit" isValid={true}>
        <ReviewSubmitStep
          formData={formData}
          isLoading={submissionLoading}
          error={submissionError}
          errorType={errorType}
          onSubmit={handleSubmit}
          onClearError={clearError}
        />
      </WizardStep>
    </FormWizard>
  );
};
