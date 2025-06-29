import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { TemplateSelectionStep } from '../TemplateSelectionStep';
import * as apiService from '../../../../services/questionnaire-assignments-api';
import { useTranslation } from 'react-i18next';

// Mock the API service
vi.mock('../../../../services/questionnaire-assignments-api');

// Mock i18n
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

describe('TemplateSelectionStep', () => {
  const mockOnSelect = vi.fn();
  const mockT = (key: string) => key;

  const mockTemplates = [
    {
      id: '1',
      title: 'Sustainability Questionnaire',
      description: 'Annual sustainability assessment',
      status: 'Active',
      version: '2.0',
      entityTypes: ['Supplier', 'Site'],
      questionCount: 25,
      created: '2024-01-01',
      createdBy: 'Admin'
    },
    {
      id: '2',
      title: 'Quality Audit',
      description: 'Quality management system audit',
      status: 'Active',
      version: '1.5',
      entityTypes: ['Supplier'],
      questionCount: 30,
      created: '2024-02-01',
      createdBy: 'QA Manager'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslation as any).mockReturnValue({ t: mockT });
    (apiService.getActiveTemplates as any).mockResolvedValue({
      templates: mockTemplates
    });
  });

  it('renders template selection step correctly', () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('assignments.templates.selectTitle')).toBeInTheDocument();
    expect(screen.getByText('assignments.templates.selectDescription')).toBeInTheDocument();
  });

  it('loads and displays templates', async () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('Sustainability Questionnaire')).toBeInTheDocument();
      expect(screen.getByText('Quality Audit')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Annual sustainability assessment')).toBeInTheDocument();
    expect(screen.getByText('Quality management system audit')).toBeInTheDocument();
  });

  it('shows loading state while fetching templates', () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('handles error when loading templates fails', async () => {
    (apiService.getActiveTemplates as any).mockRejectedValue(new Error('Network error'));
    
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('assignments.templates.loadError')).toBeInTheDocument();
    });
  });

  it('filters templates based on search', async () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('Sustainability Questionnaire')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('assignments.templates.searchPlaceholder');
    fireEvent.change(searchInput, { target: { value: 'quality' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Sustainability Questionnaire')).not.toBeInTheDocument();
      expect(screen.getByText('Quality Audit')).toBeInTheDocument();
    });
  });

  it('selects template when clicked', async () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('Sustainability Questionnaire')).toBeInTheDocument();
    });
    
    const templateCard = screen.getByText('Sustainability Questionnaire').closest('[role="button"]');
    fireEvent.click(templateCard!);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockTemplates[0]);
  });

  it('highlights selected template', async () => {
    render(
      <TemplateSelectionStep 
        selectedTemplate={mockTemplates[0]} 
        onSelect={mockOnSelect} 
      />
    );
    
    await waitFor(() => {
      const selectedCard = screen.getByText('Sustainability Questionnaire').closest('[role="button"]');
      expect(selectedCard).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('shows message when no templates available', async () => {
    (apiService.getActiveTemplates as any).mockResolvedValue({
      templates: []
    });
    
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('assignments.templates.noTemplates')).toBeInTheDocument();
    });
  });

  it('displays template metadata correctly', async () => {
    render(<TemplateSelectionStep selectedTemplate={null} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('common.version: 2.0')).toBeInTheDocument();
      expect(screen.getByText(/25/)).toBeInTheDocument(); // Question count
      expect(screen.getByText('Supplier, Site')).toBeInTheDocument(); // Entity types
    });
  });
});