import { useState, useCallback, useEffect } from "react";
import { ContractFunctionState } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import { TradeTrustErc721 } from "@govtechsg/token-registry/types/TradeTrustErc721";
import { providers, Signer } from "ethers";

const { error: errorLogger } = getLogger("services:userestoretoken");

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
      if (!contractInstance?.address) throw new Error("Token Registry Instance should have address");
      setState("PENDING_CONFIRMATION");

      const sendToNewEscrowReceipt = await contractInstance?.sendToNewTitleEscrow(
        previousBeneficiary,
        previousHolder,
        tokenId
      );

      const sendToNewEscrowTx = await sendToNewEscrowReceipt.wait();

      const deployedTitleEscrowArgs = sendToNewEscrowTx.events?.find((event) => event.event === "TitleEscrowDeployed")
        ?.args;

      if (!deployedTitleEscrowArgs || !deployedTitleEscrowArgs[0])
        throw new Error(`Address for deployed title escrow cannot be found. Tx: ${JSON.stringify(sendToNewEscrowTx)}`);

      const sendTokenArgs = sendToNewEscrowTx.events?.find((event) => event.event === "Transfer")?.args;
      if (!sendTokenArgs)
        throw new Error(`Token was not restored to owner and beneficiary. Tx: ${JSON.stringify(sendToNewEscrowTx)}`);
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
