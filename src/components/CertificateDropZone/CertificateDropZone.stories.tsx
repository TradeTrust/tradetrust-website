import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { CertificateDropZone } from "./CertificateDropZone";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { states } from "../../reducers/certificate";
import { TYPES } from "../../constants/VerificationErrorMessages";

const RenderWithStore = ({ children, ...props }: any) => {
  const {
    raw,
    rawModified,
    verificationStatus,
    verificationPending,
    verificationError,
    retrieveCertificateByActionState,
    retrieveCertificateByActionError,
  } = props;

  const store = configureStore({
    certificate: {
      raw,
      rawModified,
      verificationStatus,
      verificationPending,
      verificationError,
      retrieveCertificateByActionState,
      retrieveCertificateByActionError,
    },
  });
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default {
  title: "Dropzone/CertificateDropZone",
  component: CertificateDropZone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Ready = () => (
  <RenderWithStore verificationError={null}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Verifying = () => (
  <RenderWithStore verificationPending={true}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AllVerificationErrors = () => (
  <RenderWithStore verificationError={[TYPES.HASH, TYPES.ISSUED, TYPES.IDENTITY]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidHash = () => (
  <RenderWithStore verificationError={[TYPES.HASH]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const NotIssued = () => (
  <RenderWithStore verificationError={[TYPES.ISSUED]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const IssuerIdentityInvalid = () => (
  <RenderWithStore verificationError={[TYPES.IDENTITY]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Revoked = () => (
  <RenderWithStore verificationError={[TYPES.REVOKED]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ActionError = () => (
  <RenderWithStore
    retrieveCertificateByActionState={states.FAILURE}
    retrieveCertificateByActionError={`Unable to decrypt certificate with key=undefined and type=OPEN-ATTESTATION-TYPE-1`}
  >
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidDocument = () => (
  <RenderWithStore verificationError={[TYPES.INVALID]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AddressInvalidError = () => (
  <RenderWithStore verificationError={[TYPES.ADDRESS_INVALID]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ContractNotFoundError = () => (
  <RenderWithStore verificationError={[TYPES.CONTRACT_NOT_FOUND]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidArgumentError = () => (
  <RenderWithStore verificationError={[TYPES.HASH, TYPES.INVALID_ARGUMENT]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ServerError = () => (
  <RenderWithStore verificationError={[TYPES.SERVER_ERROR]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const UnhandledError = () => (
  <RenderWithStore verificationError={[TYPES.ETHERS_UNHANDLED_ERROR]}>
    <CertificateDropZone />
  </RenderWithStore>
);
