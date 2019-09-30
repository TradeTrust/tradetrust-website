export const states = {
  INITIAL: "INITIAL",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
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

  templates: null,
  activeTemplateTab: 0
};

// Actions
export const types = {
  RESET_CERTIFICATE: "RESET_CERTIFICATE",
  NETWORK_RESET: "NETWORK_RESET", // For network change

  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",

  LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
  LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",

  VERIFYING_CERTIFICATE_SUCCESS: "VERIFYING_CERTIFICATE_SUCCESS",
  VERIFYING_CERTIFICATE_FAILURE: "VERIFYING_CERTIFICATE_FAILURE",

  SENDING_CERTIFICATE: "SENDING_CERTIFICATE",
  SENDING_CERTIFICATE_SUCCESS: "SENDING_CERTIFICATE_SUCCESS",
  SENDING_CERTIFICATE_FAILURE: "SENDING_CERTIFICATE_FAILURE",
  SENDING_CERTIFICATE_RESET: "SENDING_CERTIFICATE_RESET",

  CERTIFICATE_OBFUSCATE_RESET: "CERTIFICATE_OBFUSCATE_RESET",
  CERTIFICATE_OBFUSCATE_UPDATE: "CERTIFICATE_OBFUSCATE_UPDATE",

  CERTIFICATE_TEMPLATE_REGISTER: "CERTIFICATE_TEMPLATE_REGISTER",
  CERTIFICATE_TEMPLATE_SELECT_TAB: "CERTIFICATE_TEMPLATE_SELECT_TAB",

  CERTIFICATE_PROCESS_QR_CODE: "CERTIFICATE_PROCESS_QR_CODE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Leaving this here for the moment
    case types.VERIFYING_CERTIFICATE_FAILURE:
    case types.RESET_CERTIFICATE:
    case types.NETWORK_RESET:
      return {
        ...initialState
      };
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload,
        rawModified: action.payload,
        store: null,
        storeError: null,
        storeLoading: true
      };
    case types.LOADING_STORE_SUCCESS:
      return {
        ...state,
        store: action.payload,
        storeError: null,
        storeLoading: false
      };
    case types.LOADING_STORE_FAILURE:
      return {
        ...state,
        storeError: action.payload,
        storeLoading: false
      };
    case types.VERIFYING_CERTIFICATE:
      return {
        ...state,
        verificationPending: true,
        verificationStatus: null
      };
    case types.VERIFYING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        verificationPending: false,
        verificationStatus: action.payload
      };
    case types.VERIFYING_CERTIFICATE_FAILURE:
      return {
        ...state,
        verificationPending: false,
        verificationError: action.payload
      };
    case types.SENDING_CERTIFICATE:
      return {
        ...state,
        emailState: states.PENDING,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_RESET:
      return {
        ...state,
        emailState: states.INITIAL,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        emailState: states.SUCCESS,
        emailError: null
      };
    case types.SENDING_CERTIFICATE_FAILURE:
      return {
        ...state,
        emailState: states.FAILURE,
        emailError: action.payload
      };
    case types.CERTIFICATE_OBFUSCATE_RESET:
      return {
        ...initialState,
        rawModified: state.raw
      };
    case types.CERTIFICATE_OBFUSCATE_UPDATE:
      return {
        ...state,
        rawModified: action.payload
      };
    case types.CERTIFICATE_TEMPLATE_REGISTER:
      return {
        ...state,
        templates: action.payload
      };
    case types.CERTIFICATE_TEMPLATE_SELECT_TAB:
      return {
        ...state,
        activeTemplateTab: action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export function resetCertificateState() {
  return {
    type: types.RESET_CERTIFICATE
  };
}

export function updateCertificate(payload) {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload
  };
}

export function verifyCertificate(payload) {
  return {
    type: types.VERIFYING_CERTIFICATE,
    payload
  };
}

export function updateFilteredCertificate(payload) {
  return {
    type: types.UPDATE_FILTERED_CERTIFICATE,
    payload
  };
}

export function sendCertificate(payload) {
  return {
    type: types.SENDING_CERTIFICATE,
    payload
  };
}

export function sendCertificateReset() {
  return {
    type: types.SENDING_CERTIFICATE_RESET
  };
}

export function resetCertificateObfuscation() {
  return {
    type: types.CERTIFICATE_OBFUSCATE_RESET
  };
}

export function updateObfuscatedCertificate(payload) {
  return {
    type: types.CERTIFICATE_OBFUSCATE_UPDATE,
    payload
  };
}

export function registerTemplates(payload) {
  return {
    type: types.CERTIFICATE_TEMPLATE_REGISTER,
    payload
  };
}

export function selectTemplateTab(payload) {
  return {
    type: types.CERTIFICATE_TEMPLATE_SELECT_TAB,
    payload
  };
}

export const processQrCode = payload => ({
  type: types.CERTIFICATE_PROCESS_QR_CODE,
  payload
});

export const verifyingCertificateSuccess = payload => ({
  type: types.VERIFYING_CERTIFICATE_SUCCESS,
  payload
});

export const verifyingCertificateFailure = payload => ({
  type: types.VERIFYING_CERTIFICATE_FAILURE,
  payload
});

// Selectors
export function getIssuerIdentityStatus(store) {
  const {
    issuerIdentities,
    certificateIssuerVerifying,
    certificateIssuerError,
    certificateIssuer
  } = store.certificate;
  return {
    identities: issuerIdentities,
    verified: certificateIssuer,
    verifying: certificateIssuerVerifying,
    error: certificateIssuerError
  };
}

export function getHashStatus(store) {
  const {
    certificateHash,
    certificateHashError,
    certificateHashVerifying
  } = store.certificate;
  return {
    verified: certificateHash,
    verifying: certificateHashVerifying,
    error: certificateHashError
  };
}

export function getStoreStatus(store) {
  const {
    certificateStore,
    certificateStoreError,
    certificateStoreVerifying
  } = store.certificate;
  return {
    verified: certificateStore,
    verifying: certificateStoreVerifying,
    error: certificateStoreError
  };
}

export function getIssuedStatus(store) {
  const {
    certificateIssued,
    certificateIssuedError,
    certificateIssuedVerifying
  } = store.certificate;
  return {
    verified: certificateIssued,
    verifying: certificateIssuedVerifying,
    error: certificateIssuedError
  };
}

export function getNotRevokedStatus(store) {
  const {
    certificateNotRevoked,
    certificateNotRevokedError,
    certificateNotRevokedVerifying
  } = store.certificate;
  return {
    verified: certificateNotRevoked,
    verifying: certificateNotRevokedVerifying,
    error: certificateNotRevokedError
  };
}

export function getCertificate(store) {
  return store.certificate.rawModified;
}

export function getVerifying(store) {
  const {
    certificateIssuerVerifying,
    certificateHashVerifying,
    certificateIssuedVerifying,
    certificateNotRevokedVerifying,
    certificateStoreVerifying
  } = store.certificate;
  return (
    certificateIssuerVerifying ||
    certificateHashVerifying ||
    certificateIssuedVerifying ||
    certificateNotRevokedVerifying ||
    certificateStoreVerifying
  );
}

export function getVerified(store) {
  const hash = getHashStatus(store).verified;
  const issued = getIssuedStatus(store).verified;
  const notRevoked = getNotRevokedStatus(store).verified;
  const identity = getIssuerIdentityStatus(store).verified;
  const storeStatus = getStoreStatus(store).verified;

  return hash && issued && notRevoked && identity && storeStatus;
}

export function getVerificationStatus(store) {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store) {
  return store.certificate.emailState;
}

export function getActiveTemplateTab(store) {
  return store.certificate.activeTemplateTab;
}

export function getTemplates(store) {
  return store.certificate.templates;
}
