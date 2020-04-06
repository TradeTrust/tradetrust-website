import { isValid as isValidFromUpstream } from "@govtechsg/oa-verify";
const getFirstFragmentFor = (fragments, name) => fragments.filter((status) => status.name === name)[0];

export const getRevokeFragment = (fragments) =>
  getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreRevoked");
export const getAllButRevokeFragment = (fragments) => {
  const revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";
  return fragments.filter((status) => status.name !== revokeFragmentName);
};

// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments) => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 2 is the error code used by oa-verify in case of invalid address
  return documentStoreIssuedFragment?.reason?.code === 2 || tokenRegistryMintedFragment?.reason?.code === 2;
};

// using a custom isValid because @govtechsg/oa-verify will NOT throw an error when there are 2 identities
// with one skipped and one valid.
// in the case of Tradetrust, we want to make sure all identities are valid
export const isValid = (
  verificationFragments,
  types = ["DOCUMENT_STATUS", "DOCUMENT_INTEGRITY", "ISSUER_IDENTITY"]
) => {
  if (types.includes("ISSUER_IDENTITY")) {
    const dnsFragment = getFirstFragmentFor(verificationFragments, "OpenAttestationDnsTxt");
    return (
      isValidFromUpstream(verificationFragments, types) &&
      dnsFragment?.data?.every((issuer) => issuer.status === "VALID")
    );
  } else {
    return isValidFromUpstream(verificationFragments, types);
  }
};

// this function check if the reason of the error is that the document store or token has not been issued
export const certificateNotIssued = (fragments) => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 1 is the error code used by oa-verify in case of document / token not issued / minted
  return documentStoreIssuedFragment?.reason?.code === 1 || tokenRegistryMintedFragment?.reason?.code === 1;
};
