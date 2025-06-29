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

  // Mapping from frontend paths to backend menu item IDs
  const pathToMenuItemMapping: Record<string, string> = {
    "/dashboard": "dashboard",
    "/supply-network": "supply-network",
    "/supply-network/new": "new-entity",
    "/questionnaires/templates": "questionnaire-templates",
    "/questionnaires/templates/new": "template-creation",
    "/questionnaires/assignments": "questionnaire-assignments",
    "/kpi/dashboard": "kpi-dashboard",
    "/kpi/thresholds": "kpi-thresholds",
    "/audits": "audits",
    "/documents": "documents",
    "/settings": "settings",
    "/settings/taxonomies": "settings",
    "/settings/roles": "settings",
  };

  const canViewMenuItem = (menuItemPath: string): boolean => {
    // Use explicit mapping instead of string conversion
    const menuItemId = pathToMenuItemMapping[menuItemPath];

    if (!menuItemId) {
      console.warn(`No menu item mapping found for path: ${menuItemPath}`);
      return false;
    }

    console.log(
      `Checking access for path: ${menuItemPath} -> menuItemId: ${menuItemId}`
    );
    console.log("Available menu items:", state.accessibleMenuItems);

    return state.accessibleMenuItems.includes(menuItemId);
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
