import { ActionType, createAction, createStandardAction, getType } from "typesafe-actions";
import { Certificate, QRCode, Template } from "../types/tradetrust";

export const resetCertificateState = createAction("RESET_CERTIFICATE");
export const updateCertificate = createStandardAction("UPDATE_CERTIFICATE")<Certificate>();
export const sendCertificate = createStandardAction("SENDING_CERTIFICATE")<Certificate>();
export const sendCertificateReset = () => createAction("SENDING_CERTIFICATE_RESET");
export const updateObfuscatedCertificate = createStandardAction("CERTIFICATE_OBFUSCATE_UPDATE")<Certificate>();
export const registerTemplates = createStandardAction("CERTIFICATE_TEMPLATE_REGISTER")<Template[]>();
export const selectTemplateTab = createStandardAction("CERTIFICATE_TEMPLATE_SELECT_TAB")<number>();
export const processQrCode = createStandardAction("CERTIFICATE_PROCESS_QR_CODE")<QRCode>();
export const verifyingCertificate = createAction("VERIFYING_CERTIFICATE");
type CertificateActionType = ActionType<
  | typeof resetCertificateState
  | typeof updateCertificate
  | typeof sendCertificate
  | typeof sendCertificateReset
  | typeof updateObfuscatedCertificate
  | typeof registerTemplates
  | typeof selectTemplateTab
  | typeof processQrCode
  | typeof verifyingCertificate
>;

export enum EmailState {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE"
}

export interface CertificateState {
  raw: Certificate | null;
  rawModified: Certificate | null;
  store: any;
  storeError: any;
  storeLoading: boolean;
  verificationPending: boolean;
  verificationStatus: any;
  verificationError: any;
  emailState: EmailState;
  emailError: any;
  templates: any;
  activeTemplateTab: number;
}

export const initialState: CertificateState = {
  raw: null,
  rawModified: null,
  store: null,
  storeError: null,
  storeLoading: false,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  emailState: EmailState.INITIAL,
  emailError: null,

  templates: null,
  activeTemplateTab: 0
};

// type IJobPostingSkillsActions = ActionType<typeof toggleAddedSkill | typeof unselectAddedSkills>;
// Reducers
export default function reducer(state = initialState, action: CertificateActionType): CertificateState {
  switch (action.type) {
    case getType(resetCertificateState):
      return {
        ...initialState
      };
    case getType(updateCertificate):
      return {
        ...initialState,
        raw: action.payload,
        rawModified: action.payload,
        store: null,
        storeError: null,
        storeLoading: true
      };
    case getType(verifyingCertificate):
      return {
        ...state,
        verificationPending: true,
        verificationStatus: null
      };
    case CertificateActionTypes.VERIFYING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        verificationPending: false,
        verificationStatus: action.payload
      };
    // case CertificateActionTypes.VERIFYING_CERTIFICATE_FAILURE:
    //   return {
    //     ...state,
    //     verificationPending: false,
    //     verificationError: action.payload
    //   };
    // case CertificateActionTypes.SENDING_CERTIFICATE:
    //   return {
    //     ...state,
    //     emailState: EmailState.PENDING,
    //     emailError: null
    //   };
    // case CertificateActionTypes.SENDING_CERTIFICATE_RESET:
    //   return {
    //     ...state,
    //     emailState: EmailState.INITIAL,
    //     emailError: null
    //   };
    // case CertificateActionTypes.SENDING_CERTIFICATE_SUCCESS:
    //   return {
    //     ...state,
    //     emailState: EmailState.SUCCESS,
    //     emailError: null
    //   };
    // case CertificateActionTypes.SENDING_CERTIFICATE_FAILURE:
    //   return {
    //     ...state,
    //     emailState: EmailState.FAILURE,
    //     emailError: action.payload
    //   };
    // case CertificateActionTypes.CERTIFICATE_OBFUSCATE_UPDATE:
    //   return {
    //     ...state,
    //     rawModified: action.payload
    //   };
    // case CertificateActionTypes.CERTIFICATE_TEMPLATE_REGISTER:
    //   return {
    //     ...state,
    //     templates: action.payload
    //   };
    // case CertificateActionTypes.CERTIFICATE_TEMPLATE_SELECT_TAB:
    //   return {
    //     ...state,
    //     activeTemplateTab: action.payload
    //   };
    default:
      return state;
  }
}
