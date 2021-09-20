import { createSlice } from "@reduxjs/toolkit";

const demoDocumentSlice = createSlice({
  name: "demoDocument",
  initialState: {
    isDemoDocument: false,
  },
  reducers: {
    setActive: (state) => {
      state.isDemoDocument = true;
    },
    reset: (state) => {
      state.isDemoDocument = false;
    },
  },
});

export const { setActive, reset } = demoDocumentSlice.actions;
export const demoDocument = demoDocumentSlice.reducer; // abit overkill to use reducer, but don't feel like props drilling
