import { isValid, VerificationFragment } from "@govtechsg/oa-verify";
import { NETWORK } from "../../config";
const getFirstFragmentFor = (fragments: VerificationFragment[], name: string) =>
  fragments.filter((status) => status.name === name)[0];

const issuedFragmentName = "OpenAttestationDocumentIssued";
const consumedFragmentName = "OpenAttestationDocumentConsumed";
let revokeFragmentName: string;
if (NETWORK === "Corda Enterprise") revokeFragmentName = "OpenAttestationDocumentRevoked";
else revokeFragmentName = "OpenAttestationEthereumDocumentStoreRevoked";

export const getIssuedFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name === issuedFragmentName && status.status !== "SKIPPED");
export const getNotRevokeFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name !== revokeFragmentName && status.status !== "SKIPPED");
export const getRevokeFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name === revokeFragmentName && status.status !== "SKIPPED");

export const getConsumedFragment = (fragments: VerificationFragment[]) =>
  fragments.filter((status) => status.name === consumedFragmentName && status.status !== "SKIPPED");
// this function check if the reason of the error is that the document store or token registry is invalid
export const addressInvalid = (fragments: VerificationFragment[]) => {
  const documentStoreIssuedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumDocumentStoreIssued");
  const tokenRegistryMintedFragment = getFirstFragmentFor(fragments, "OpenAttestationEthereumTokenRegistryMinted");
  // 2 is the error code used by oa-verify in case of invalid address
  return documentStoreIssuedFragment?.reason?.code === 2 || tokenRegistryMintedFragment?.reason?.code === 2;
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
  const issuedFragments = getIssuedFragment(fragments);
  let issuedValid;
  if (NETWORK === "Corda Enterprise")
    issuedValid = issuedFragments.length > 0 ? isValid(issuedFragments, ["DOCUMENT_STATUS"]) : false;
  else issuedValid = isValid(notRevokeFragments, ["DOCUMENT_STATUS"]);

  const consumedFragments = getConsumedFragment(fragments);
  const revokeFragments = getRevokeFragment(fragments);
  const hashValid = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
  const consumedValid = consumedFragments.length > 0 ? isValid(consumedFragments, ["DOCUMENT_STATUS"]) : false;
  let revokedValid;
  if (NETWORK === "Corda Enterprise")
    revokedValid = revokeFragments.length > 0 ? !isValid(revokeFragments, ["DOCUMENT_STATUS"]) : false;
  else revokedValid = revokeFragments.length === 0 || isValid(revokeFragments, ["DOCUMENT_STATUS"]);
  const identityValid = isValid(fragments, ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, consumedValid, identityValid, revokedValid };
};
