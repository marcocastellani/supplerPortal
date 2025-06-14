import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Text,
  Card
} from '@remira/unifiedui';

interface WizardStepProps {
  title: string;
  children: React.ReactNode;
}

interface FormWizardProps {
  children: React.ReactElement<WizardStepProps>[];
  onComplete: () => void;
}

export const WizardStep: React.FC<WizardStepProps> = ({ children }) => {
  return <>{children}</>;
};

export const FormWizard: React.FC<FormWizardProps> = ({ 
  children,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = React.Children.map(children, (child, index) => ({
    label: child.props.title,
    content: (
      <div key={index}>
        {child.props.children}
      </div>
    ),
    completed: index < currentStep,
    handleStepForward: index === children.length - 1 ? onComplete : () => setCurrentStep(prev => Math.min(prev + 1, children.length - 1)),
    handleStepBack: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
    disablePrevious: index === 0,
    buttonNextLabel: index === children.length - 1 ? 'Confirm and Save' : 'Next',
    buttonBackLabel: 'Back'
  }));

  return (
    <Container type="page">
      <Grid container rowSpacing={3} sx={{ paddingTop: 2 }}>
        <Grid item xs={12}>
          <Text variant="h3">Create Supply Network Entity</Text>
          <Text variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Add a new supplier, sub-supplier, site, person, or company group to your network
          </Text>
        </Grid>
        
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            {steps && steps[currentStep] && (
              <div>
                {/* Step header */}
                <div style={{ marginBottom: '24px' }}>
                  <Text variant="h5" sx={{ mb: 1 }}>
                    Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
                  </Text>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginTop: '16px' 
                  }}>
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          height: '4px',
                          backgroundColor: index <= currentStep ? '#1976d2' : '#e0e0e0',
                          borderRadius: '2px'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Step content */}
                <div style={{ marginBottom: '24px' }}>
                  {steps[currentStep].content}
                </div>
                
                {/* Navigation buttons */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '32px'
                }}>
                  <div>
                    {currentStep > 0 && steps[currentStep].handleStepBack && (
                      <button
                        type="button"
                        onClick={steps[currentStep].handleStepBack}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'transparent',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {steps[currentStep].buttonBackLabel || 'Back'}
                      </button>
                    )}
                  </div>
                  <div>
                    {steps[currentStep].handleStepForward && (
                      <button
                        type="button"
                        onClick={steps[currentStep].handleStepForward}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#1976d2',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {steps[currentStep].buttonNextLabel || 'Next'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
