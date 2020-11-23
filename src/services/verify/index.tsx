import { WrappedDocument, v2, v3 } from "@govtechsg/open-attestation";
import { verificationBuilder, openAttestationVerifiers, openAttestationDidIdentityProof } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

const customVerify = verificationBuilder([...openAttestationVerifiers, openAttestationDidIdentityProof]);

export const verifyDocument = async (
  document: WrappedDocument<v3.OpenAttestationDocument> | WrappedDocument<v2.OpenAttestationDocument>
) => {
  return customVerify(document, {
    network: NETWORK_NAME,
  });
};
