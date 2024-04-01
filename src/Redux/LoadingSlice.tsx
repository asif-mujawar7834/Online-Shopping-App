import { Slice, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  isLoading: boolean;
}

const initialState: initialStateType = {
  isLoading: false,
};

const LoadingSlice: Slice<initialStateType> = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
