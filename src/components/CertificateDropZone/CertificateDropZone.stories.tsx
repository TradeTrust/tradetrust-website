import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { CertificateDropZone } from "./CertificateDropZone";
import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentHashInvalidAndNotIssued,
} from "../../test/fixture/verifier-responses";
import { VerificationFragment } from "@govtechsg/oa-verify";

export default {
  title: "Dropzone/CertificateDropZone",
  component: CertificateDropZone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Ready = () => {
  return <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} />;
};

export const Verifying = () => {
  return <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} verifying={true} />;
};

export const AllVerificationErrors = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]}
      />
    </Router>
  );
};

export const InvalidHash = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentHashInvalid as VerificationFragment[]}
      />
    </Router>
  );
};

export const NotIssued = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentNotIssued as VerificationFragment[]}
      />
    </Router>
  );
};

export const Revoked = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentRevoked as VerificationFragment[]}
      />
    </Router>
  );
};

export const IssuerIdentityInvalid = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[]}
      />
    </Router>
  );
};

export const FileError = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        fileError={true}
      />
    </Router>
  );
};

export const QrCodeError = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        fileError={false}
        verificationError={"QR Code is not formatted to TradeTrust specifications"}
      />
    </Router>
  );
};
