import React from "react";
import { render, screen } from "@testing-library/react";
import { DetailedErrors } from "./DetailedErrors";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";

describe("DetailedErrors", () => {
  it("should display all verification error messages", () => {
    render(<DetailedErrors verificationError={[TYPES.ISSUED, TYPES.HASH, TYPES.IDENTITY]} />);
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureMessage)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureTitle)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.IDENTITY].failureMessage)).toBeInTheDocument();
  });

  it("should display only verification error message on fragment 'hash' when verification error is HASH", () => {
    render(<DetailedErrors verificationError={[TYPES.HASH]} />);
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
    render(<DetailedErrors verificationError={[TYPES.ISSUED]} />);
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
    render(<DetailedErrors verificationError={[TYPES.IDENTITY]} />);
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
    render(<DetailedErrors verificationError={[TYPES.REVOKED]} />);
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
    render(<DetailedErrors verificationError={[TYPES.INVALID]} />);
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
