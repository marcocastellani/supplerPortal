import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface RbacState {
  permissions: string[];
  checkedPermissions: string[];
  deniedPermissions: string[];
}

const initialState: RbacState = {
  permissions: [],
  checkedPermissions: [],
  deniedPermissions: [],
};

const rbacSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    addPermissions: (state, action: PayloadAction<string[]>) => {
      const uniquePermissions = new Set([
        ...state.permissions,
        ...action.payload,
      ]);
      state.permissions = Array.from(uniquePermissions);
    },
    markCheckedPermissions: (state, action: PayloadAction<string[]>) => {
      const uniqueChecked = new Set([
        ...state.checkedPermissions,
        ...action.payload,
      ]);
      state.checkedPermissions = Array.from(uniqueChecked);
    },
    markDeniedPermissions: (state, action: PayloadAction<string[]>) => {
      const uniqueDenied = new Set([
        ...state.deniedPermissions,
        ...action.payload,
      ]);
      state.deniedPermissions = Array.from(uniqueDenied);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkPermission.fulfilled, (state, action) => {
      const grantedPermissions = action.payload.grantedPermissions;

      state.permissions = Array.from(
        new Set([...state.permissions, ...grantedPermissions])
      );

      state.checkedPermissions = Array.from(
        new Set([...state.checkedPermissions, ...action.meta.arg])
      );

      const deniedPermissions = action.meta.arg.filter(
        (perm) => !grantedPermissions.includes(perm)
      );
      state.deniedPermissions = Array.from(
        new Set([...state.deniedPermissions, ...deniedPermissions])
      );
    });
  },
});

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

export const checkPermission = createAsyncThunk(
  "permissions/checkPermission",
  async (permissionKeys: string[], { getState, dispatch }) => {
    const state = getState();
    const { permissions, checkedPermissions } = (state as { rbac: RbacState })
      .rbac;

    const missingPermissions = permissionKeys.filter(
      (key) => !permissions.includes(key) && !checkedPermissions.includes(key)
    );

    if (missingPermissions.length === 0) {
      return { grantedPermissions: [] };
    }

    const grantedPermissions: string[] = await getPermissionsFromAPI(
      missingPermissions
    );

    dispatch(addPermissions(grantedPermissions));
    dispatch(markCheckedPermissions(missingPermissions));
    dispatch(
      markDeniedPermissions(
        missingPermissions.filter((key) => !grantedPermissions.includes(key))
      )
    );

    return { grantedPermissions };
  }
);

export const { addPermissions, markCheckedPermissions, markDeniedPermissions } =
  rbacSlice.actions;
export const { reducer } = rbacSlice;
