import { useState, useCallback, useEffect } from "react";
import { useContractFunctionHook, ContractFunctionState } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import { TradeTrustErc721 } from "@govtechsg/token-registry/types/TradeTrustErc721";
import { TitleEscrowCreator } from "@govtechsg/token-registry/dist/ts/contracts/TitleEscrowCreator";
import { TitleEscrowCreatorFactory } from "@govtechsg/token-registry";
import { providers, Signer } from "ethers";
import { NETWORK } from "../../config";

const { error: errorLogger } = getLogger("services:userestoretoken");

interface CreatorContract {
  [network: string]: string;
}

// Address of TitleEscrowFactory for each network
const CREATOR_CONTRACTS: CreatorContract = {
  homestead: "0x907A4D491A09D59Bcb5dC38eeb9d121ac47237F1",
  ropsten: "0xB0dE5E22bAc12820b6dbF6f63287B1ec44026c83",
  rinkeby: "0xa51B8dAC076d5aC80507041146AC769542aAe195",
  // unknown is used for local test net, see integration test
  unknown: "0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953",
};

//Wraper Method to connect to instacne of TitleEscrowFactory
export const getTitleEscrowCreator = async (provider: providers.Provider): Promise<TitleEscrowCreator> => {
  const creatorContractAddress = CREATOR_CONTRACTS[NETWORK];
  if (!creatorContractAddress) throw new Error(`Title escrow contract creator is not declared for ${NETWORK} network`);
  return TitleEscrowCreatorFactory.connect(creatorContractAddress, provider);
};

/**
 * This hook restores tokens that has been surrendered to Token Registry
 * Restroing a document which has been surrendered to issuer takes 2 steps:
 * 1. Deploying TitleEscrow with owner and holder from last known beneficary
 * 2. Transfering ownership of document from Token registry to Titleescrow in step 1
 * @returns function which combines from process decribed
 * errorMessage is populated if any other error is returned
 * state is changed based on the step of the ethereum transaction
 */
export const useRestoreToken = (
  contractInstance: TradeTrustErc721 | undefined,
  provider: providers.Provider | Signer,
  tokenId: string | undefined
) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");

  const { send: sendToken, reset: sendTokenResetState } = useContractFunctionHook(contractInstance, "sendToken");

  const restoreToken = async (previousBeneficary: string): Promise<void> => {
    setState("INITIALIZED");
    try {
      if (!tokenId) throw new Error("Ownership data is not provided");
      const titleEscrowCreatorContract = await getTitleEscrowCreator(provider as providers.Provider);

      // Deploy new title escrow smart contract to own document
      const escrowDeploymentReceipt = await titleEscrowCreatorContract.deployNewTitleEscrow(
        contractInstance?.address ?? "",
        previousBeneficary,
        previousBeneficary
      );
      setState("PENDING_CONFIRMATION");

      const escrowDeploymentTx = await escrowDeploymentReceipt.wait();
      const deployedTitleEscrowArgs = escrowDeploymentTx.events?.find((event) => event.event === "TitleEscrowDeployed")
        ?.args;
      if (!deployedTitleEscrowArgs || !deployedTitleEscrowArgs[0])
        throw new Error(`Address for deployed title escrow cannot be found. Tx: ${JSON.stringify(escrowDeploymentTx)}`);
      const deployedTitleEscrowAddress = deployedTitleEscrowArgs[0];

      // use minter restore token method to send token back to last known bene and holder
      await sendToken(deployedTitleEscrowAddress, tokenId);
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
    sendTokenResetState();
  }, [sendTokenResetState]);

  // If any of the dependency is updated, should reset function
  useEffect(() => {
    return () => {
      reset();
    };
  }, [contractInstance, provider, reset, tokenId]);

  return { restoreToken, state, errorMessage };
};
