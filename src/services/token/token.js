import { ReadOnlyToken, WriteableToken } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("saga:tokenService");

let writeableTokenInstance;
let readOnlyTokenInstance;

export const initializeTokenInstance = async (document, web3Provider = undefined, wallet = undefined) => {
  if (web3Provider && wallet) writeableTokenInstance = await new WriteableToken({ document, web3Provider, wallet });
  else readOnlyTokenInstance = await new ReadOnlyToken({ document });
};

export const transactionMinedReceipt = async txHash => {
  const receipt = await writeableTokenInstance.web3Provider.waitForTransaction(txHash);
  return receipt;
};

export const getTokenOwner = async ({ document }) => {
  if (!readOnlyTokenInstance) await initializeTokenInstance(document);
  return await readOnlyTokenInstance.getOwner();
};

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};

export const transferTokenOwnership = async newTokenOwner => {
  return await writeableTokenInstance.transferOwnership(newTokenOwner);
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
