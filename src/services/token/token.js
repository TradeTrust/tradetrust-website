import { ReadOnlyToken, WriteableToken } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("saga:tokenService");

let tokenInstance;

export const initializeToken = async (document, web3Provider = undefined, wallet = undefined) => {
  trace(`web3 provider is: ${web3Provider} and wallet is: ${wallet}`);
  tokenInstance = await (web3Provider && wallet
    ? new WriteableToken({ document, web3Provider, wallet })
    : new ReadOnlyToken({ document }));
  trace(`token Instance: ${tokenInstance}`);
};

export const getTokenOwner = async () => {
  return await tokenInstance.getOwner();
};

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};
