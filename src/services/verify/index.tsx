import {
  verificationBuilder,
  openAttestationVerifiers,
  openAttestationDidIdentityProof,
  VerificationFragment,
  DocumentsToVerify,
} from "@govtechsg/oa-verify";
import { providers } from "ethers";
import { NETWORK_NAME } from "../../config";

const verificationOption =
  NETWORK_NAME === "local"
    ? { provider: new providers.JsonRpcProvider(), network: NETWORK_NAME }
    : { network: NETWORK_NAME };

const customVerify = verificationBuilder(
  [...openAttestationVerifiers, openAttestationDidIdentityProof],
  verificationOption
);

export const verifyDocument = async (document: DocumentsToVerify): Promise<VerificationFragment[]> => {
  return customVerify(document);
};
