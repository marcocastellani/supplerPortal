import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SupplyNetworkEntityDto } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";

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

    console.log("Fetching entity with ID:", id);
    setIsLoading(true);
    setError(null);

    try {
      const response = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(id);
      console.log("Entity fetched successfully:", response);
      setEntity(response);

      // Fetch parent entity if exists [REH]
      if (response.parentId) {
        try {
          const parentResponse = await SupplyNetworkEntitiesService.getSupplyNetworkEntity(
            response.parentId
          );
          setParentEntity(parentResponse);
        } catch (parentError) {
          console.warn("Failed to fetch parent entity:", parentError);
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch entity details:", error);
      
      // Specific error handling [REH]
      if (error?.response?.status === 404) {
        setError(t("entityDetail.notFound"));
      } else if (error?.response?.status === 403) {
        setError(t("forbidden"));
      } else if (error?.response?.status >= 500) {
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
