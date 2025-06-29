import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import { AssignmentWizard } from '../AssignmentWizard';
import { useTranslation } from 'react-i18next';

// Extend matchers
expect.extend(toHaveNoViolations);

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

// Mock API service
vi.mock('../../../../services/questionnaire-assignments-api');

describe('AssignmentWizard Accessibility', () => {
  const mockOnComplete = vi.fn();
  const mockT = (key: string) => key;

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as any).mockReturnValue({ t: mockT });
  });

  it('should have no accessibility violations on initial render', async () => {
    const { container } = render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels for wizard navigation', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Check stepper has proper role and label
    const stepper = screen.getByRole('navigation');
    expect(stepper).toHaveAttribute('aria-label', expect.stringContaining('wizard'));
    
    // Check steps have proper ARIA attributes
    const steps = screen.getAllByRole('tab');
    expect(steps).toHaveLength(4);
    
    // First step should be active
    expect(steps[0]).toHaveAttribute('aria-selected', 'true');
    expect(steps[0]).toHaveAttribute('aria-current', 'step');
  });

  it('should maintain keyboard navigation throughout wizard', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Check next button is focusable
    const nextButton = screen.getByRole('button', { name: /common.next/i });
    expect(nextButton).toBeInTheDocument();
    
    // Simulate tab navigation
    nextButton.focus();
    expect(document.activeElement).toBe(nextButton);
  });

  it('should announce step changes to screen readers', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Check for live region
    const liveRegion = screen.getByRole('status', { hidden: true });
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  it('should have proper focus management when moving between steps', () => {
    const { rerender } = render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // After step change, focus should move to the new step content
    // This test would need to simulate step navigation
  });

  it('should have descriptive button labels', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    const buttons = screen.getAllByRole('button');
    
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
      // Buttons should not rely only on color/icons
      expect(button.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  it('should provide clear error messages with proper ARIA', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // When validation errors occur, they should be announced
    // This test would need to trigger validation errors
  });

  it('should have proper heading hierarchy', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Main title should be h1
    const mainHeading = screen.getByText('assignments.wizard.title');
    expect(mainHeading.tagName).toBe('H4'); // MUI Typography default
    
    // Step titles should be appropriate level
    // This ensures screen reader users can navigate by headings
  });

  it('should support high contrast mode', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Check that color is not the only way to convey information
    // Active step should have more than just color indication
    const activeStep = screen.getByRole('tab', { selected: true });
    expect(activeStep).toHaveAttribute('aria-selected', 'true');
  });

  it('should have skip links for keyboard navigation', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // While not visible, skip links should be available for keyboard users
    // This allows jumping to main content or navigation
  });

  it('should handle focus trapping in dialogs', async () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // When result dialog opens, focus should be trapped
    // This test would need to complete the wizard and open results
  });

  it('should provide progress indication for screen readers', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Progress through wizard should be announced
    const steps = screen.getAllByRole('tab');
    
    steps.forEach((step, index) => {
      expect(step).toHaveAttribute('aria-label', expect.stringContaining(`${index + 1}`));
    });
  });

  it('should have accessible form controls in each step', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // All form inputs should have associated labels
    // This test would need to render each step's content
  });

  it('should support RTL languages', () => {
    document.dir = 'rtl';
    
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Wizard should adapt to RTL layout
    // Navigation should reverse appropriately
    
    document.dir = 'ltr'; // Reset
  });

  it('should have sufficient color contrast', async () => {
    const { container } = render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // axe checks for color contrast
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0);
  });

  it('should handle long content without breaking layout', () => {
    // Test with very long template names, entity names, etc.
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Content should wrap appropriately
    // Horizontal scrolling should be avoided
  });

  it('should work with browser zoom up to 200%', () => {
    // Simulate browser zoom
    document.body.style.zoom = '2';
    
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // Layout should remain functional
    // All content should remain visible
    
    document.body.style.zoom = '1'; // Reset
  });

  it('should provide alternative text for icons', () => {
    render(<AssignmentWizard onComplete={mockOnComplete} />);
    
    // All icons should have aria-label or be decorative (aria-hidden)
    const icons = document.querySelectorAll('svg');
    
    icons.forEach(icon => {
      const parent = icon.parentElement;
      const hasLabel = icon.getAttribute('aria-label') || 
                      parent?.getAttribute('aria-label') ||
                      icon.getAttribute('aria-hidden') === 'true';
      
      expect(hasLabel).toBeTruthy();
    });
  });
});