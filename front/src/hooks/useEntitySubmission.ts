import { useState, useCallback } from 'react';
import { SupplyNetworkEntitiesService } from '../services/supplyNetworkEntitiesService';
import { SupplyNetworkEntityFormData } from '../types/supplyNetworkEntities';
import { useErrorHandling } from './useErrorHandling';
import { log } from '../utils/logger';
import { TIMING } from '../constants/ui';

export interface UseEntitySubmissionReturn {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  errorType: string | null;
  submitEntity: (formData: SupplyNetworkEntityFormData) => Promise<void>;
  clearError: () => void;
  resetSuccess: () => void;
}

export const useEntitySubmission = (): UseEntitySubmissionReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { error, errorType, handleError, clearError } = useErrorHandling();

  const submitEntity = useCallback(async (formData: SupplyNetworkEntityFormData) => {
    log.info('Starting entity submission', {
      component: 'useEntitySubmission',
      entityType: formData.entityType,
      legalName: formData.legalName,
      isSubEntity: formData.isSubEntity
    });

    setIsLoading(true);
    clearError();

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
        accreditationDate: formData.accreditationDate,
      };

      log.debug('Sending entity creation request', {
        component: 'useEntitySubmission',
        requestData: {
          ...requestData,
          // Don't log sensitive data in full
          email: requestData.email ? '[email]' : undefined,
          phoneNumber: requestData.phoneNumber ? '[phone]' : undefined,
        }
      });

      const result = await SupplyNetworkEntitiesService.createSupplyNetworkEntity(requestData);

      log.info('Entity created successfully', {
        component: 'useEntitySubmission',
        entityId: result.id,
        legalName: result.legalName
      });

      setIsSuccess(true);

      // Auto-reset success state after configured duration
      setTimeout(() => {
        setIsSuccess(false);
      }, TIMING.SUCCESS_MESSAGE_DURATION);

    } catch (err) {
      log.error('Entity submission failed', {
        component: 'useEntitySubmission',
        error: err,
        entityType: formData.entityType,
        legalName: formData.legalName
      });
      
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError]);

  const resetSuccess = useCallback(() => {
    setIsSuccess(false);
  }, []);

  return {
    isLoading,
    isSuccess,
    error,
    errorType,
    submitEntity,
    clearError,
    resetSuccess,
  };
};
