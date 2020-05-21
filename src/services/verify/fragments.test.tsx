import { VerificationFragment } from "@govtechsg/oa-verify";
import { interpretFragments } from "./fragments";
import {
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentNotIssued,
  whenDocumentValidAndIssued,
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentIssuerIdentityInvalid,
  whenTransferableDocumentVerified,
} from "../../test/fixture/verifier-responses";

describe("interpretFragments", () => {
  it("should interpret whenDocumentHashInvalidAndNotIssued correctly", () => {
    expect(interpretFragments(whenDocumentHashInvalidAndNotIssued as VerificationFragment[])).toEqual({
      hashValid: false,
      issuedValid: false,
      identityValid: false,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentNotIssued correctly", () => {
    expect(interpretFragments(whenDocumentNotIssued as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: false,
      identityValid: true,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentValidAndIssued correctly", () => {
    expect(interpretFragments(whenDocumentValidAndIssued as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentHashInvalid correctly", () => {
    expect(interpretFragments(whenDocumentHashInvalid as VerificationFragment[])).toEqual({
      hashValid: false,
      issuedValid: true,
      identityValid: true,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentRevoked correctly", () => {
    expect(interpretFragments(whenDocumentRevoked as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentIssuerIdentityInvalid correctly", () => {
    expect(interpretFragments(whenDocumentIssuerIdentityInvalid as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: false,
      revokedValid: true,
    });
  });
  it("should interpret whenTransferableDocumentVerified correctly", () => {
    expect(interpretFragments(whenTransferableDocumentVerified as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: true,
    });
  });
});
