import { isValid as isValidFromUpstream, VerificationFragment, VerificationFragmentType } from "@govtechsg/oa-verify";
const getFirstFragmentFor = (fragments: VerificationFragment[], name: string) =>
  fragments.filter((status) => status.name === name)[0];

const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
export const getNotRevokeFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name !== revokeFragmentName && status.status !== "SKIPPED");
export const getRevokeFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name === revokeFragmentName && status.status !== "SKIPPED");

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: VerificationFragment[]) => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 2 is the error code used by oa-verify in case of invalid address
  return documentStoreIssuedFragment?.reason?.code === 2 || tokenRegistryMintedFragment?.reason?.code === 2;
};

// using a custom isValid because @govtechsg/oa-verify will NOT throw an error when there are 2 identities
// with one skipped and one valid.
// in the case of Tradetrust, we want to make sure all identities are valid
export const isValid = (
  verificationFragments: VerificationFragment[],
  types: VerificationFragmentType[] = ["DOCUMENT_STATUS", "DOCUMENT_INTEGRITY", "ISSUER_IDENTITY"]
) => {
  if (types.includes("ISSUER_IDENTITY")) {
    const dnsFragment = getFirstFragmentFor(verificationFragments, "OpenAttestationDnsTxt");
    return (
      isValidFromUpstream(verificationFragments, types) &&
      dnsFragment?.data?.every((issuer: VerificationFragment) => issuer.status === "VALID")
    );
  } else {
    return isValidFromUpstream(verificationFragments, types);
  }
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments: VerificationFragment[]) => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return documentStoreIssuedFragment?.reason?.code === 1 || tokenRegistryMintedFragment?.reason?.code === 1;
};

export const interpretFragments = (fragments: VerificationFragment[]) => {
  const notRevokeFragments = getNotRevokeFragment(fragments);
  const revokeFragments = getRevokeFragment(fragments);
  const hashValid = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(notRevokeFragments, ["DOCUMENT_STATUS"]);
  const revokedValid = revokeFragments.length === 0 || isValid(revokeFragments, ["DOCUMENT_STATUS"]);
  const identityValid = isValid(fragments, ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, identityValid, revokedValid };
};
