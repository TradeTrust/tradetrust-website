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
import { Provider } from "react-redux";
import { configureStore } from "../../store";

const store = configureStore();

export default {
  title: "Dropzone/CertificateDropZone",
  component: CertificateDropZone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Ready = () => {
  return (
    <Provider store={store}>
      <CertificateDropZone handleCertificateChange={() => {}} handleFileError={() => {}} resetData={() => {}} />
    </Provider>
  );
};

export const Verifying = () => {
  return (
    <Provider store={store}>
      <CertificateDropZone
        handleCertificateChange={() => {}}
        handleFileError={() => {}}
        verifying={true}
        resetData={() => {}}
      />
    </Provider>
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
    <Provider store={store}>
      <Router>
        <CertificateDropZone
          handleCertificateChange={() => {}}
          handleFileError={() => {}}
          verifying={false}
          verificationStatus={whenDocumentHashInvalid as VerificationFragment[]}
          resetData={() => {}}
        />
      </Router>
    </Provider>
  );
};

export const NotIssued = () => {
  return (
    <Provider store={store}>
      <Router>
        <CertificateDropZone
          handleCertificateChange={() => {}}
          handleFileError={() => {}}
          verifying={false}
          verificationStatus={whenDocumentNotIssued as VerificationFragment[]}
          resetData={() => {}}
        />
      </Router>
    </Provider>
  );
};

export const Revoked = () => {
  return (
    <Provider store={store}>
      <Router>
        <CertificateDropZone
          handleCertificateChange={() => {}}
          handleFileError={() => {}}
          verifying={false}
          verificationStatus={whenDocumentRevoked as VerificationFragment[]}
          resetData={() => {}}
        />
      </Router>
    </Provider>
  );
};

export const IssuerIdentityInvalid = () => {
  return (
    <Provider store={store}>
      <Router>
        <CertificateDropZone
          handleCertificateChange={() => {}}
          handleFileError={() => {}}
          verifying={false}
          verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[]}
          resetData={() => {}}
        />
      </Router>
    </Provider>
  );
};

export const FileError = () => {
  return (
    <Provider store={store}>
      <Router>
        <CertificateDropZone
          handleCertificateChange={() => {}}
          handleFileError={() => {}}
          verifying={false}
          fileError={true}
          resetData={() => {}}
        />
      </Router>
    </Provider>
  );
};

export const QrCodeError = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
