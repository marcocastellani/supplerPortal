import { useState, useEffect, useMemo } from "react";
import { SupplyNetworkEntitiesService } from "../services/supplyNetworkEntitiesService";
import {
  EnumValues,
  EntityType,
  RoleInSupplyChain,
  AccreditationStatus,
} from "../types/supplyNetworkEntities";
import { useErrorHandling } from "./useErrorHandling";
import { log } from "../utils/logger";

export interface DefaultEnumValues {
  entityType: EntityType;
  roleInSupplyChain: RoleInSupplyChain;
  accreditationStatus: AccreditationStatus;
}

export interface UseEntityEnumsReturn {
  enumValues: EnumValues | null;
  defaultValues: DefaultEnumValues | null;
  isLoading: boolean;
  error: string | null;
}

export const useEntityEnums = (): UseEntityEnumsReturn => {
  const [enumValues, setEnumValues] = useState<EnumValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError, error } = useErrorHandling();

  useEffect(() => {
    const loadEnumValues = async () => {
      setIsLoading(true);

      log.info("Loading entity enum values", { component: "useEntityEnums" });

      try {
        const enums = await SupplyNetworkEntitiesService.getEnumValues();

        log.info("Entity enum values loaded successfully", {
          component: "useEntityEnums",
          entityTypesCount: enums.entityTypes.length,
          rolesCount: enums.rolesInSupplyChain.length,
          statusesCount: enums.accreditationStatuses.length,
        });

        setEnumValues(enums);
      } catch (err) {
        log.error("Failed to load entity enum values", {
          component: "useEntityEnums",
          error: err,
        });
        handleError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEnumValues();
  }, [handleError]);

  // Memoize default values calculation to prevent infinite loops [DRY, PA]
  const defaultValues = useMemo((): DefaultEnumValues | null => {
    if (
      !enumValues ||
      enumValues.entityTypes.length === 0 ||
      enumValues.rolesInSupplyChain.length === 0 ||
      enumValues.accreditationStatuses.length === 0
    ) {
      return null;
    }

    const defaults: DefaultEnumValues = {
      entityType: enumValues.entityTypes[0].value as EntityType,
      roleInSupplyChain: enumValues.rolesInSupplyChain[0]
        .value as RoleInSupplyChain,
      accreditationStatus:
        (enumValues.accreditationStatuses.find((s) => s.value === "Approved")
          ?.value as AccreditationStatus) ||
        (enumValues.accreditationStatuses[0].value as AccreditationStatus),
    };

    log.debug("Default enum values calculated", {
      component: "useEntityEnums",
      defaults,
    });

    return defaults;
  }, [enumValues]);

  return {
    enumValues,
    defaultValues,
    isLoading,
    error,
  };
};
