import React, { useState } from "react";
import { Container, Grid, Text, Card, Button } from "@remira/unifiedui";
import { Box, LinearProgress } from "@mui/material";
import { PageHeader } from "../LayoutComponents";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

interface WizardStepProps {
  title: string;
  children: React.ReactNode;
  isValid?: boolean; // Add validation prop
}

interface FormWizardProps {
  children: React.ReactElement<WizardStepProps>[];
  onComplete: () => void;
  isLoading?: boolean; // Add loading state
}

/**
 * WizardStep component for encapsulating form wizard steps [SF]
 */
export const WizardStep: React.FC<WizardStepProps> = ({ children }) => {
  return <>{children}</>;
};

/**
 * FormWizard component using UnifiedUI components and design tokens [DRY][SF]
 *
 * @param children - Array of WizardStep components
 * @param onComplete - Callback when wizard is completed
 * @param isLoading - Loading state for form submission
 * @returns JSX.Element
 */
export const FormWizard: React.FC<FormWizardProps> = ({
  children,
  onComplete,
  isLoading = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = React.Children.map(children, (child, index) => ({
    label: child.props.title,
    isValid: child.props.isValid !== false, // Default to true if not specified
    content: <div key={index}>{child.props.children}</div>,
    completed: index < currentStep,
    handleStepForward:
      index === children.length - 1
        ? onComplete
        : () =>
            setCurrentStep((prev) => Math.min(prev + 1, children.length - 1)),
    handleStepBack: () => setCurrentStep((prev) => Math.max(prev - 1, 0)),
    disablePrevious: index === 0,
    buttonNextLabel:
      index === children.length - 1 ? "Confirm and Save" : "Next",
    buttonBackLabel: "Back",
  }));

  // ✅ Calculate progress using design system approach [SF]
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 2 }}>
        <Grid item xs={12}>
          <PageHeader
            title="Create Supply Network Entity"
            subtitle="Add a new supplier, sub-supplier, site, person, or company group to your network"
            icon={<AddBusinessIcon color="primary" />}
          />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            {steps && steps[currentStep] && (
              <Box>
                {/* Step header with design system compliant styling */}
                <Box sx={{ mb: 3 }}>
                  <Text variant="h5" sx={{ mb: 1 }}>
                    Step {currentStep + 1} of {steps.length}:{" "}
                    {steps[currentStep].label}
                  </Text>

                  {/* ✅ Using Material-UI LinearProgress with design tokens [DRY][SF] */}
                  <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{
                      mt: 2,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "grey.200", // ✅ Design token instead of #e0e0e0 [CMV]
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "primary.main", // ✅ Design token instead of #1976d2 [CMV]
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>

                {/* Step content */}
                <Box sx={{ mb: 3 }}>{steps[currentStep].content}</Box>

                {/* ✅ Navigation buttons using UnifiedUI Button components [DRY] */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Box>
                    {currentStep > 0 && (
                      <Button
                        variant="outlined"
                        onClick={steps[currentStep].handleStepBack}
                        disabled={isLoading}
                        size="medium"
                        label={steps[currentStep].buttonBackLabel || "Back"}
                      />
                    )}
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={steps[currentStep].handleStepForward}
                      disabled={isLoading || !steps[currentStep].isValid}
                      size="medium"
                      label={
                        isLoading && currentStep === children.length - 1
                          ? "Creating..."
                          : steps[currentStep].buttonNextLabel || "Next"
                      }
                      startIcon={
                        isLoading && currentStep === children.length - 1
                          ? "⏳"
                          : undefined
                      }
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
