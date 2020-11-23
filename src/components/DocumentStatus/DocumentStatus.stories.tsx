import React from "react";
import { DocumentStatus, DocumentStatusUnStyled } from "./DocumentStatus";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentRevoked,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentHashInvalidAndNotIssued,
  whenTransferableDocumentVerified,
} from "../../test/fixture/verifier-responses";

export default {
  title: "Viewer/DocumentStatus",
  component: DocumentStatusUnStyled,
  parameters: {
    componentSubtitle: "All various statuses after document verification.",
  },
};

export const DocumentValid = () => {
  return <DocumentStatus verificationStatus={whenDocumentValidAndIssuedByDns as []} />;
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
  return <DocumentStatus verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as []} />;
};

export const DocumentAllVerificationFail = () => {
  return <DocumentStatus verificationStatus={whenDocumentHashInvalidAndNotIssued as []} />;
};
