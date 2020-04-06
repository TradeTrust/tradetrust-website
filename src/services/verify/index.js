import { verify } from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

export const verifyDocument = async (document) => {
  return verify(document, { network: NETWORK_NAME });
};
