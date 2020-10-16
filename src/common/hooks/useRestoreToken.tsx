import { useState, useCallback, useEffect } from "react";
import { ContractFunctionState } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import { TradeTrustErc721 } from "@govtechsg/token-registry/types/TradeTrustErc721";
import { TitleEscrowCreator } from "@govtechsg/token-registry/dist/ts/contracts/TitleEscrowCreator";
import { TitleEscrowCreatorFactory, getTitleEscrowCreatorAddress } from "@govtechsg/token-registry";
import { providers, Signer } from "ethers";
import { NETWORK } from "../../config";

const { error: errorLogger } = getLogger("services:userestoretoken");

//Wrapper Method to connect to instance of TitleEscrowFactory
export const getTitleEscrowCreator = async (provider: providers.Provider): Promise<TitleEscrowCreator> => {
  let creatorContractAddress;
  switch (NETWORK) {
    case "ropsten":
      creatorContractAddress = getTitleEscrowCreatorAddress(3);
      break;
    case "rinkeby":
      creatorContractAddress = getTitleEscrowCreatorAddress(4);
      break;
    default:
      creatorContractAddress = getTitleEscrowCreatorAddress(1);
      break;
  }
  if (!creatorContractAddress) throw new Error(`Title escrow contract creator is not declared for ${NETWORK} network`);
  return TitleEscrowCreatorFactory.connect(creatorContractAddress, provider);
};

/**
 * This hook restores tokens that has been surrendered to Token Registry
 * Restoring a document which has been surrendered to issuer takes 2 steps:
 * 1. Deploying TitleEscrow with owner and holder from last known beneficiary
 * 2. Transferring ownership of document from Token registry to TitleEscrow in step 1
 * @returns function which combines from process described
 * errorMessage is populated if any other error is returned
 * state is changed based on the step of the ethereum transaction
 */
export const useRestoreToken = (
  provider: providers.Provider | Signer,
  contractInstance?: TradeTrustErc721,
  tokenId?: string
) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");

  const restoreToken = async (previousBeneficiary: string, previousHolder: string): Promise<void> => {
    setState("INITIALIZED");
    try {
      if (!tokenId) throw new Error("Ownership data is not provided");
      const titleEscrowCreatorContract = await getTitleEscrowCreator(provider as providers.Provider);

      // Deploy new title escrow smart contract to own document
      if (!contractInstance?.address) throw new Error("Token Registry Instance should have address");
      setState("PENDING_CONFIRMATION");
      const escrowDeploymentReceipt = await titleEscrowCreatorContract.deployNewTitleEscrow(
        contractInstance.address,
        previousBeneficiary,
        previousHolder
      );

      const escrowDeploymentTx = await escrowDeploymentReceipt.wait();
      const deployedTitleEscrowArgs = escrowDeploymentTx.events?.find((event) => event.event === "TitleEscrowDeployed")
        ?.args;
      if (!deployedTitleEscrowArgs || !deployedTitleEscrowArgs[0])
        throw new Error(`Address for deployed title escrow cannot be found. Tx: ${JSON.stringify(escrowDeploymentTx)}`);
      const deployedTitleEscrowAddress = deployedTitleEscrowArgs[0];

      // use minter restore token method to send token back to last known bene and holder
      const sendTokenReceipt = await contractInstance.sendToken(deployedTitleEscrowAddress, tokenId);
      const sendTokenTx = await sendTokenReceipt.wait();
      const sendTokenArgs = sendTokenTx.events?.find((event) => event.event === "Transfer")?.args;
      if (!sendTokenArgs || sendTokenArgs[1] !== deployedTitleEscrowAddress)
        throw new Error(`Token was not restored to owner and beneficiary. Tx: ${JSON.stringify(sendTokenTx)}`);
      setState("CONFIRMED");
    } catch (error) {
      setErrorMessage(error);
      errorLogger(error);
      setState("ERROR");
    }
  };

  const reset = useCallback(() => {
    setState("UNINITIALIZED");
    setErrorMessage(undefined);
  }, []);

  // If any of the dependency is updated, should reset function
  useEffect(() => () => reset(), [contractInstance, provider, reset, tokenId]);

  return { restoreToken, state, errorMessage };
};
