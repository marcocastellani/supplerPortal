import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface RbacState {
  permissions: string[];
  checkedPermissions: string[];
  deniedPermissions: string[];
  addPermissions: (permissions: string[]) => void;
  markCheckedPermissions: (permissions: string[]) => void;
  markDeniedPermissions: (permissions: string[]) => void;
  checkPermission: (permissionKeys: string[]) => Promise<string[]>;
  reset: () => void;
}

const getPermissionsFromAPI = async (permissionKeys: string[]) => {
  const currentTenant =
    ((axios.defaults.headers.common["Authorization"] as string)
      ?.replace("Bearer ", "")
      .trim() &&
      jwtDecode<{ current_tenant: string }>(
        (axios.defaults.headers.common["Authorization"] as string)
          ?.replace("Bearer ", "")
          .trim() ?? ""
      ).current_tenant) ??
    "";

  const response = await axios.post(
    `/rbac/api/UserRole/relations/list?api-version=2024-10-24-preview`,
    permissionKeys,
    {
      params: {
        objectType: "tenant",
        objectId: currentTenant,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) throw new Error("Failed to fetch permission");
  return response.data;
};

export const useRbacStore = create<RbacState>((set, get) => ({
  permissions: [],
  checkedPermissions: [],
  deniedPermissions: [],
  
  addPermissions: (permissions) => 
    set((state) => ({
      permissions: Array.from(new Set([...state.permissions, ...permissions])),
    })),
    
  markCheckedPermissions: (permissions) =>
    set((state) => ({
      checkedPermissions: Array.from(
        new Set([...state.checkedPermissions, ...permissions])
      ),
    })),
    
  markDeniedPermissions: (permissions) =>
    set((state) => ({
      deniedPermissions: Array.from(
        new Set([...state.deniedPermissions, ...permissions])
      ),
    })),
    
  checkPermission: async (permissionKeys) => {
    const { permissions, checkedPermissions } = get();
    
    const missingPermissions = permissionKeys.filter(
      (key) => !permissions.includes(key) && !checkedPermissions.includes(key)
    );

    if (missingPermissions.length === 0) {
      return [];
    }

    try {
      const grantedPermissions: string[] = await getPermissionsFromAPI(
        missingPermissions
      );

      set((state) => ({
        permissions: Array.from(
          new Set([...state.permissions, ...grantedPermissions])
        ),
        checkedPermissions: Array.from(
          new Set([...state.checkedPermissions, ...missingPermissions])
        ),
        deniedPermissions: Array.from(
          new Set([
            ...state.deniedPermissions,
            ...missingPermissions.filter(
              (key) => !grantedPermissions.includes(key)
            ),
          ])
        ),
      }));

      return grantedPermissions;
    } catch (error) {
      console.error('Failed to check permissions:', error);
      throw error;
    }
  },
  
  reset: () =>
    set({
      permissions: [],
      checkedPermissions: [],
      deniedPermissions: [],
    }),
}));