import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

export const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme") as "light" | "dark";
  if (storedTheme) {
    return storedTheme;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { reducer } = themeSlice;
export const theme = (state: RootState) => state.theme;
