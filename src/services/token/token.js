import { ReadOnlyToken, WriteableToken } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("saga:tokenService");

let writeableTokenInstance;
let readOnlyTokenInstance;
let tokenOwnerInstance;

export const initializeTokenInstance = async (document, web3Provider = undefined, wallet = undefined) => {
  if (web3Provider && wallet) writeableTokenInstance = await new WriteableToken({ document, web3Provider, wallet });
  else readOnlyTokenInstance = await new ReadOnlyToken({ document });
};

export const getTokenOwner = async ({ document }) => {
  if (!readOnlyTokenInstance) await initializeTokenInstance(document);
  trace(`read only token instance ${readOnlyTokenInstance}`);
  return await readOnlyTokenInstance.getOwner().address;
};

export const createTokenOwnerInstance = async () => {
  tokenOwnerInstance = await writeableTokenInstance.getOwner();
}

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};

export const transferTokenOwnership = async newTokenOwner => {
  return await writeableTokenInstance.transferOwnership(newTokenOwner);
};

export const getHolderAddress = async () => {
  return await tokenOwnerInstance.holder();
};

export const isEscrowContract = async () => {
  return await tokenOwnerInstance.isTitleEscrow();
};

export const getBeneficiaryAddress = async () => {
  return await tokenOwnerInstance.beneficiary();
};

//dummy method to replace with oa-token methods
export const getApprovedBeneficiaryAddress = async () => {
  return await Promise.resolve(""); // 0xdkySHKrLdB1llgdj65Vf8gCipxilZBikNros1Nu9
};
