import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { CertificateDropZone } from "./CertificateDropZone";
import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentAddressInvalid,
  whenDocumentNotFound,
  whenInvalidCallArgument,
  whenServerError,
  whenUnhandledError,
  whenDocumentInvalid,
} from "../../test/fixture/verifier-responses";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { states } from "../../reducers/certificate";

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
  <RenderWithStore verificationStatus={null}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Verifying = () => (
  <RenderWithStore verificationPending={true}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AllVerificationErrors = () => (
  <RenderWithStore verificationStatus={whenDocumentHashInvalidAndNotIssued}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidHash = () => (
  <RenderWithStore verificationStatus={whenDocumentHashInvalid}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const NotIssued = () => (
  <RenderWithStore verificationStatus={whenDocumentNotIssued}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const IssuerIdentityInvalid = () => (
  <RenderWithStore verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Revoked = () => (
  <RenderWithStore verificationStatus={whenDocumentRevoked}>
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
  <RenderWithStore verificationStatus={whenDocumentInvalid}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AddressInvalidError = () => (
  <RenderWithStore verificationStatus={whenDocumentAddressInvalid}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ContractNotFoundError = () => (
  <RenderWithStore verificationStatus={whenDocumentNotFound}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidArgumentError = () => (
  <RenderWithStore verificationStatus={whenInvalidCallArgument}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ServerError = () => (
  <RenderWithStore verificationStatus={whenServerError}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const UnhandledError = () => (
  <RenderWithStore verificationStatus={whenUnhandledError}>
    <CertificateDropZone />
  </RenderWithStore>
);
