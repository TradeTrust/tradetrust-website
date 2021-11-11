import { VerificationFragment } from "@govtechsg/oa-verify";
import { interpretFragments, errorMessageHandling } from "./fragments";
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
  whenDocumentAddressInvalid,
  whenDocumentNotFound,
  whenServerError,
  whenUnhandledError,
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
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentValidAndIssuedByDns correctly", () => {
    expect(interpretFragments(whenDocumentValidAndIssuedByDns as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentValidAndIssuedByDid correctly", () => {
    expect(interpretFragments(whenDocumentValidAndIssuedByDid as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentHashInvalid correctly", () => {
    expect(interpretFragments(whenDocumentHashInvalid as VerificationFragment[])).toEqual({
      hashValid: false,
      issuedValid: true,
      identityValid: true,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentRevoked correctly", () => {
    expect(interpretFragments(whenDocumentRevoked as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: false,
      identityValid: true,
      revokedValid: true,
    });
  });
  it("should interpret whenDocumentIssuerIdentityInvalidDnsTxt correctly", () => {
    expect(interpretFragments(whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: false,
      revokedValid: false,
    });
  });
  it("should interpret whenDocumentIssuerIdentityInvalidDid correctly", () => {
    expect(interpretFragments(whenDocumentIssuerIdentityInvalidDid as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: false,
      revokedValid: false,
    });
  });
  it("should interpret whenTransferableDocumentVerified correctly", () => {
    expect(interpretFragments(whenTransferableDocumentVerified as VerificationFragment[])).toEqual({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
      revokedValid: false,
    });
  });
});

describe("errorMessageHandling", () => {
  it("should return all errors when fragments have multiple errors", () => {
    expect(errorMessageHandling(whenDocumentHashInvalidAndNotIssued as VerificationFragment[])).toStrictEqual([
      "HASH",
      "IDENTITY",
      "ISSUED",
    ]);
  });

  it("should return hash error when fragments integrity invalid", () => {
    expect(errorMessageHandling(whenDocumentHashInvalid as VerificationFragment[])).toStrictEqual(["HASH"]);
  });

  it("should return identity error when fragments identity invalid", () => {
    expect(errorMessageHandling(whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[])).toStrictEqual([
      "IDENTITY",
    ]);
  });

  it("should return revoked error when fragments indicate revoked", () => {
    expect(errorMessageHandling(whenDocumentRevoked as VerificationFragment[])).toStrictEqual(["REVOKED"]);
  });

  it("should return invalid address error when fragments contain invalid address", () => {
    expect(errorMessageHandling(whenDocumentAddressInvalid as VerificationFragment[])).toStrictEqual([
      "ADDRESS_INVALID",
    ]);
  });

  it("should return contract not found error when fragments contain contract not found error message", () => {
    expect(errorMessageHandling(whenDocumentNotFound as VerificationFragment[])).toStrictEqual(["CONTRACT_NOT_FOUND"]);
  });

  it("should return server error when fragments contain server error", () => {
    expect(errorMessageHandling(whenServerError as VerificationFragment[])).toStrictEqual(["SERVER_ERROR"]);
  });

  it("should return unhandled error when fragments contain an error that was not handled", () => {
    expect(errorMessageHandling(whenUnhandledError as VerificationFragment[])).toStrictEqual([
      "ETHERS_UNHANDLED_ERROR",
    ]);
  });
});
