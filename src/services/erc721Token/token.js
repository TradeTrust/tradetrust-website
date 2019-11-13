import Token from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import {get} from "lodash";

const initializeToken = (document, web3Provider) => {
  return new Token(document, web3Provider);
};

export const getTokenOwner = async (document, web3Provider = undefined) => {
  const tokenInstance = initializeToken(document, web3Provider);
  return await tokenInstance.getOwner();
};


export const isERC721Token = (document) => {
    const data = getData(document);
    return get(data, "[0].issuers.tokenRegistry", false);
}
