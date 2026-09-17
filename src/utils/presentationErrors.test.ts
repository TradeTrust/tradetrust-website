import fs from "fs";
import path from "path";
import { errorMessages, VerificationFragment } from "@trustvc/trustvc";
import { getPresentationError } from "./presentationErrors";

const { TYPES } = errorMessages;

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../test/fixture/w3c/presentations", name), "utf8"));

const twoCredentials = fixture("valid/two_credentials.json");

/** A presentation fragment set where the named fragment failed with `reason`. */
const vpFragments = (name: string, reason: string): VerificationFragment[] =>
  [
    { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "VALID" },
    { name: "W3CVpCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
    { name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" },
  ].map((f) => (f.name === name ? { ...f, status: "INVALID", reason: { message: reason } } : f)) as any;

describe("getPresentationError", () => {
  it("returns nothing when no presentation fragment failed", () => {
    expect(getPresentationError(vpFragments("none", ""))).toBeUndefined();
    expect(getPresentationError([])).toBeUndefined();
    expect(getPresentationError(null)).toBeUndefined();
  });

  it("ignores a failing credential fragment — those are not presentation failures", () => {
    const frags = [
      { name: "W3CSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "INVALID", reason: { message: "bad" } },
    ] as any;
    expect(getPresentationError(frags)).toBeUndefined();
  });

  it("reports an unsigned presentation as invalid, not as tampering", () => {
    const error = getPresentationError(
      vpFragments(
        "W3CVpSignatureIntegrity",
        'Presentation is not signed (no holder "proof"), so ownership cannot be proven.'
      )
    );
    expect(error?.type).toBe(TYPES.INVALID);
    expect(error?.message).toMatch(/not signed/);
  });

  it("distinguishes a holder mismatch from tampering", () => {
    const error = getPresentationError(
      vpFragments("W3CVpSignatureIntegrity", "Presentation signer does not match the declared holder.")
    );
    expect(error?.type).toBe(TYPES.INVALID);
    expect(error?.message).toMatch(/someone other than the holder/);
  });

  it("reports a genuinely bad proof as tampering", () => {
    const error = getPresentationError(vpFragments("W3CVpSignatureIntegrity", "Invalid signature."));
    expect(error?.type).toBe(TYPES.HASH);
    // No override — the established HASH copy is used.
    expect(error?.message).toBeUndefined();
  });

  it("reports an empty presentation with copy of its own", () => {
    const error = getPresentationError(
      vpFragments("W3CVpIssuerIdentity", "Presentation contains no verifiable credentials.")
    );
    expect(error?.type).toBe(TYPES.INVALID);
    expect(error?.message).toBe("This presentation does not contain any credentials.");
  });

  it("names the embedded credential at fault by position AND tab label", () => {
    const error = getPresentationError(
      vpFragments("W3CVpCredentialStatus", "Embedded credential at index 1 has been revoked."),
      twoCredentials
    );
    expect(error?.type).toBe(TYPES.REVOKED);
    expect(error?.message).toContain('Credential 2 ("BILL OF LADING")');
    expect(error?.message).toMatch(/revoked by its issuer/);
  });

  it("names several credentials, and pluralises around them", () => {
    const error = getPresentationError(
      vpFragments("W3CVpCredentialStatus", "Embedded credential(s) at index 0, 1 have been revoked."),
      twoCredentials
    );
    expect(error?.message).toContain('Credential 1 ("CHAFTA COO") and Credential 2 ("BILL OF LADING")');
    expect(error?.message).toMatch(/have been revoked by their issuers/);
  });

  it("falls back to the position alone when the document is not supplied", () => {
    const error = getPresentationError(
      vpFragments("W3CVpCredentialStatus", "Embedded credential at index 1 has been revoked.")
    );
    expect(error?.message).toContain("Credential 2");
    expect(error?.message).not.toContain('("');
  });

  it("separates an expired CREDENTIAL from an expired PRESENTATION, which need opposite advice", () => {
    const credential = getPresentationError(
      vpFragments("W3CVpCredentialStatus", "Embedded credential at index 0 has expired (validUntil 2020-01-01)."),
      twoCredentials
    );
    // Only the issuer can reissue a credential — presenting again cannot help.
    expect(credential?.message).toMatch(/Ask the issuer to reissue/);

    const presentation = getPresentationError(
      vpFragments("W3CVpSignatureIntegrity", "Presentation has expired (validUntil 2020-01-01).")
    );
    expect(presentation?.message).toMatch(/Ask the holder to present the credentials again/);
  });

  it("blames an unresolvable issuer rather than tampering, even when the proof fails too", () => {
    // A DID that will not resolve necessarily fails the signature check as well; matched the
    // other way round, an unpublished did:web reads to the user as a tampered document.
    const frags = [
      {
        name: "W3CVpSignatureIntegrity",
        type: "DOCUMENT_INTEGRITY",
        status: "INVALID",
        reason: { message: "has an invalid signature: Cannot read properties of null" },
      },
      { name: "W3CVpCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
      {
        name: "W3CVpIssuerIdentity",
        type: "ISSUER_IDENTITY",
        status: "INVALID",
        reason: { message: "Could not resolve issuer(s): index 0 (did:web:nope.example)." },
      },
    ] as any;
    const error = getPresentationError(frags, twoCredentials);
    expect(error?.type).toBe(TYPES.IDENTITY);
    expect(error?.message).toMatch(/cannot be identified/);
  });

  it("treats an unrecognised presentation failure as invalid rather than tampered", () => {
    const error = getPresentationError(vpFragments("W3CVpIssuerIdentity", "something entirely new went wrong"));
    expect(error?.type).toBe(TYPES.INVALID);
    expect(error?.message).toBeUndefined();
  });
});
