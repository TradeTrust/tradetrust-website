import { obfuscateDocument } from "@trustvc/trustvc";
import { TokenRegistryVersions } from "../constants";

// Define the state types
export const states = {
  INITIAL: "INITIAL",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
} as const;

export type StateType = (typeof states)[keyof typeof states];

export const DOCUMENT_SCHEMA = {
  OA_V2: "OA",
  OA_V3: "OA",
  W3C_VC_1_1: "W3C VC 1.1",
  W3C_VC_2_0: "W3C VC 2.0",
} as const;

export type DocumentSchemaType = (typeof DOCUMENT_SCHEMA)[keyof typeof DOCUMENT_SCHEMA] | null;
// Define the certificate state interface
export interface CertificateState {
  raw: any | null;
  rawModified: any | null;
  filename: string;

  providerOrSigner: any | null;
  tokenRegistryVersion: TokenRegistryVersions | null;
  documentSchema: DocumentSchemaType;

  verificationPending: boolean;
  verificationStatus: any | null;
  verificationError: any | null;

  retrieveCertificateByActionState: StateType;
  retrieveCertificateByActionError: string | null;
  keyId: string | null;
}

export const initialState: CertificateState = {
  raw: null,
  rawModified: null,
  filename: "",

  providerOrSigner: null,
  tokenRegistryVersion: null,
  documentSchema: null,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  retrieveCertificateByActionState: states.INITIAL,
  retrieveCertificateByActionError: null,
  keyId: null,
};

// Define action types
export const types = {
  RESET_CERTIFICATE: "RESET_CERTIFICATE",
  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE",
  UPDATE_FILENAME: "UPDATE_FILENAME",
  UPDATE_DOCUMENT_SCHEMA: "UPDATE_DOCUMENT_SCHEMA",
  UPDATE_KEY_ID: "UPDATE_KEY_ID",

  DETECTING_TR_CERTIFICATE_VERSION: "DETECTING_TR_CERTIFICATE_VERSION",

  VERIFYING_CERTIFICATE: "VERIFYING_CERTIFICATE",

  VERIFYING_CERTIFICATE_COMPLETED: "VERIFYING_CERTIFICATE_COMPLETED",
  VERIFYING_CERTIFICATE_FAILURE: "VERIFYING_CERTIFICATE_FAILURE",

  CERTIFICATE_OBFUSCATE_RESET: "CERTIFICATE_OBFUSCATE_RESET",
  CERTIFICATE_OBFUSCATE_UPDATE: "CERTIFICATE_OBFUSCATE_UPDATE",

  CERTIFICATE_PROCESS_QR_CODE: "CERTIFICATE_PROCESS_QR_CODE",

  RETRIEVE_CERTIFICATE_BY_ACTION: "RETRIEVE_CERTIFICATE_BY_ACTION",
  RETRIEVE_CERTIFICATE_BY_ACTION_PENDING: "RETRIEVE_CERTIFICATE_BY_ACTION_PENDING",
  RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS: "RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS",
  RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE: "RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE",
} as const;

// Define action interfaces
interface ResetCertificateAction {
  type: typeof types.RESET_CERTIFICATE;
}

interface UpdateCertificateAction {
  type: typeof types.UPDATE_CERTIFICATE;
  payload: any;
}

interface DetectingTRCertificateVersionAction {
  type: typeof types.DETECTING_TR_CERTIFICATE_VERSION;
  payload: TokenRegistryVersions;
}

interface VerifyingCertificateAction {
  type: typeof types.VERIFYING_CERTIFICATE;
}

interface VerifyingCertificateCompletedAction {
  type: typeof types.VERIFYING_CERTIFICATE_COMPLETED;
  payload?: any;
}

interface VerifyingCertificateFailureAction {
  type: typeof types.VERIFYING_CERTIFICATE_FAILURE;
  payload: any;
}

interface CertificateObfuscateResetAction {
  type: typeof types.CERTIFICATE_OBFUSCATE_RESET;
}

interface CertificateObfuscateUpdateAction {
  type: typeof types.CERTIFICATE_OBFUSCATE_UPDATE;
  payload: string[];
}

interface RetrieveCertificateByActionPendingAction {
  type: typeof types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING;
}

interface RetrieveCertificateByActionSuccessAction {
  type: typeof types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS;
}

interface RetrieveCertificateByActionFailureAction {
  type: typeof types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE;
  payload: string;
}

interface UpdateFilenameAction {
  type: typeof types.UPDATE_FILENAME;
  payload: string;
}

