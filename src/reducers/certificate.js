import { get } from "lodash";
import { obfuscateDocument } from "@govtechsg/open-attestation";

export const states = {
  INITIAL: "INITIAL",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export const initialState = {
  raw: null,
  rawModified: null,
  store: null,
  storeError: null,
  storeLoading: false,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  emailState: states.INITIAL,
  emailError: null,

  retrieveCertificateByActionState: states.INITIAL,
  retrieveCertificateByActionStateError: null,
};

// Actions
export const types = {
  RESET_CERTIFICATE: "RESET_CERTIFICATE",
  NETWORK_RESET: "NETWORK_RESET", // For network change

  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",

  LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
  LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",

  VERIFYING_CERTIFICATE_COMPLETED: "VERIFYING_CERTIFICATE_COMPLETED",
  VERIFYING_CERTIFICATE_FAILURE: "VERIFYING_CERTIFICATE_FAILURE",

  SENDING_CERTIFICATE: "SENDING_CERTIFICATE",
  SENDING_CERTIFICATE_SUCCESS: "SENDING_CERTIFICATE_SUCCESS",
  SENDING_CERTIFICATE_FAILURE: "SENDING_CERTIFICATE_FAILURE",
  SENDING_CERTIFICATE_RESET: "SENDING_CERTIFICATE_RESET",

  CERTIFICATE_OBFUSCATE_RESET: "CERTIFICATE_OBFUSCATE_RESET",
  CERTIFICATE_OBFUSCATE_UPDATE: "CERTIFICATE_OBFUSCATE_UPDATE",

  CERTIFICATE_PROCESS_QR_CODE: "CERTIFICATE_PROCESS_QR_CODE",

  RETRIEVE_CERTIFICATE_BY_ACTION: "RETRIEVE_CERTIFICATE_BY_ACTION",
  RETRIEVE_CERTIFICATE_BY_ACTION_PENDING: "RETRIEVE_CERTIFICATE_BY_ACTION_PENDING",
  RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS: "RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS",
  RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE: "RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE",
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.RESET_CERTIFICATE:
    case types.NETWORK_RESET:
      return {
        ...initialState,
      };
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload,
        rawModified: action.payload,
        store: null,
        storeError: null,
        storeLoading: true,
      };
    case types.LOADING_STORE_SUCCESS:
      return {
        ...state,
        store: action.payload,
        storeError: null,
        storeLoading: false,
      };
    case types.LOADING_STORE_FAILURE:
      return {
        ...state,
        storeError: action.payload,
        storeLoading: false,
      };
    case types.VERIFYING_CERTIFICATE:
      return {
        ...state,
        verificationPending: true,
        verificationStatus: null,
      };
    case types.VERIFYING_CERTIFICATE_COMPLETED:
      return {
        ...state,
        verificationPending: false,
        verificationStatus: action.payload,
      };
    case types.VERIFYING_CERTIFICATE_FAILURE:
      return {
        ...state,
        verificationPending: false,
        verificationError: action.payload,
      };
    case types.SENDING_CERTIFICATE:
      return {
        ...state,
        emailState: states.PENDING,
        emailError: null,
      };
    case types.SENDING_CERTIFICATE_RESET:
      return {
        ...state,
        emailState: states.INITIAL,
        emailError: null,
      };
    case types.SENDING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        emailState: states.SUCCESS,
        emailError: null,
      };
    case types.SENDING_CERTIFICATE_FAILURE:
      return {
        ...state,
        emailState: states.FAILURE,
        emailError: action.payload,
      };
    case types.CERTIFICATE_OBFUSCATE_RESET:
      return {
        ...initialState,
        rawModified: state.raw,
      };
    case types.CERTIFICATE_OBFUSCATE_UPDATE:
      return {
        ...state,
        rawModified: obfuscateDocument(state.rawModified, action.payload),
      };
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING:
      return {
        ...state,
        retrieveCertificateByActionState: states.PENDING,
      };
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS:
      return {
        ...state,
        retrieveCertificateByActionState: states.SUCCESS,
      };
    case types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE:
      return {
        ...state,
        retrieveCertificateByActionState: states.FAILURE,
        retrieveCertificateByActionError: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export function resetCertificateState() {
  return {
    type: types.RESET_CERTIFICATE,
  };
}

export function updateCertificate(payload) {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload,
  };
}

export function verifyCertificate(payload) {
  return {
    type: types.VERIFYING_CERTIFICATE,
    payload,
  };
}

export function sendCertificate(payload) {
  return {
    type: types.SENDING_CERTIFICATE,
    payload,
  };
}

export function sendCertificateReset() {
  return {
    type: types.SENDING_CERTIFICATE_RESET,
  };
}

export function applyPrivacyFilter(payload) {
  return {
    type: types.CERTIFICATE_OBFUSCATE_UPDATE,
    payload,
  };
}

export const processQrCode = (payload) => ({
  type: types.CERTIFICATE_PROCESS_QR_CODE,
  payload,
});

export const verifyingCertificateCompleted = (payload) => ({
  type: types.VERIFYING_CERTIFICATE_COMPLETED,
  payload,
});

export const verifyingCertificateFailure = (payload) => ({
  type: types.VERIFYING_CERTIFICATE_FAILURE,
  payload,
});

export function retrieveCertificateByAction(payload) {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION,
    payload,
  };
}

export function retrieveCertificateByActionFailure(payload) {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
    payload,
  };
}

// Selectors
export function getCertificate(store) {
  return store.certificate.rawModified;
}

export function getVerifying(store) {
  return get(store, "certificate.verificationPending");
}

export function getVerificationStatus(store) {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store) {
  return store.certificate.emailState;
}

export function getCertificateByActionError(store) {
  return store.certificate.retrieveCertificateByActionError;
}
