import { isValid, VerificationFragment, utils } from "@govtechsg/oa-verify";
import { TYPES } from "../../constants/VerificationErrorMessages";

interface interpretFragmentsReturnTypes {
  hashValid: boolean;
  issuedValid: boolean;
  identityValid: boolean;
  revokedValid: boolean;
}

// TODO: to handle all `skipped` scenario, probably a file format that is not .tt or .json
export const interpretFragments = (fragments: VerificationFragment[]): interpretFragmentsReturnTypes => {
  const hashValid = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
  const issuedValid = isValid(fragments, ["DOCUMENT_STATUS"]);
  const revokedValid = utils.certificateRevoked(fragments);
  const identityValid = isValid(fragments, ["ISSUER_IDENTITY"]);
  return { hashValid, issuedValid, identityValid, revokedValid };
};

export const errorMessageHandling = (fragments: VerificationFragment[]): string[] => {
  const { hashValid, issuedValid, identityValid, revokedValid } = interpretFragments(fragments);
  const errors = [];

  if (!hashValid) errors.push(TYPES.HASH);
  if (!identityValid) errors.push(TYPES.IDENTITY);
  if (!issuedValid) {
    if (revokedValid) errors.push(TYPES.REVOKED);
    else if (utils.isDocumentStoreAddressOrTokenRegistryAddressInvalid(fragments)) {
      // if the error is because the address is invalid, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ADDRESS_INVALID);
    } else if (utils.contractNotFound(fragments)) {
      // if the error is because the contract cannot be found, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.CONTRACT_NOT_FOUND);
    } else if (utils.serverError(fragments)) {
      // if the error is because cannot connect to Ethereum, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.SERVER_ERROR);
    } else if (utils.invalidArgument(fragments)) {
      // this error is caused when the merkle root is wrong, and should always be shown with the DOCUMENT_INTEGRITY error
      errors.push(TYPES.INVALID_ARGUMENT);
    } else if (utils.certificateNotIssued(fragments)) errors.push(TYPES.ISSUED);
    else if (!hashValid && !identityValid) {
      // this error is caused when the document is invalid, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.INVALID);
    } else {
      // if it's some unhandled error that we didn't foresee, then get rid of all errors and only keep this one
      errors.splice(0, errors.length);
      errors.push(TYPES.ETHERS_UNHANDLED_ERROR);
    }
  }

  return errors;
};
