import { isValid, VerificationFragment, AllVerificationFragment } from "@govtechsg/oa-verify";

const getFirstFragmentFor = (fragments: AllVerificationFragment[], name: string) =>
  fragments.filter((status) => status.name === name)[0];

const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
export const getNotRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] =>
  fragments.filter((status) => status.name !== revokeFragmentName && status.status !== "SKIPPED");
export const getRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] =>
  fragments.filter((status) => status.name === revokeFragmentName && status.status !== "SKIPPED");

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: AllVerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 2 is the error code used by oa-verify in case of invalid address
  return documentStoreIssuedFragment?.reason?.code === 2 || tokenRegistryMintedFragment?.reason?.code === 2;
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments: AllVerificationFragment[]): boolean => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return documentStoreIssuedFragment?.reason?.code === 1 || tokenRegistryMintedFragment?.reason?.code === 1;
};

interface interpretFragmentsReturnTypes {
  hashValid: boolean;
  issuedValid: boolean;
  identityValid: boolean;
  revokedValid: boolean;
}

export const interpretFragments = (fragments: VerificationFragment[]): interpretFragmentsReturnTypes => {
  const notRevokeFragments = getNotRevokeFragment(fragments);
  const revokeFragments = getRevokeFragment(fragments);
  const hashValid = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(notRevokeFragments, ["DOCUMENT_STATUS"]);
  const revokedValid = revokeFragments.length === 0 || isValid(revokeFragments, ["DOCUMENT_STATUS"]);
  const identityValid = isValid(fragments, ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, identityValid, revokedValid };
};
