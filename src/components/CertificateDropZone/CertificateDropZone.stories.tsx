import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { CertificateDropZone } from "./CertificateDropZone";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { states } from "../../reducers/certificate";
import { TYPES } from "../../constants/VerificationErrorMessages";
import {
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentRevoked,
  whenServerError,
  whenDocumentInvalid,
  whenDocumentAddressInvalid,
  whenDocumentNotFound,
  whenInvalidCallArgument,
  whenUnhandledError,
  whenDocumentValidAndIssuedByDns,
} from "../../test/fixture/verifier-responses";

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
  <RenderWithStore verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Verifying = () => (
  <RenderWithStore verificationPending={true}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AllVerificationErrors = () => (
  <RenderWithStore verificationStatus={whenDocumentHashInvalidAndNotIssued} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidHash = () => (
  <RenderWithStore verificationStatus={whenDocumentHashInvalid} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const NotIssued = () => (
  <RenderWithStore verificationStatus={whenDocumentNotIssued} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const IssuerIdentityInvalid = () => (
  <RenderWithStore verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const Revoked = () => (
  <RenderWithStore verificationStatus={whenDocumentRevoked} verificationError={[]}>
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
  <RenderWithStore verificationStatus={whenDocumentInvalid} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const AddressInvalidError = () => (
  <RenderWithStore verificationStatus={whenDocumentAddressInvalid} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ContractNotFoundError = () => (
  <RenderWithStore verificationStatus={whenDocumentNotFound} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const InvalidArgumentError = () => (
  <RenderWithStore verificationStatus={whenInvalidCallArgument} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ServerError = () => (
  <RenderWithStore verificationStatus={whenServerError} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const UnhandledError = () => (
  <RenderWithStore verificationStatus={whenUnhandledError} verificationError={[]}>
    <CertificateDropZone />
  </RenderWithStore>
);

export const ClientNetworkError = () => (
  <RenderWithStore
    verificationStatus={whenDocumentValidAndIssuedByDns}
    verificationError={[TYPES.CLIENT_NETWORK_ERROR]}
  >
    <CertificateDropZone />
  </RenderWithStore>
);
