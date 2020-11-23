import { VerificationFragment } from "@govtechsg/oa-verify";
import { interpretFragments } from "./fragments";
import {
  whenDocumentHashInvalidAndNotIssued,
  whenDocumentNotIssued,
  whenDocumentValidAndIssuedByDns,
  whenDocumentValidAndIssuedByDid,
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentIssuerIdentityInvalidDid,
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
  it("should interpret whenDocumentValidAndIssuedByDns correctly", () => {
    expect(interpretFragments(whenDocumentValidAndIssuedByDns as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentValidAndIssuedByDid correctly", () => {
    expect(interpretFragments(whenDocumentValidAndIssuedByDid as VerificationFragment[])).toEqual({
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
  it("should interpret whenDocumentIssuerIdentityInvalidDnsTxt correctly", () => {
    expect(interpretFragments(whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: false,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentIssuerIdentityInvalidDid correctly", () => {
    expect(interpretFragments(whenDocumentIssuerIdentityInvalidDid as VerificationFragment[])).toEqual({
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
