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
import { NETWORK_NAME } from "../../config";
import {
  whenDocumentHashInvalidAndNotIssuedCorda,
  whenDocumentHashInvalidCorda,
  whenDocumentIssuerIdentityInvalidDidCorda,
  whenDocumentIssuerIdentityInvalidDnsTxtCorda,
  whenDocumentNotIssuedCorda,
  whenDocumentRevokedCorda,
  whenDocumentValidAndIssuedByDidCorda,
  whenDocumentValidAndIssuedByDnsCorda,
  whenTransferableDocumentVerifiedCorda,
} from "../../test/fixture/corda-verifier-responses";

describe("interpretFragments", () => {
  if (NETWORK_NAME === "Corda Enterprise") {
    // Corda test cases
    it("should interpret whenDocumentHashInvalidAndNotIssuedCorda correctly", () => {
      expect(interpretFragments(whenDocumentHashInvalidAndNotIssuedCorda as VerificationFragment[])).toEqual({
        consumedValid: false,
        hashValid: false,
        issuedValid: false,
        identityValid: false,
        revokedValid: false,
      });
    });
    it("should interpret whenDocumentNotIssuedCorda correctly", () => {
      expect(interpretFragments(whenDocumentNotIssuedCorda as VerificationFragment[])).toEqual({
        consumedValid: false,
        hashValid: true,
        issuedValid: false,
        identityValid: true,
        revokedValid: false,
      });
    });
    it("should interpret whenDocumentValidAndIssuedByDnsCorda correctly", () => {
      expect(interpretFragments(whenDocumentValidAndIssuedByDnsCorda as VerificationFragment[])).toEqual({
        consumedValid: true,
        hashValid: true,
        issuedValid: true,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentValidAndIssuedByDidCorda correctly", () => {
      expect(interpretFragments(whenDocumentValidAndIssuedByDidCorda as VerificationFragment[])).toEqual({
        consumedValid: true,
        hashValid: true,
        issuedValid: true,
        identityValid: false,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentHashInvalidCorda correctly", () => {
      expect(interpretFragments(whenDocumentHashInvalidCorda as VerificationFragment[])).toEqual({
        consumedValid: true,
        hashValid: false,
        issuedValid: true,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentRevokedCorda correctly", () => {
      expect(interpretFragments(whenDocumentRevokedCorda as VerificationFragment[])).toEqual({
        consumedValid: false,
        hashValid: true,
        issuedValid: true,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentIssuerIdentityInvalidDnsTxtCorda correctly", () => {
      expect(interpretFragments(whenDocumentIssuerIdentityInvalidDnsTxtCorda as VerificationFragment[])).toEqual({
        consumedValid: true,
        hashValid: true,
        issuedValid: true,
        identityValid: false,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentIssuerIdentityInvalidDidCorda correctly", () => {
      expect(interpretFragments(whenDocumentIssuerIdentityInvalidDidCorda as VerificationFragment[])).toEqual({
        consumedValid: true,
        hashValid: true,
        issuedValid: true,
        identityValid: false,
        revokedValid: true,
      });
    });
    it("should interpret whenTransferableDocumentVerifiedCorda correctly", () => {
      expect(interpretFragments(whenTransferableDocumentVerifiedCorda as VerificationFragment[])).toEqual({
        consumedValid: false,
        hashValid: true,
        issuedValid: false,
        identityValid: true,
        revokedValid: false,
      });
    });
  } else {
    it("should interpret whenDocumentHashInvalidAndNotIssued correctly", () => {
      expect(interpretFragments(whenDocumentHashInvalidAndNotIssued as VerificationFragment[])).toEqual({
        hashValid: false,
        issuedValid: false,
        consumedValid: false,
        identityValid: false,
        revokedValid: false,
      });
    });
    it("should interpret whenDocumentNotIssued correctly", () => {
      expect(interpretFragments(whenDocumentNotIssued as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: false,
        consumedValid: false,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentValidAndIssuedByDns correctly", () => {
      expect(interpretFragments(whenDocumentValidAndIssuedByDns as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentValidAndIssuedByDid correctly", () => {
      expect(interpretFragments(whenDocumentValidAndIssuedByDid as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentHashInvalid correctly", () => {
      expect(interpretFragments(whenDocumentHashInvalid as VerificationFragment[])).toEqual({
        hashValid: false,
        issuedValid: true,
        consumedValid: false,
        identityValid: true,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentRevoked correctly", () => {
      expect(interpretFragments(whenDocumentRevoked as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: true,
        revokedValid: false,
      });
    });
    it("should interpret whenDocumentIssuerIdentityInvalidDnsTxt correctly", () => {
      expect(interpretFragments(whenDocumentIssuerIdentityInvalidDnsTxt as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: false,
        revokedValid: true,
      });
    });
    it("should interpret whenDocumentIssuerIdentityInvalidDid correctly", () => {
      expect(interpretFragments(whenDocumentIssuerIdentityInvalidDid as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: false,
        revokedValid: true,
      });
    });
    it("should interpret whenTransferableDocumentVerified correctly", () => {
      expect(interpretFragments(whenTransferableDocumentVerified as VerificationFragment[])).toEqual({
        hashValid: true,
        issuedValid: true,
        consumedValid: false,
        identityValid: true,
        revokedValid: true,
      });
    });
  }
});
