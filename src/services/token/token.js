import { ReadOnlyToken, Writeable } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";

let tokenInstance;

export const initializeToken = async (document, web3Provider = undefined, wallet = undefined) => {
  tokenInstance = await (web3Provider && wallet
    ? new Writeable({ document, web3Provider, wallet })
    : new ReadOnlyToken({ document }));
};

export const getTokenOwner = async () => {
  return await tokenInstance.getOwner();
};

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};
