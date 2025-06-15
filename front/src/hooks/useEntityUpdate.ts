import { SupplyNetworkEntityDto } from "../types/supplyNetworkEntities";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";

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
      const updatedEntity = await SupplyNetworkEntitiesService.updateEntityField(
        entityId,
        fieldName,
        fieldValue
      );
      return updatedEntity;
    } catch (error) {
      console.error("Failed to update field:", error);
      throw error;
    }
  };

  return {
    updateField,
  };
};
