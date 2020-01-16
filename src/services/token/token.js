import { ReadOnlyToken, WriteableToken } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("saga:tokenService");

let tokenInstance;

export const initializeTokenInstance = async (document, web3Provider = undefined, wallet = undefined) => {
  trace(`web3 provider is: ${web3Provider} and wallet is: ${wallet}`);
  tokenInstance = await (web3Provider && wallet
    ? new WriteableToken({ document, web3Provider, wallet })
    : new ReadOnlyToken({ document }));
  trace(`token Instance: ${tokenInstance}`);
};

export const transactionMinedReceipt = async txHash => {
  const receipt = await tokenInstance.web3Provider.waitForTransaction(txHash);
  return receipt;
};

export const getTokenOwner = async () => {
  return await tokenInstance.getOwner();
};

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};

export const transferTokenOwnership = async newTokenOwner => {
  return await tokenInstance.transferOwnership(newTokenOwner);
};

//dummy method to replace with oa-token methods
export const getHolderAddress = async () => {
  return await Promise.resolve("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"); // 0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C
};

export const isEscrowContract = async () => {
  return await Promise.resolve(true);
};

export const getBeneficiaryAddress = async document => {
  return await Promise.resolve("0xA");
};
export const getHolderAddress = async () => {
  return await Promise.resolve("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
};

export const getApprovedBeneficiaryAddress = async () => {
  return await Promise.resolve(""); // 0xdkySHKrLdB1llgdj65Vf8gCipxilZBikNros1Nu9
};
