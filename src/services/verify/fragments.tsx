import { isValid, VerificationFragment } from "@govtechsg/oa-verify";

const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
export const getNotRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] =>
  fragments.filter((status) => status.name !== revokeFragmentName && status.status !== "SKIPPED");
export const getRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] =>
  fragments.filter((status) => status.name === revokeFragmentName && status.status !== "SKIPPED");

interface interpretFragmentsReturnTypes {
  hashValid: boolean;
  issuedValid: boolean;
  identityValid: boolean;
  revokedValid: boolean;
}

// TODO: to handle all `skipped` scenario, probably a file format that is not .tt or .json
export const interpretFragments = (fragments: VerificationFragment[]): interpretFragmentsReturnTypes => {
  const notRevokeFragments = getNotRevokeFragment(fragments);
  const revokeFragments = getRevokeFragment(fragments);
  const hashValid = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(notRevokeFragments, ["DOCUMENT_STATUS"]);
  const revokedValid = revokeFragments.length === 0 || isValid(revokeFragments, ["DOCUMENT_STATUS"]);
  const identityValid = isValid(fragments, ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, identityValid, revokedValid };
};
