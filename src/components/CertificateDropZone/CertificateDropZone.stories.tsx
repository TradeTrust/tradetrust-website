import React from "react";
import { CertificateDropZone } from "./CertificateDropZone";
import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentHashInvalidAndNotIssued,
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
  return <Provider store={store}>{children}</Provider>;
};

export default {
  title: "Dropzone/CertificateDropZone",
  component: CertificateDropZone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Ready = () => {
  return (
    <RenderWithStore verificationStatus={null}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const Verifying = () => {
  return (
    <RenderWithStore verificationPending={true}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const AllVerificationErrors = () => {
  return (
    <RenderWithStore verificationStatus={whenDocumentHashInvalidAndNotIssued}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const InvalidHash = () => {
  return (
    <RenderWithStore verificationStatus={whenDocumentHashInvalid}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const NotIssued = () => {
  return (
    <RenderWithStore verificationStatus={whenDocumentNotIssued}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const IssuerIdentityInvalid = () => {
  return (
    <RenderWithStore verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const Revoked = () => {
  return (
    <RenderWithStore verificationStatus={whenDocumentRevoked}>
      <CertificateDropZone />
    </RenderWithStore>
  );
};

export const ActionError = () => {
  return (
    <RenderWithStore
      retrieveCertificateByActionState={states.FAILURE}
      retrieveCertificateByActionError={`Unable to decrypt certificate with key=undefined and type=OPEN-ATTESTATION-TYPE-1`}
    >
      <CertificateDropZone />
    </RenderWithStore>
  );
};
