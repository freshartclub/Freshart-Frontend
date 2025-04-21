import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = (): false | true => {
  const saved = localStorage.getItem("theme");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved && saved == "true") {
    return true;
  } else if (saved && saved == "false") {
    return false;
  } else {
    return prefersDark ? true : false;
  }
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === true ? false : true;
      localStorage.setItem("theme", `${state.mode}`);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
