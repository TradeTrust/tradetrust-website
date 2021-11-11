import React from "react";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { render, screen } from "@testing-library/react";
import { DetailedErrors } from "./DetailedErrors";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import {
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentRevoked,
  whenDocumentInvalid,
} from "../../../test/fixture/verifier-responses";

describe("DetailedErrors", () => {
  it("should display all verification error messages", () => {
    render(<DetailedErrors verificationStatus={whenDocumentHashInvalidAndNotIssued as VerificationFragment[]} />);
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'hash' when document is tampered", () => {
    render(<DetailedErrors verificationStatus={whenDocumentHashInvalid as VerificationFragment[]} />);
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'issue' when document is not issued", () => {
    render(<DetailedErrors verificationStatus={whenDocumentNotIssued as VerificationFragment[]} />);
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'identity' when document is not identified by DNS", () => {
    render(<DetailedErrors verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[]} />);
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureMessage)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).not.toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'issue' when document is revoked", () => {
    render(<DetailedErrors verificationStatus={whenDocumentRevoked as VerificationFragment[]} />);
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

  it("should display only verification error message 'invalid' when document has no fragments", () => {
    render(<DetailedErrors verificationStatus={whenDocumentInvalid as VerificationFragment[]} />);
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.HASH].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.IDENTITY].failureMessage)).not.toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureTitle)).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.INVALID].failureMessage)).toBeInTheDocument();
  });
});
