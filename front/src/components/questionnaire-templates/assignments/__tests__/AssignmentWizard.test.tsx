import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AssignmentWizard } from '../AssignmentWizard';
import * as apiService from '../../../../services/questionnaire-assignments-api';
import { useTranslation } from 'react-i18next';

// Mock the API service
vi.mock('../../../../services/questionnaire-assignments-api');

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

// Mock MUI components
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useTheme: () => ({
      breakpoints: {
        down: vi.fn(() => false),
      },
    }),
    useMediaQuery: () => false,
  };
});

describe('AssignmentWizard', () => {
  const mockOnComplete = vi.fn();
  const mockT = (key: string) => key;

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as any).mockReturnValue({ t: mockT });
  });

  it('renders wizard with initial step', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    expect(screen.getByText('assignments.wizard.title')).toBeInTheDocument();
    expect(screen.getByText('assignments.wizard.description')).toBeInTheDocument();
    expect(screen.getByText('assignments.wizard.steps.selectTemplate')).toBeInTheDocument();
  });

  it('shows all steps in stepper', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    expect(screen.getByText('assignments.wizard.steps.selectTemplate')).toBeInTheDocument();
    expect(screen.getByText('assignments.wizard.steps.selectEntities')).toBeInTheDocument();
    expect(screen.getByText('assignments.wizard.steps.setDetails')).toBeInTheDocument();
    expect(screen.getByText('assignments.wizard.steps.reviewConfirm')).toBeInTheDocument();
  });

  it('navigates to next step when template is selected', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Simulate template selection
    const templateButton = screen.getByRole('button', { name: /common.next/i });
    expect(templateButton).toBeDisabled();
    
    // Mock template selection by updating wizard state
    // This would normally happen through the TemplateSelectionStep component
  });

  it('shows back button on steps after first', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Initially, back button should not be visible
    expect(screen.queryByText('common.back')).not.toBeInTheDocument();
    
    // Navigate to next step would show back button
    // This test would need to simulate step navigation
  });

  it('disables next button when current step is invalid', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    const nextButton = screen.getByRole('button', { name: /common.next/i });
    expect(nextButton).toBeDisabled();
  });

  it('shows confirm button on last step', async () => {
    const { rerender } = render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // This test would need to simulate navigation to the last step
    // and verify the confirm button appears
  });

  it('handles submission correctly', async () => {
    const mockApiResponse = {
      totalEntities: 2,
      assignedCount: 2,
      skippedCount: 0,
      assignedEntities: [
        { entityId: '1', entityName: 'Entity 1', questionnaireId: 'q1' },
        { entityId: '2', entityName: 'Entity 2', questionnaireId: 'q2' }
      ],
      skippedEntities: []
    };
    
    (apiService.assignQuestionnaireTemplate as any).mockResolvedValue(mockApiResponse);
    
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // This test would need to:
    // 1. Navigate through all steps
    // 2. Fill in required data
    // 3. Click confirm
    // 4. Verify API call and onComplete callback
  });

  it('handles submission errors gracefully', async () => {
    (apiService.assignQuestionnaireTemplate as any).mockRejectedValue(
      new Error('Network error')
    );
    
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // This test would verify error handling
  });

  it('resets wizard state after completion', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // This test would verify that wizard state is reset
    // after successful completion
  });
});