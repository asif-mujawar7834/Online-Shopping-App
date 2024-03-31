import { Slice, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  mode: "light" | "dark";
}

const initialState: initialStateType = {
  mode: "light",
};

const ThemeSlice: Slice<initialStateType> = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode === "light"
        ? (document.body.style.backgroundColor = "rgb(17, 24, 39)")
        : (document.body.style.backgroundColor = "white");

      return {
        ...state,
        mode: state.mode == "light" ? "dark" : "light",
      };
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
