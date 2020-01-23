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
  const tokenOwner = await readOnlyTokenInstance.getOwner();
  trace(`token owner when instance is read only ${tokenOwner}`);
  return tokenOwner.address;
};

export const createTokenOwnerInstance = async () => {
  tokenOwnerInstance = await writeableTokenInstance.getOwner();
};

export const isERC721Token = document => {
  const data = getData(document);
  return get(data, "issuers[0].tokenRegistry", false);
};

export const transferTokenOwnership = async newTokenOwner =>
  await writeableTokenInstance.transferOwnership(newTokenOwner);

export const isEscrowContract = async () => await tokenOwnerInstance.isTitleEscrow();

export const getHolderAddress = async () => await tokenOwnerInstance.holder();
export const getBeneficiaryAddress = async () => await tokenOwnerInstance.beneficiary();
export const getApprovedBeneficiaryAddress = async () => {
  const addressZero = "0x0000000000000000000000000000000000000000";
  const endorsedAddress = await tokenOwnerInstance.endorsedTransferTarget();
  return endorsedAddress === addressZero ? "" : endorsedAddress;
};

export const changeHolder = async newHolder => {
  trace(`new holder address: ${newHolder}`);
  await tokenOwnerInstance.changeHolder(newHolder);
};
export const endorseBeneficiaryTransfer = async newBeneficiary => {
  trace(`new beneficiary address: ${newBeneficiary}`);
  await tokenOwnerInstance.transferTo(newBeneficiary);
};
export const endorseTransfer = async newBeneficiary => await tokenOwnerInstance.endorseTransfer(newBeneficiary);
export const surrenderToken = async () => await writeableTokenInstance.surrender();
