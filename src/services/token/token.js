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

export const transferTokenOwnership = async newTokenOwner => await writeableTokenInstance.transferOwnership(newTokenOwner);

export const isEscrowContract = async () => await tokenOwnerInstance.isTitleEscrow();

export const getHolderAddress = async () => await tokenOwnerInstance.holder();
export const getBeneficiaryAddress = async () => await tokenOwnerInstance.beneficiary();
export const getApprovedBeneficiaryAddress = async () => await tokenOwnerInstance.endorsedTransferTarget();

export const changeHolder = async (newHolder) => await tokenOwnerInstance.changeHolder(newHolder);
export const changeBeneficiary = async (newBeneficiary) => await tokenOwnerInstance.transferTo(newBeneficiary);
export const endorseTransfer = async (newBeneficiary) => await tokenOwnerInstance.endorseTransfer(newBeneficiary);
