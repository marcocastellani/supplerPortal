import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntityDto } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import { log } from "../utils/logger";
import { AppError } from "../types/ui";

interface UseEntityDetailReturn {
  entity: SupplyNetworkEntityDto | null;
  parentEntity: SupplyNetworkEntityDto | null;
  isLoading: boolean;
  error: string | null;
  fetchEntity: () => Promise<void>;
}

/**
 * Custom hook for entity detail data fetching and state management [CA, TDT]
 */
export const useEntityDetail = (id?: string): UseEntityDetailReturn => {
  const { t } = useTranslation();
  const [entity, setEntity] = useState<SupplyNetworkEntityDto | null>(null);
  const [parentEntity, setParentEntity] = useState<SupplyNetworkEntityDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntity = async () => {
    if (!id) {
      setError(t("entityDetail.notFound"));
      setIsLoading(false);
      return;
    }

    log.debug("Fetching entity", { hook: 'useEntityDetail', entityId: id });
    setIsLoading(true);
    setError(null);

    try {
      const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(id);
      log.info("Entity fetched successfully", { 
        hook: 'useEntityDetail', 
        entityId: id,
        entityType: response.entityType,
        hasParent: !!response.parentId
      });
      setEntity(response);

      // Fetch parent entity if exists [REH]
      if (response.parentId) {
        try {
          const parentResponse = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(
            response.parentId
          );
          setParentEntity(parentResponse);
        } catch (parentError) {
          log.warn("Failed to fetch parent entity", { 
            hook: 'useEntityDetail', 
            entityId: id,
            parentId: response.parentId 
          }, parentError);
        }
      }
    } catch (error) {
      const appError = error as AppError;
      log.error("Failed to fetch entity details", { 
        hook: 'useEntityDetail', 
        entityId: id,
        status: 'response' in appError ? appError.response?.status : undefined
      }, appError);
      
      // Specific error handling [REH]
      if ('response' in appError && appError.response?.status === 404) {
        setError(t("entityDetail.notFound"));
      } else if ('response' in appError && appError.response?.status === 403) {
        setError(t("forbidden"));
      } else if ('response' in appError && appError.response?.status && appError.response.status >= 500) {
        setError(t("serverError"));
      } else {
        setError(t("entityDetail.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntity();
  }, [id]);

  return {
    entity,
    parentEntity,
    isLoading,
    error,
    fetchEntity,
  };
};
