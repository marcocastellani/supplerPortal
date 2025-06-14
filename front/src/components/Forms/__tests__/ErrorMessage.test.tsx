import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should not render when no message is provided', () => {
    const { container } = render(<ErrorMessage message={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<ErrorMessage message={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should apply correct styling for error messages', () => {
    const errorMessage = 'Invalid input';
    render(<ErrorMessage message={errorMessage} />);
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toHaveStyle({ color: '#d32f2f' });
  });
});
