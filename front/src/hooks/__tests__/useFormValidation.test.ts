import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';
import { SupplyNetworkEntitiesService } from '../../services/supplyNetworkEntitiesService';

// Mock del service
vi.mock('../../services/supplyNetworkEntitiesService', () => ({
  SupplyNetworkEntitiesService: {
    validateExternalCode: vi.fn(),
    searchSupplyNetworkEntities: vi.fn(),
  }
}));

describe('useFormValidation', () => {
  let result: any;

  beforeEach(() => {
    vi.clearAllMocks();
    const { result: hookResult } = renderHook(() => useFormValidation());
    result = hookResult;
  });

  it('should initialize with no errors and no validation in progress', () => {
    expect(result.current.fieldErrors).toEqual({});
    expect(result.current.validationInProgress).toEqual({});
  });

  it('should validate email correctly - valid email', async () => {
    await act(async () => {
      await result.current.handleFieldBlur('email', 'test@example.com');
    });

    expect(result.current.fieldErrors.email).toBeUndefined();
  });

  it('should validate email correctly - invalid email', async () => {
    await act(async () => {
      await result.current.handleFieldBlur('email', 'invalid-email');
    });

    expect(result.current.fieldErrors.email).toContain('Email must contain @ and at least one dot after @');
  });

  it('should validate email correctly - empty email', async () => {
    await act(async () => {
      await result.current.handleFieldBlur('email', '');
    });

    expect(result.current.fieldErrors.email).toBeUndefined();
  });

  it('should validate external code uniqueness - unique code', async () => {
    (SupplyNetworkEntitiesService.validateExternalCode as any).mockResolvedValue({
      isUnique: true
    });

    await act(async () => {
      await result.current.handleFieldBlur('externalCode', 'UNIQUE123');
    });

    await waitFor(() => {
      expect(result.current.fieldErrors.externalCode).toBeUndefined();
    });

    expect(SupplyNetworkEntitiesService.validateExternalCode).toHaveBeenCalledWith('UNIQUE123');
  });

  it('should validate external code uniqueness - duplicate code', async () => {
    (SupplyNetworkEntitiesService.validateExternalCode as any).mockResolvedValue({
      isUnique: false
    });

    await act(async () => {
      await result.current.handleFieldBlur('externalCode', 'DUPLICATE123');
    });

    await waitFor(() => {
      expect(result.current.fieldErrors.externalCode).toContain('External code already exists');
    });
  });

  it('should validate external code uniqueness - empty code', async () => {
    await act(async () => {
      await result.current.handleFieldBlur('externalCode', '');
    });

    expect(result.current.fieldErrors.externalCode).toBeUndefined();
    expect(SupplyNetworkEntitiesService.validateExternalCode).not.toHaveBeenCalled();
  });

  it('should validate legal name uniqueness - unique name', async () => {
    (SupplyNetworkEntitiesService.searchSupplyNetworkEntities as any).mockResolvedValue([]);

    await act(async () => {
      await result.current.handleFieldBlur('legalName', 'Unique Company Inc.');
    });

    await waitFor(() => {
      expect(result.current.fieldErrors.legalName).toBeUndefined();
    });

    expect(SupplyNetworkEntitiesService.searchSupplyNetworkEntities).toHaveBeenCalledWith({
      searchTerm: 'Unique Company Inc.',
      maxResults: 1,
      activeOnly: false,
    });
  });

  it('should validate legal name uniqueness - duplicate name', async () => {
    (SupplyNetworkEntitiesService.searchSupplyNetworkEntities as any).mockResolvedValue([
      { legalName: 'Duplicate Company Inc.' }
    ]);

    await act(async () => {
      await result.current.handleFieldBlur('legalName', 'Duplicate Company Inc.');
    });

    await waitFor(() => {
      expect(result.current.fieldErrors.legalName).toContain('An entity with this legal name already exists');
    });
  });

  it('should ignore unsupported fields', async () => {
    await act(async () => {
      await result.current.handleFieldBlur('isSubEntity' as any, 'true');
    });

    expect(result.current.fieldErrors).toEqual({});
  });

  it('should handle validation errors gracefully', async () => {
    (SupplyNetworkEntitiesService.validateExternalCode as any).mockRejectedValue(
      new Error('API Error')
    );

    await act(async () => {
      await result.current.handleFieldBlur('externalCode', 'TEST123');
    });

    await waitFor(() => {
      expect(result.current.fieldErrors.externalCode).toContain('Error validating externalCode');
    });
  });

  it('should provide correct input styles for error states', () => {
    // Set an error first
    act(() => {
      result.current.setFieldErrors({ legalName: 'Some error' });
    });

    const styleWithError = result.current.getInputStyle('legalName');
    expect(styleWithError.color).toBe('#d32f2f');
    expect(styleWithError.fontWeight).toBe('bold');

    const styleWithoutError = result.current.getInputStyle('email');
    expect(styleWithoutError.color).toBeUndefined();
    expect(styleWithoutError.fontWeight).toBeUndefined();
  });

  it('should return helper text unchanged', () => {
    const helperText = result.current.getHelperText('legalName', 'Enter legal name');
    expect(helperText).toBe('Enter legal name');
  });

  it('should handle validation progress correctly', async () => {
    (SupplyNetworkEntitiesService.validateExternalCode as any).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ isUnique: true }), 100))
    );

    // Start validation without waiting for completion
    act(() => {
      result.current.handleFieldBlur('externalCode', 'TEST123');
    });

    // Check that validation progress is set to true
    await waitFor(() => {
      expect(result.current.validationInProgress.externalCode).toBe(true);
    });

    // Wait for validation to complete
    await waitFor(() => {
      expect(result.current.validationInProgress.externalCode).toBe(false);
    }, { timeout: 200 });
  });
});
