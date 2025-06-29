import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AssignmentDetailsStep } from '../AssignmentDetailsStep';
import { useTranslation } from 'react-i18next';
import { addDays, format } from 'date-fns';

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

// Mock date-fns to have consistent dates in tests
vi.mock('date-fns', () => ({
  addDays: vi.fn((date, days) => new Date(2024, 5, 22 + days)),
  format: vi.fn((date) => date.toLocaleDateString()),
  differenceInDays: vi.fn(() => 30),
}));

describe('AssignmentDetailsStep', () => {
  const mockOnUpdate = vi.fn();
  const mockT = (key: string) => key;
  
  const defaultDetails = {
    dueDate: null,
    priority: 'Medium' as const,
    notes: '',
    sendNotifications: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as any).mockReturnValue({ t: mockT });
  });

  it('renders assignment details form correctly', () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    expect(screen.getByText('assignments.details.title')).toBeInTheDocument();
    expect(screen.getByText('assignments.details.description')).toBeInTheDocument();
    expect(screen.getByLabelText('assignments.details.dueDate')).toBeInTheDocument();
    expect(screen.getByLabelText('assignments.details.priority')).toBeInTheDocument();
    expect(screen.getByLabelText('assignments.details.notes')).toBeInTheDocument();
  });

  it('updates due date when changed', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const dateInput = screen.getByLabelText('assignments.details.dueDate');
    const newDate = new Date(2024, 6, 15);
    
    fireEvent.change(dateInput, { target: { value: '2024-07-15' } });
    
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...defaultDetails,
        dueDate: expect.any(Date)
      });
    });
  });

  it('validates due date is in the future', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const dateInput = screen.getByLabelText('assignments.details.dueDate');
    const pastDate = new Date(2024, 0, 1);
    
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });
    fireEvent.blur(dateInput);
    
    await waitFor(() => {
      expect(screen.getByText('assignments.details.dueDateError')).toBeInTheDocument();
    });
  });

  it('updates priority when changed', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const prioritySelect = screen.getByLabelText('assignments.details.priority');
    fireEvent.mouseDown(prioritySelect);
    
    const highPriorityOption = await screen.findByText('assignments.details.priorityHigh');
    fireEvent.click(highPriorityOption);
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...defaultDetails,
      priority: 'High'
    });
  });

  it('updates notes when typed', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const notesInput = screen.getByLabelText('assignments.details.notes');
    const testNotes = 'Please complete by end of month';
    
    fireEvent.change(notesInput, { target: { value: testNotes } });
    
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        ...defaultDetails,
        notes: testNotes
      });
    });
  });

  it('enforces notes character limit', async () => {
    const longNotes = 'a'.repeat(1001);
    
    render(
      <AssignmentDetailsStep 
        details={{ ...defaultDetails, notes: longNotes }}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    expect(screen.getByText('1000/1000')).toBeInTheDocument();
  });

  it('toggles email notifications', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const notificationSwitch = screen.getByRole('checkbox', { 
      name: /assignments.details.sendNotifications/i 
    });
    
    fireEvent.click(notificationSwitch);
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...defaultDetails,
      sendNotifications: false
    });
  });

  it('displays assignment summary correctly', () => {
    const futureDate = new Date(2024, 6, 22);
    
    render(
      <AssignmentDetailsStep 
        details={{
          ...defaultDetails,
          dueDate: futureDate,
          priority: 'High',
          sendNotifications: true
        }}
        selectedEntitiesCount={10}
        onUpdate={mockOnUpdate}
      />
    );
    
    expect(screen.getByText('assignments.details.summary')).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument(); // entities count
    expect(screen.getByText(/30/)).toBeInTheDocument(); // days until due
    expect(screen.getByText('assignments.details.notificationsWillBeSent')).toBeInTheDocument();
  });

  it('shows all priority options', async () => {
    render(
      <AssignmentDetailsStep 
        details={defaultDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    const prioritySelect = screen.getByLabelText('assignments.details.priority');
    fireEvent.mouseDown(prioritySelect);
    
    await waitFor(() => {
      expect(screen.getByText('assignments.details.priorityLow')).toBeInTheDocument();
      expect(screen.getByText('assignments.details.priorityMedium')).toBeInTheDocument();
      expect(screen.getByText('assignments.details.priorityHigh')).toBeInTheDocument();
    });
  });

  it('maintains form state when re-rendered', () => {
    const existingDetails = {
      dueDate: new Date(2024, 6, 15),
      priority: 'High' as const,
      notes: 'Existing notes',
      sendNotifications: false
    };
    
    const { rerender } = render(
      <AssignmentDetailsStep 
        details={existingDetails}
        selectedEntitiesCount={5}
        onUpdate={mockOnUpdate}
      />
    );
    
    expect(screen.getByDisplayValue('Existing notes')).toBeInTheDocument();
    
    rerender(
      <AssignmentDetailsStep 
        details={existingDetails}
        selectedEntitiesCount={10}
        onUpdate={mockOnUpdate}
      />
    );
    
    expect(screen.getByDisplayValue('Existing notes')).toBeInTheDocument();
  });
});