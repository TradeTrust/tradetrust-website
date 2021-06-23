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
  return <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} resetData={() => {}} />;
};

export const Verifying = () => {
  return (
    <CertificateDropZone
      handleCertificateChange={() => {}}
      handleFileError={() => {}}
      verifying={true}
      resetData={() => {}}
    />
  );
};

export const AllVerificationErrors = () => {
  return (
    <Router>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={false}
        verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]}
        resetData={() => {}}
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
        resetData={() => {}}
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
        resetData={() => {}}
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
        resetData={() => {}}
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
        resetData={() => {}}
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
        resetData={() => {}}
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
        resetData={() => {}}
      />
    </Router>
  );
};
