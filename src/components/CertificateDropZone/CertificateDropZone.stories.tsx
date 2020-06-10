import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import CertificateDropZone from "./CertificateDropZone";
import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalid,
  whenDocumentHashInvalidAndNotIssued,
} from "../../test/fixture/verifier-responses";

export default {
  title: "Dropzone/CertificateDropZone",
  component: CertificateDropZone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Ready = () => {
  return <CertificateDropZone />;
};

export const Verifying = () => {
  return <CertificateDropZone verifying={true} />;
};

export const AllVerificationErrors = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} verificationStatus={whenDocumentHashInvalidAndNotIssued} />
    </Router>
  );
};

export const InvalidHash = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} verificationStatus={whenDocumentHashInvalid} />
    </Router>
  );
};

export const NotIssued = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} verificationStatus={whenDocumentNotIssued} />
    </Router>
  );
};

export const Revoked = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} verificationStatus={whenDocumentRevoked} />
    </Router>
  );
};

export const IssuerIdentityInvalid = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} verificationStatus={whenDocumentIssuerIdentityInvalid} />
    </Router>
  );
};

export const FileError = () => {
  return (
    <Router>
      <CertificateDropZone verifying={false} fileError={true} />
    </Router>
  );
};
