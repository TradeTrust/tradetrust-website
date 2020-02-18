import { ReadOnlyToken, WriteableToken, createOwner, WriteableTitleEscrowOwner } from "@govtechsg/oa-token";
import { getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import { getLogger } from "../../utils/logger";
import { getProvider } from "../etherjs";
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
export const getApprovedEscrowContractAddress = async () => {
  const addressZero = "0x0000000000000000000000000000000000000000";
  const endorsedAddress = await tokenOwnerInstance.endorsedTransferTarget();
  return endorsedAddress === addressZero ? "" : endorsedAddress;
};

export const changeHolder = async newHolder => {
  trace(`new holder address: ${newHolder}`);
  return await tokenOwnerInstance.changeHolder(newHolder);
};
export const endorseBeneficiaryTransfer = async newBeneficiary => {
  trace(`new beneficiary address: ${newBeneficiary}`);
  return await tokenOwnerInstance.transferTo(newBeneficiary);
};
export const endorseTransfer = async newBeneficiary => await tokenOwnerInstance.endorseTransfer(newBeneficiary);
export const surrenderToken = async () => await writeableTokenInstance.surrender();

export const deployEscrowContract = async ({ registryAddress, beneficiaryAddress, holderAddress }) => {
  const { provider, signer } = await getProvider();
  const contractOnwerInstance = await WriteableTitleEscrowOwner.deployEscrowContract({
    registryAddress,
    beneficiaryAddress,
    holderAddress,
    wallet: signer,
    web3Provider: provider
  });
  return contractOnwerInstance.address;
};

export const getApprovedEscrowContractUsers = async ({ contractAddress, web3Provider }) => {
  const titleEscrowInstance = await createOwner({ address: contractAddress, web3Provider });
  const approvedBeneficiary = await titleEscrowInstance.beneficiary();
  const approvedHolder = await titleEscrowInstance.holder();
  trace(`approved beneficiary: ${JSON.stringify(approvedBeneficiary)}, approved holder: ${approvedHolder}`);
  return { approvedBeneficiary, approvedHolder };
};
