import React from "react";
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import { DetailedErrors } from "./DetailedErrors";
import { errorMessages } from "@trustvc/trustvc";
import { VerificationFragment } from "@trustvc/trustvc";
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
} from "../../../test/fixture/verifier-responses";

const { TYPES, MESSAGES } = errorMessages;

describe("DetailedErrors", () => {
  it("should display all verification error messages", () => {
    render(
      <DetailedErrors
        verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]}
        verificationError={null}
      />
    );
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'hash' when verification error is HASH", () => {
    render(
      <DetailedErrors verificationStatus={whenDocumentHashInvalid as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'issue' when verification error is issued", () => {
    render(
      <DetailedErrors verificationStatus={whenDocumentNotIssued as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'identity' when verification error is IDENTITY", () => {
    render(
      <DetailedErrors
        verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[]}
        verificationError={null}
      />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'issue' when verification error is REVOKED", () => {
    render(
      <DetailedErrors verificationStatus={whenDocumentRevoked as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.getByText(MESSAGES[TYPES.REVOKED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.REVOKED].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message 'invalid' when verification error is INVALID", () => {
    render(
      <DetailedErrors verificationStatus={whenDocumentInvalid as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message 'server error' when verification error is SERVER_ERROR", () => {
    render(<DetailedErrors verificationStatus={whenServerError as VerificationFragment[]} verificationError={null} />);
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.SERVER_ERROR].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.SERVER_ERROR].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message 'invalid address' when verification error is ADDRESS_INVALID", () => {
    render(
      <DetailedErrors
        verificationStatus={whenDocumentAddressInvalid as VerificationFragment[]}
        verificationError={null}
      />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ADDRESS_INVALID].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ADDRESS_INVALID].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message 'contract not found' when verification error is CONTRACT_NOT_FOUND", () => {
    render(
      <DetailedErrors verificationStatus={whenDocumentNotFound as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.CONTRACT_NOT_FOUND].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.CONTRACT_NOT_FOUND].failureMessage)).toBeInTheDocument();
  });

  it("should display verification error message 'invalid argument' when verification error is INVALID_ARGUMENT", () => {
    render(
      <DetailedErrors verificationStatus={whenInvalidCallArgument as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID_ARGUMENT].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID_ARGUMENT].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message 'unhandled error' when verification error is ETHERS_UNHANDLED_ERROR", () => {
    render(
      <DetailedErrors verificationStatus={whenUnhandledError as VerificationFragment[]} verificationError={null} />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ETHERS_UNHANDLED_ERROR].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ETHERS_UNHANDLED_ERROR].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message 'client network error' when verification error is CLIENT_NETWORK_ERROR", () => {
    render(
      <DetailedErrors
        verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
        verificationError={TYPES.CLIENT_NETWORK_ERROR}
      />
    );
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.CLIENT_NETWORK_ERROR].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.CLIENT_NETWORK_ERROR].failureMessage)).toBeInTheDocument();
  });
});

describe("DetailedErrors — Verifiable Presentation", () => {
  const presentation = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../../test/fixture/w3c/presentations/valid/two_credentials.json"), "utf8")
  );

  /** A presentation fragment set where the named fragment failed with `reason`. */
  const vpFragments = (name: string, reason: string): VerificationFragment[] =>
    [
      { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "VALID" },
      { name: "W3CVpCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
      { name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" },
    ].map((f) => (f.name === name ? { ...f, status: "INVALID", reason: { message: reason } } : f)) as any;

  it("reports exactly one error, not the OpenAttestation-shaped set", () => {
    render(
      <DetailedErrors
        verificationStatus={vpFragments("W3CVpSignatureIntegrity", 'Presentation is not signed (no holder "proof").')}
        verificationError={null}
        document={presentation}
      />
    );
    expect(screen.getAllByRole("heading")).toHaveLength(1);
  });

  it("does not call an unsigned presentation tampered", () => {
    // errorMessageHandling was written for OpenAttestation: it sees an invalid DOCUMENT_INTEGRITY
    // and returns HASH, which would tell the user the document was tampered with.
    render(
      <DetailedErrors
        verificationStatus={vpFragments("W3CVpSignatureIntegrity", 'Presentation is not signed (no holder "proof").')}
        verificationError={null}
        document={presentation}
      />
    );
    expect(screen.getByText(/not signed, so the presenter cannot prove/i)).toBeInTheDocument();
    expect(screen.queryByText(errorMessages.MESSAGES[errorMessages.TYPES.HASH].failureMessage)).not.toBeInTheDocument();
  });

  it("names the credential at fault when the document is supplied", () => {
    render(
      <DetailedErrors
        verificationStatus={vpFragments("W3CVpCredentialStatus", "Embedded credential at index 1 has been revoked.")}
        verificationError={null}
        document={presentation}
      />
    );
    expect(screen.getByText(/Credential 2 \("BILL OF LADING"\)/)).toBeInTheDocument();
  });

  it("falls back to the position when no document is supplied", () => {
    render(
      <DetailedErrors
        verificationStatus={vpFragments("W3CVpCredentialStatus", "Embedded credential at index 1 has been revoked.")}
        verificationError={null}
      />
    );
    expect(screen.getByText(/Credential 2/)).toBeInTheDocument();
    expect(screen.queryByText(/BILL OF LADING/)).not.toBeInTheDocument();
  });

  it("uses the established copy where it already fits", () => {
    render(
      <DetailedErrors
        verificationStatus={vpFragments("W3CVpSignatureIntegrity", "Invalid signature.")}
        verificationError={null}
        document={presentation}
      />
    );
    const hash = errorMessages.MESSAGES[errorMessages.TYPES.HASH];
    expect(screen.getByText(hash.failureTitle)).toBeInTheDocument();
    expect(screen.getByText(hash.failureMessage)).toBeInTheDocument();
  });

  it("leaves credential documents on the existing path", () => {
    render(
      <DetailedErrors
        verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]}
        verificationError={null}
      />
    );
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(1);
  });
});
