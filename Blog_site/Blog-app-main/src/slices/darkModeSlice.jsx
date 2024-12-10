import { createSlice } from "@reduxjs/toolkit";

const initialTheme = JSON.parse(localStorage.getItem("darkMode")) || false;

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { theme: initialTheme },
  reducers: {
    toggleDarkMode: (state) => {
      const newTheme = !state.theme;
      state.theme = newTheme;
      localStorage.setItem("darkMode", JSON.stringify(newTheme));

      // Update the `html` class for TailwindCSS dark mode
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
