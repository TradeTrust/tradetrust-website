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

export const transferTokenOwnership = async (document, newTokenOwner) => {
  const tokenInstance = initializeToken(document, web3Provider);
  return await tokenInstance.transferOwnership(newTokenOwner);
};

//dummy method to replace with oa-token methods
export const getBeneficiaryAddress = async document => {
  console.log(document);
  return await Promise.resolve("0xA");
};

export const getHolderAddress = async document => {
  return await Promise.resolve("0xB");
};
