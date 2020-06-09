import React from "react";
import { DocumentStatus } from "./DocumentStatus";
import {
  whenDocumentValidAndIssued,
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentRevoked,
  whenDocumentIssuerIdentityInvalid,
  whenDocumentHashInvalidAndNotIssued,
  whenTransferableDocumentVerified,
} from "../../test/fixture/verifier-responses";

export default {
  title: "Document/Status",
  component: DocumentStatus,
};

export const DocumentValid = () => {
  return <DocumentStatus verificationStatus={whenDocumentValidAndIssued as []} />;
};

export const DocumentValidTransferable = () => {
  return <DocumentStatus verificationStatus={whenTransferableDocumentVerified as []} />;
};

export const DocumentTampered = () => {
  return <DocumentStatus verificationStatus={whenDocumentHashInvalid as []} />;
};

export const DocumentNotIssued = () => {
  return <DocumentStatus verificationStatus={whenDocumentNotIssued as []} />;
};

export const DocumentRevoked = () => {
  return <DocumentStatus verificationStatus={whenDocumentRevoked as []} />;
};

export const DocumentIssuerIdentityInvalid = () => {
  return <DocumentStatus verificationStatus={whenDocumentIssuerIdentityInvalid as []} />;
};

export const DocumentAllVerificationFail = () => {
  return <DocumentStatus verificationStatus={whenDocumentHashInvalidAndNotIssued as []} />;
};
