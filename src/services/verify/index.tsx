import {
  verificationBuilder,
  openAttestationVerifiers,
  openAttestationDidIdentityProof,
  VerificationFragment,
  DocumentsToVerify,
} from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

const customVerify = verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof]);

export const verifyDocument = async (
  document: DocumentsToVerify
  // TODO: fix types when upgrading oa-verify
): Promise<VerificationFragment<any>[]> => {
  return customVerify(document, {
    network: NETWORK_NAME,
  });
};
