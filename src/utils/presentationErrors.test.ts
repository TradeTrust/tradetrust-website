import fs from "fs";
import path from "path";
import { errorMessages, fragments as trustvcFragments, VerificationFragment } from "@trustvc/trustvc";
import { getPresentationError } from "./presentationErrors";

const { TYPES, MESSAGES } = errorMessages;
const { W3CVpCode } = trustvcFragments as unknown as { W3CVpCode: Record<string, number> };

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../test/fixture/w3c/presentations", name), "utf8"));

const twoCredentials = fixture("valid/two_credentials.json");

/**
 * A presentation fragment set, as the verifier now emits them: a machine-readable `reason.code`
 * and the indices of the credentials at fault.
 *
 * These used to carry only `reason.message`, because the mapping was a table of regexes over
 * that prose living in this repo. It now lives in `@trustvc/trustvc`, keyed off the code — so a
 * fragment without one no longer describes anything this code can act on.
 */
const vpFragments = (name: string, code: number, credentialIndices: number[] = []): VerificationFragment[] =>
  [
    { name: "W3CVpSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "VALID" },
    { name: "W3CVpCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
    { name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" },
  ].map((f) =>
    f.name === name
      ? {
          ...f,
          status: "INVALID",
          reason: { code, codeString: String(code), message: "verifier prose, never shown" },
          data: { credentialIndices },
        }
      : f
  ) as any;

describe("getPresentationError", () => {
  it("returns nothing when no presentation fragment failed", () => {
    expect(getPresentationError(vpFragments("none", 0))).toBeUndefined();
    expect(getPresentationError([])).toBeUndefined();
    expect(getPresentationError(null)).toBeUndefined();
  });

  it("ignores a failing credential fragment — those are not presentation failures", () => {
    // The gate matters: without it this would claim every OpenAttestation failure as its own.
    const frags = [
      { name: "W3CSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "INVALID", reason: { message: "bad" } },
    ] as any;
    expect(getPresentationError(frags)).toBeUndefined();
  });

  it("reports an unsigned presentation as unsigned, not as tampering", () => {
    const error = getPresentationError(vpFragments("W3CVpSignatureIntegrity", W3CVpCode.PRESENTATION_UNSIGNED));
    expect(error?.type).toBe(TYPES.PRESENTATION_UNSIGNED);
    expect(error?.message).toMatch(/not signed/i);
    expect(error?.message).not.toMatch(/tampered/i);
  });

  it("distinguishes a holder mismatch from tampering", () => {
    const error = getPresentationError(vpFragments("W3CVpSignatureIntegrity", W3CVpCode.PRESENTATION_HOLDER_MISMATCH));
    expect(error?.type).toBe(TYPES.PRESENTATION_HOLDER_MISMATCH);
    expect(error?.message).toMatch(/signed by someone other than the holder/i);
  });

  it("reports a genuinely bad proof as tampering", () => {
    const error = getPresentationError(vpFragments("W3CVpSignatureIntegrity", W3CVpCode.PRESENTATION_PROOF_INVALID));
    expect(error?.type).toBe(TYPES.PRESENTATION_TAMPERED);
    expect(MESSAGES[error!.type].failureTitle).toMatch(/tampered/i);
  });

  it("reports an empty presentation with copy of its own", () => {
    const error = getPresentationError(vpFragments("W3CVpIssuerIdentity", W3CVpCode.PRESENTATION_EMPTY));
    expect(error?.type).toBe(TYPES.PRESENTATION_EMPTY);
    expect(error?.message).toMatch(/does not contain any credentials/i);
  });

  it("names the embedded credential at fault by position AND tab label", () => {
    const error = getPresentationError(
      vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_REVOKED, [1]),
      twoCredentials
    );
    expect(error?.message).toContain('Credential 2 ("BILL OF LADING")');
  });

  it("names several credentials, and pluralises around them", () => {
    const error = getPresentationError(
      vpFragments("W3CVpIssuerIdentity", W3CVpCode.CREDENTIAL_ISSUER_UNRESOLVABLE, [0, 1]),
      twoCredentials
    );
    expect(error?.message).toContain("Credential 1");
    expect(error?.message).toContain("Credential 2");
    expect(error?.message).toMatch(/they cannot be verified/i);
  });

  it("falls back to the position alone when the document is not supplied", () => {
    const error = getPresentationError(vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_REVOKED, [1]));
    expect(error?.message).toContain("Credential 2");
    expect(error?.message).not.toContain('("');
  });

  /**
   * The distinction this whole mechanism exists for. Both failures read "... has expired" in the
   * verifier's own words, and they need OPPOSITE advice: a holder can present again, but only an
   * issuer can reissue a credential. Collapsing them tells the user to do something that cannot
   * work.
   */
  it("separates an expired CREDENTIAL from an expired PRESENTATION, which need opposite advice", () => {
    const credential = getPresentationError(
      vpFragments("W3CVpCredentialStatus", W3CVpCode.CREDENTIAL_EXPIRED, [0]),
      twoCredentials
    );
    const presentation = getPresentationError(vpFragments("W3CVpCredentialStatus", W3CVpCode.PRESENTATION_EXPIRED));

    expect(credential?.message).toMatch(/issuing authority/i);
    expect(credential?.message).not.toMatch(/ask the holder/i);
    expect(presentation?.message).toMatch(/ask the holder/i);
    expect(presentation?.message).not.toMatch(/^credential \d/i);
  });

  it("blames an unresolvable issuer rather than tampering, even when the proof fails too", () => {
    // Verifying a credential's signature needs its issuer's key, so an unpublished DID fails
    // integrity as well. Reported the other way round, an intact document is called forged.
    const frags = [
      {
        name: "W3CVpSignatureIntegrity",
        type: "DOCUMENT_INTEGRITY",
        status: "INVALID",
        reason: { code: W3CVpCode.CREDENTIAL_SIGNATURE_INVALID, codeString: "x", message: "y" },
        data: { credentialIndices: [0] },
      },
      {
        name: "W3CVpIssuerIdentity",
        type: "ISSUER_IDENTITY",
        status: "INVALID",
        reason: { code: W3CVpCode.CREDENTIAL_ISSUER_UNRESOLVABLE, codeString: "x", message: "y" },
        data: { credentialIndices: [0] },
      },
    ] as any;
    const error = getPresentationError(frags, twoCredentials);
    expect(error?.type).toBe(TYPES.CREDENTIAL_ISSUER_UNRESOLVABLE);
    expect(error?.message).not.toMatch(/tampered/i);
  });

  it("treats an unrecognised presentation failure as unverifiable rather than tampered", () => {
    const error = getPresentationError(vpFragments("W3CVpCredentialStatus", 9999));
    expect(error?.type).toBe(TYPES.PRESENTATION_UNVERIFIABLE);
    expect(error?.message).not.toMatch(/tampered/i);
  });
});