interface UpdateDocumentSchemaAction {
  type: typeof types.UPDATE_DOCUMENT_SCHEMA;
  payload: DocumentSchemaType;
}

interface UpdateKeyIdAction {
  type: typeof types.UPDATE_KEY_ID;
  payload: string;
}

type CertificateAction =
  | ResetCertificateAction
  | UpdateCertificateAction
  | DetectingTRCertificateVersionAction
  | VerifyingCertificateAction
  | VerifyingCertificateCompletedAction
  | VerifyingCertificateFailureAction
  | CertificateObfuscateResetAction
  | CertificateObfuscateUpdateAction
  | RetrieveCertificateByActionPendingAction
  | RetrieveCertificateByActionSuccessAction
  | RetrieveCertificateByActionFailureAction
  | UpdateFilenameAction
  | UpdateDocumentSchemaAction
  | UpdateKeyIdAction;

// Reducer
export default function reducer(state: CertificateState = initialState, action: CertificateAction): CertificateState {
  switch (action.type) {
    case types.RESET_CERTIFICATE:
      return {
        ...initialState,
      };
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload,
        rawModified: action.payload,
      };
    case types.DETECTING_TR_CERTIFICATE_VERSION:
      return {
        ...state,
        verificationPending: true,
        tokenRegistryVersion: action.payload,
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
    case types.CERTIFICATE_OBFUSCATE_RESET:
      return {
        ...initialState,
        filename: state.filename,
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
    case types.UPDATE_FILENAME:
      return {
        ...state,
        filename: action.payload,
      };
    case types.UPDATE_DOCUMENT_SCHEMA:
      return {
        ...state,
        documentSchema: action.payload,
      };
    case types.UPDATE_KEY_ID:
      return {
        ...state,
        keyId: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export function resetCertificateState(): ResetCertificateAction {
  return {
    type: types.RESET_CERTIFICATE,
  };
}

export function updateCertificate(payload: any): UpdateCertificateAction {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload,
  };
}

export const detectingTRCertificateVersion = (payload: TokenRegistryVersions): DetectingTRCertificateVersionAction => ({
  type: types.DETECTING_TR_CERTIFICATE_VERSION,
  payload,
});

export function applyPrivacyFilter(payload: string[]): CertificateObfuscateUpdateAction {
  return {
    type: types.CERTIFICATE_OBFUSCATE_UPDATE,
    payload,
  };
}

export const processQrCode = (payload: any) => ({
  type: types.CERTIFICATE_PROCESS_QR_CODE,
  payload,
});

export const verifyingCertificateCompleted = (payload?: any): VerifyingCertificateCompletedAction => ({
  type: types.VERIFYING_CERTIFICATE_COMPLETED,
  payload,
});

export const verifyingCertificateFailure = (payload: any): VerifyingCertificateFailureAction => ({
  type: types.VERIFYING_CERTIFICATE_FAILURE,
  payload,
});

export interface RetrieveCertificateByActionPayload {
  uri: string;
  key?: string;
}

export interface RetrieveCertificateByActionAnchor {
  key: string;
}

export function retrieveCertificateByAction(
  payload: RetrieveCertificateByActionPayload,
  anchor: RetrieveCertificateByActionAnchor
) {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION,
    payload,
    anchor,
  };
}

export function retrieveCertificateByActionFailure(payload: string): RetrieveCertificateByActionFailureAction {
  return {
    type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
    payload,
  };
}

export function updateFilename(payload: string): UpdateFilenameAction {
  return {
    type: types.UPDATE_FILENAME,
    payload,
  };
}

export function updateDocumentSchema(payload: DocumentSchemaType): UpdateDocumentSchemaAction {
  return {
    type: types.UPDATE_DOCUMENT_SCHEMA,
    payload,
  };
}

export function updateKeyId(payload: string): UpdateKeyIdAction {
  return {
    type: types.UPDATE_KEY_ID,
    payload,
  };
}

// Selectors
export function getCertificate(store: { certificate: CertificateState }): any {
  return store.certificate.rawModified;
}

export function getVerifying(store: { certificate: CertificateState }): boolean {
  return store.certificate.verificationPending;
}

export function getVerifyingCertificateFailure(store: { certificate: CertificateState }): any {
  return store.certificate.verificationError;
}

export function getVerificationStatus(store: { certificate: CertificateState }): any {
  return store.certificate.verificationStatus;
}

export function getCertificateByActionError(store: { certificate: CertificateState }): string | null {
  return store.certificate.retrieveCertificateByActionError;
}

export function getFilename(store: { certificate: CertificateState }): string {
  return store.certificate.filename;
}
