import { createSlice } from "@reduxjs/toolkit";

// TODO: from the looks it needs this states, update once demo flow is more confirmed
interface DemoMagicWalletState {
  rawDocument: string | null;
  rawModifiedDocument: string | null;

  verificationPending: boolean;
  verificationStatus: string | null;
  verificationError: string | null;
}

const initialState = {
  rawDocument: null,
  rawModifiedDocument: null,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,
} as DemoMagicWalletState;

const demoMagicWalletSlice = createSlice({
  name: "demoMagicWallet",
  initialState,
  reducers: {
    resetDemoMagicDocument: (state) => {
      state.rawDocument = null;
      state.rawModifiedDocument = null;
      state.verificationPending = false;
      state.verificationStatus = null;
      state.verificationError = null;
    },
    updateDemoMagicDocument: (state, action) => {
      state.rawDocument = action.payload;
      state.rawModifiedDocument = action.payload;
    },
    verifyingDemoMagicDocument: (state) => {
      state.verificationPending = true;
      state.verificationStatus = null;
    },
    verifyDemoMagicDocumentCompleted: (state, action) => {
      state.verificationPending = false;
      state.verificationStatus = action.payload;
    },
    verifyDemoMagicDocumentFailure: (state, action) => {
      state.verificationPending = false;
      state.verificationError = action.payload;
    },
  },
});

// Selectors
export const getDemoMagicDocument = (store: { demoMagicWallet: { rawModifiedDocument: string } }): string => {
  return store.demoMagicWallet.rawModifiedDocument;
};

export const {
  resetDemoMagicDocument,
  updateDemoMagicDocument,
  verifyingDemoMagicDocument,
  verifyDemoMagicDocumentCompleted,
  verifyDemoMagicDocumentFailure,
} = demoMagicWalletSlice.actions;

export const demoMagicWallet = demoMagicWalletSlice.reducer;
