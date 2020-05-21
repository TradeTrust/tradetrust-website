import { WrappedDocument, v2, v3 } from "@govtechsg/open-attestation";
import { verify } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

export const verifyDocument = async (
  document: WrappedDocument<v3.OpenAttestationDocument> | WrappedDocument<v2.OpenAttestationDocument>
) => {
  return verify(document, { network: NETWORK_NAME });
};
