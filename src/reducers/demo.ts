import { createSlice } from "@reduxjs/toolkit";
import { providers, Signer } from "ethers";
import { DemoCreateStatus } from "../types";
import { data } from "../components/Demo/DemoCreate/DemoCreateForm/data";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/3.0/types";

// TODO: from the looks it needs this states, update once demo flow is more confirmed

type Status = "failure" | "success" | "pending";
interface DemoState {
  rawDocument: string | null;
  rawModifiedDocument: string | null;

  verificationPending: boolean;
  verificationStatus: string | null;
  verificationError: string | null;

  signer: Signer | providers.Provider | null;

  documentStoreAddress: string | null;
  deploymentDocStoreStatus: Status | null;
  deploymentDocStoreError: string | null;

  tempDns: string | null;
  createTempDnsStatus: Status | null;
  createTempDnsError: string | null;

  wrappedDocument: WrappedDocument<any> | null;
  wrapDocumentStatus: Status | null;
  wrapDocumentError: string | null;

  issueDocumentStatus: Status | null;
  issueDocumentError: Status | null;

  demoFormValues: Record<string, any>;

  demoCreateStatus: DemoCreateStatus;
}

export const initialState: Record<string, any> = {
  rawDocument: null,
  rawModifiedDocument: null,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  signer: null,

  documentStoreAddress: null,
  deploymentDocStoreStatus: null,
  deploymentDocStoreError: null,

  tempDns: null,
  createTempDnsStatus: null,
  createTempDnsError: null,

  wrappedDocument: null,
  wrapDocumentStatus: null,
  wrapDocumentError: null,

  issueDocumentStatus: null,
  issueDocumentError: null,

  demoFormValues: data,

  demoCreateStatus: "start",
} as DemoState;

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    resetDemoState: (state) => {
      Object.keys(state).forEach((key: string) => {
        delete state[key];
      });
      Object.entries(initialState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    updateDemoDocument: (state, action) => {
      state.rawDocument = action.payload;
      state.rawModifiedDocument = action.payload;
    },

    verifyingDemoDocument: (state) => {
      state.verificationPending = true;
      state.verificationStatus = null;
    },
    verifyDemoDocumentCompleted: (state, action) => {
      state.verificationPending = false;
      state.verificationStatus = action.payload;
    },
    verifyDemoDocumentFailure: (state, action) => {
      state.verificationPending = false;
      state.verificationError = action.payload;
    },

    updateSigner: (state, action) => {
      state.signer = action.payload;
    },

    updateDemoCreateStatusToStart: (state) => {
      state.demoCreateStatus = "start";
    },

    updateDemoCreateStatusToForm: (state) => {
      state.demoCreateStatus = "form";
    },
    updateDemoCreateStatusToReview: (state) => {
      state.demoCreateStatus = "review";
    },
    updateDemoCreateStatusToIssue: (state) => {
      state.demoCreateStatus = "issue";
    },

    deployingDocStore: (state) => {
      state.deploymentDocStoreStatus = "pending";
    },
    deployDocStoreSuccess: (state, action) => {
      state.documentStoreAddress = action.payload;
      state.deploymentDocStoreStatus = "success";
    },
    deployDocStoreFailure: (state, action) => {
      state.deploymentDocStoreError = action.payload;
      state.deploymentDocStoreStatus = "failure";
    },

    creatingTempDns: (state) => {
      state.createTempDnsStatus = "pending";
    },
    createTempDnsSuccess: (state, action) => {
      state.tempDns = action.payload;
      state.createTempDnsStatus = "success";
    },
    createTempDnsFailure: (state, action) => {
      state.createTempDnsError = action.payload;
      state.createTempDnsStatus = "failure";
    },

    wrappingDocument: (state) => {
      state.wrapDocumentStatus = "pending";
    },
    wrapDocumentSuccess: (state, action) => {
      state.wrappedDocument = action.payload;
      state.wrapDocumentStatus = "success";
    },
    wrapDocumentFailure: (state, action) => {
      state.wrapDocumentStatus = "failure";
      state.wrapDocumentError = action.payload;
    },

    issuingDocument: (state) => {
      state.issueDocumentStatus = "pending";
    },
    issueDocumentSuccess: (state) => {
      state.issueDocumentStatus = "success";
    },
    issueDocumentFailure: (state, action) => {
      state.issueDocumentError = action.payload;
      state.issueDocumentStatus = "failure";
    },

    updateDemoFormValues: (state, action) => {
      state.demoFormValues = {
        ...state.demoFormValues,
        ...action.payload,
      };
    },
  },
});

// Selectors
export const getDemoDocument = (store: { demo: { rawModifiedDocument: string } }): string => {
  return store.demo.rawModifiedDocument;
};

export const getDemoCreateStatus = (store: { demo: { demoCreateStatus: DemoCreateStatus } }): DemoCreateStatus => {
  return store.demo.demoCreateStatus;
};

export const getSigner = (store: { demo: { signer: Signer | providers.Provider } }): Signer | providers.Provider => {
  return store.demo.signer;
};

export const getDocumentStoreAddress = (store: { demo: { documentStoreAddress: string } }): string => {
  return store.demo.documentStoreAddress;
};

export const getTempDns = (store: { demo: { tempDns: string } }): string => {
  return store.demo.tempDns;
};

export const getDemoFormValues = (store: { demo: { demoFormValues: Record<string, any> } }): Record<string, any> => {
  return store.demo.demoFormValues;
};

export const getWrappedDocument = (store: {
  demo: { wrappedDocument: WrappedDocument<any> };
}): WrappedDocument<any> => {
  return store.demo.wrappedDocument;
};

export const getDocumentPrepared = (store: {
  demo: {
    createTempDnsStatus: Status;
    deploymentDocStoreStatus: Status;
  };
}): { prepared: boolean; error: boolean } => {
  const { createTempDnsStatus, deploymentDocStoreStatus } = store.demo;

  return {
    prepared: createTempDnsStatus === "success" && deploymentDocStoreStatus === "success",
    error: createTempDnsStatus === "failure" || deploymentDocStoreStatus === "failure",
  };
};

export const getDocumentIssued = (store: {
  demo: {
    wrapDocumentStatus: Status;
    issueDocumentStatus: Status;
  };
}): { issued: boolean; error: boolean } => {
  const { wrapDocumentStatus, issueDocumentStatus } = store.demo;

  return {
    issued: wrapDocumentStatus === "success" && issueDocumentStatus === "success",
    error: wrapDocumentStatus === "failure" || issueDocumentStatus === "failure",
  };
};

export const {
  resetDemoState,
  updateDemoDocument,
  verifyingDemoDocument,
  verifyDemoDocumentCompleted,
  verifyDemoDocumentFailure,
  updateSigner,
  updateDemoCreateStatusToStart,
  updateDemoCreateStatusToForm,
  updateDemoCreateStatusToReview,
  updateDemoCreateStatusToIssue,
  deployingDocStore,
  deployDocStoreSuccess,
  deployDocStoreFailure,
  creatingTempDns,
  createTempDnsSuccess,
  createTempDnsFailure,
  wrappingDocument,
  wrapDocumentSuccess,
  wrapDocumentFailure,
  issuingDocument,
  issueDocumentSuccess,
  issueDocumentFailure,
  updateDemoFormValues,
} = demoSlice.actions;

export const demo = demoSlice.reducer;
