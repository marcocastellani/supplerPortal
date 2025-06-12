import { useDispatch, useSelector } from "react-redux";
import { checkPermission } from "../redux/slices/rbacSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { useState, useEffect, useMemo } from "react";

const pendingRequests = new Set<string>();

const useHasPermission = (permissionKeys: string[]) => {
  const dispatch: AppDispatch = useDispatch();

  const permissions = useSelector((state: RootState) => state.rbac.permissions);
  const checkedPermissions = useSelector(
    (state: RootState) => state.rbac.checkedPermissions
  );
  const deniedPermissions = useSelector(
    (state: RootState) => state.rbac.deniedPermissions
  );

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
    if (newPermissionsToCheck.length > 0) {
      newPermissionsToCheck.forEach((key) => pendingRequests.add(key));

      setLoading(true);

      dispatch(checkPermission(newPermissionsToCheck))
        .unwrap()
        .catch(() => {
          setError("Failed to fetch permissions.");
        })
        .finally(() => {
          newPermissionsToCheck.forEach((key) => pendingRequests.delete(key));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [newPermissionsToCheck, dispatch]);

  return {
    permissions: permissionStatus,
    loading,
    error,
  };
};

export default useHasPermission;
