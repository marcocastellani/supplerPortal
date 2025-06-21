import { SupplyNetworkEntityDto } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import { log } from "@/utils/logger";

interface UseEntityUpdateReturn {
  updateField: (
    entityId: string,
    fieldName: string,
    fieldValue: string | boolean | null
  ) => Promise<SupplyNetworkEntityDto>;
}

/**
 * Custom hook for entity field updates [CA, TDT]
 */
export const useEntityUpdate = (): UseEntityUpdateReturn => {
  const updateField = async (
    entityId: string,
    fieldName: string,
    fieldValue: string | boolean | null
  ): Promise<SupplyNetworkEntityDto> => {
    try {
      const updatedEntity =
        await SupplyNetworkEntitiesService.updateEntityField(
          entityId,
          fieldName,
          fieldValue
        );
      return updatedEntity;
    } catch (error) {
      log.error("Failed to update field:", { hook: "useEntityUpdate", error });
      throw error;
    }
  };

  return {
    updateField,
  };
};
