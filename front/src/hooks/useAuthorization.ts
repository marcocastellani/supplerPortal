import { useState, useEffect } from "react";
import { authorizationService } from "@/services/authorizationService";

interface AuthorizationState {
  roles: string[];
  accessibleMenuItems: string[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook for managing user authorization and permissions
 */
export const useAuthorization = () => {
  const [state, setState] = useState<AuthorizationState>({
    roles: [],
    accessibleMenuItems: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadAuthorization = async () => {
      try {
        setState((prev: AuthorizationState) => ({
          ...prev,
          loading: true,
          error: null,
        }));

        const [roles, menuItems] = await Promise.all([
          authorizationService.getUserRoles(),
          authorizationService.getAccessibleMenuItems(),
        ]);

        setState({
          roles,
          accessibleMenuItems: menuItems,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error loading authorization:", error);
        setState((prev: AuthorizationState) => ({
          ...prev,
          loading: false,
          error: "Failed to load authorization data",
        }));
      }
    };

    loadAuthorization();
  }, []);

  const canViewMenuItem = (menuItemId: string): boolean => {
    // Convert path to menu item ID (e.g., "/dashboard" -> "dashboard")
    const id = menuItemId.replace(/^\//, "").replace(/\//g, "-");
    console.log(id);
    console.log(state.accessibleMenuItems);
    return state.accessibleMenuItems.includes(id);
  };

  const hasRole = (role: string): boolean => {
    return state.roles.includes(role);
  };

  const isAdministrator = (): boolean => {
    return hasRole("administrator");
  };

  const checkPermission = async (
    relation: string,
    objectType: string,
    objectId: string
  ): Promise<boolean> => {
    return await authorizationService.checkPermission(
      relation,
      objectType,
      objectId
    );
  };

  return {
    ...state,
    canViewMenuItem,
    hasRole,
    isAdministrator,
    checkPermission,
  };
};
