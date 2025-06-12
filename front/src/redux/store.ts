import { configureStore } from "@reduxjs/toolkit";
import { reducer as rbacReducer } from "./slices/rbacSlice";
import { reducer as themeReducer } from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    rbac: rbacReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
