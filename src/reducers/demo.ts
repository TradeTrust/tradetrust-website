import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "demo",
  initialState: {
    value: false,
  },
  reducers: {
    setActive: (state) => {
      state.value = true;
    },
    reset: (state) => {
      state.value = false;
    },
  },
});

export const { setActive, reset } = demoSlice.actions;
export const demo = demoSlice.reducer; // abit overkill to use reducer, but don't feel like props drilling
