import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const darkModeSlice = createSlice({
    name: "darkModeSlice",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            // switch between them
            const newTheme = !state.theme;

            state.theme = newTheme;
            localStorage.setItem("darkMode", JSON.stringify(newTheme));
        },
    },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
