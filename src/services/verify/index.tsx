import {
  verificationBuilder,
  openAttestationVerifiers,
  openAttestationDidIdentityProof,
  VerificationFragment,
  DocumentsToVerify,
} from "@govtechsg/oa-verify";
import { providers } from "ethers";
import { NETWORK_NAME } from "../../config";

export enum VerifierType {
  DEMO = "demo",
  CUSTOM = "custom",
}

const verificationOption =
  NETWORK_NAME === "local"
    ? { provider: new providers.JsonRpcProvider(), network: NETWORK_NAME }
    : { network: NETWORK_NAME };

const customVerifier = verificationBuilder(
  [...openAttestationVerifiers, openAttestationDidIdentityProof],
  verificationOption
);

const demoVerifier = verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof], {
  network: "ropsten",
});

export const verifyDocument = async (
  document: DocumentsToVerify,
  verifierType = VerifierType.CUSTOM
): Promise<VerificationFragment[]> => {
  return verifierType === VerifierType.DEMO ? demoVerifier(document) : customVerifier(document);
};
