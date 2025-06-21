import { useState, useEffect, useMemo } from "react";
import { useRbacStore } from "../stores/rbacStore";

const pendingRequests = new Set<string>();

const useHasPermission = (permissionKeys: string[]) => {
  const { 
    permissions, 
    checkedPermissions, 
    deniedPermissions, 
    checkPermission 
  } = useRbacStore();

  const checkedPermissionsSet = useMemo(
    () => new Set(checkedPermissions),
    [checkedPermissions]
  );
  const deniedPermissionsSet = useMemo(
    () => new Set(deniedPermissions),
    [deniedPermissions]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const permissionStatus = useMemo(() => {
    return permissionKeys.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = permissions.includes(key) && !deniedPermissionsSet.has(key);
      return acc;
    }, {});
  }, [permissionKeys, permissions, deniedPermissionsSet]);

  const newPermissionsToCheck = useMemo(
    () =>
      permissionKeys.filter(
        (key) =>
          !permissions.includes(key) &&
          !checkedPermissionsSet.has(key) &&
          !pendingRequests.has(key) // Check global tracking
      ),
    [permissionKeys, permissions, checkedPermissionsSet]
  );

  useEffect(() => {
    if (newPermissionsToCheck.length === 0) {
      setLoading(false);
      return;
    }

    const checkNewPermissions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Add permissions to global tracking
        newPermissionsToCheck.forEach((key: string) => pendingRequests.add(key));

        await checkPermission(newPermissionsToCheck);
      } catch (err: any) {
        setError(err.message || "Error checking permissions");
      } finally {
        // Remove from global tracking
        newPermissionsToCheck.forEach((key: string) => pendingRequests.delete(key));
        setLoading(false);
      }
    };

    checkNewPermissions();
  }, [newPermissionsToCheck, checkPermission]);

  return {
    permissions: permissionStatus,
    loading,
    error,
  };
};

export default useHasPermission;
