import { isValid, VerificationFragment, utils } from "@govtechsg/oa-verify";

export const getRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] => {
  const getOpenAttestationEthereumDocumentStoreRevokedFragment = utils.getFragmentByName(
    "OpenAttestationEthereumDocumentStoreRevoked"
  );
  const revokeFragment = getOpenAttestationEthereumDocumentStoreRevokedFragment(fragments) as VerificationFragment;

  return utils.isValidFragment(revokeFragment) ||
    utils.isInvalidFragment(revokeFragment) ||
    utils.isErrorFragment(revokeFragment)
    ? [revokeFragment]
    : [];
};

export const getNotRevokeFragment = (fragments: VerificationFragment[]): VerificationFragment[] => {
  return fragments.filter((fragment) => fragment !== getRevokeFragment(fragments)[0]);
};

interface interpretFragmentsReturnTypes {
  hashValid: boolean;
  issuedValid: boolean;
  identityValid: boolean;
  revokedValid: boolean;
}

export const interpretFragments = (fragments: VerificationFragment[]): interpretFragmentsReturnTypes => {
  const revokeFragments = getRevokeFragment(fragments);
  const notRevokeFragments = getNotRevokeFragment(fragments);

  const hashValid = isValid(utils.getDocumentIntegrityFragments(fragments), ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(utils.getDocumentStatusFragments(notRevokeFragments), ["DOCUMENT_STATUS"]);
  const revokedValid =
    revokeFragments.length === 0 || isValid(utils.getDocumentStatusFragments(revokeFragments), ["DOCUMENT_STATUS"]);
  const identityValid = isValid(utils.getIssuerIdentityFragments(fragments), ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, identityValid, revokedValid };
};
