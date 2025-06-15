import { useState, useCallback } from 'react';
import { SupplyNetworkEntitiesService } from '@/services/supplyNetworkEntitiesService';
import { SupplyNetworkEntityFormData } from '@/types/supplyNetworkEntities';
import { logger as log } from '@/utils/logger';
import { TIMING } from '@/constants/ui';
import { useApiErrorHandler } from '@/hooks/useErrorHandler';
import { ErrorType } from '@/utils/errorHandling';

interface UseEntitySubmissionReturn {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  errorType: ErrorType | null;
  submitEntity: (formData: SupplyNetworkEntityFormData) => Promise<void>;
  resetForm: (defaultValues?: SupplyNetworkEntityFormData) => void;
  clearError: () => void;
}

/**
 * Custom hook for handling entity submission with enhanced error handling [REH]
 */
export function useEntitySubmission(
  resetFormCallback?: (defaultValues?: SupplyNetworkEntityFormData) => void
): UseEntitySubmissionReturn {
  const { 
    error: apiError, 
    hasError, 
    errorMessage, 
    handleApiError, 
    clearError: clearApiError 
  } = useApiErrorHandler('useEntitySubmission');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Submit entity with enhanced error handling [REH]
  const submitEntity = useCallback(async (formData: SupplyNetworkEntityFormData) => {
    log.info('Starting entity submission', {
      component: 'useEntitySubmission',
      entityType: formData.entityType,
      legalName: formData.legalName,
      isSubEntity: formData.isSubEntity
    });

    setIsLoading(true);
    clearApiError();

    try {
      const requestData = {
        externalCode: formData.externalCode,
        entityType: formData.entityType,
        parentId: formData.isSubEntity ? formData.parentId : undefined,
        legalName: formData.legalName,
        shortName: formData.shortName,
        vatCode: formData.vatCode,
        taxCode: formData.taxCode,
        country: formData.country,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        zipCode: formData.zipCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        contactPersonName: formData.contactPersonName,
        roleInSupplyChain: formData.roleInSupplyChain,
        tags: formData.tags,
        active: formData.active,
        accreditationStatus: formData.accreditationStatus,
        accreditationDate: formData.accreditationDate
      };

      const result = await SupplyNetworkEntitiesService.createSupplyNetworkEntity(requestData);
      
      log.info('Entity submission successful', {
        component: 'useEntitySubmission',
        entityId: result.id,
        entityType: formData.entityType,
        legalName: formData.legalName
      });

      setIsSuccess(true);
      
      // Auto-hide success message after timeout [PA]
      setTimeout(() => {
        setIsSuccess(false);
      }, TIMING.SUCCESS_MESSAGE_DURATION);

    } catch (err) {
      // Use enhanced API error handling [REH]
      handleApiError(err, '/supply-network-entities', 'POST');
      
      log.error('Entity submission failed', {
        component: 'useEntitySubmission',
        error: err,
        entityType: formData.entityType,
        legalName: formData.legalName
      });
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError, clearApiError]);

  // Reset form state [REH]
  const resetForm = useCallback((defaultValues?: SupplyNetworkEntityFormData) => {
    setIsSuccess(false);
    clearApiError();
    
    if (resetFormCallback) {
      resetFormCallback(defaultValues);
    }
    
    log.info('Form reset completed', {
      component: 'useEntitySubmission',
      hasDefaultValues: !!defaultValues
    });
  }, [resetFormCallback, clearApiError]);

  // Clear error state [REH]
  const clearError = useCallback(() => {
    clearApiError();
  }, [clearApiError]);

  return {
    isLoading,
    isSuccess,
    error: hasError ? errorMessage : null,
    errorType: apiError?.type || null,
    submitEntity,
    resetForm,
    clearError
  };
}
