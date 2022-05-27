import { useState, useCallback, useEffect } from "react";
import { ContractFunctionState } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { TitleEscrowCloneableFactory } from "@govtechsg/token-registry";
import { ContractReceipt, ContractTransaction, providers, Signer } from "ethers";
import { UnsupportedNetworkError } from "../errors";

const { error: errorLogger } = getLogger("services:userestoretoken");

const validateRestoredEntities = async (
  provider: providers.Provider | Signer,
  address: string,
  previousBeneficiary: string,
  previousHolder: string,
  transactionDetails: ContractReceipt
): Promise<void> => {
  const newTitleEscrow = await TitleEscrowCloneableFactory.connect(address, provider);
  const beneficiaryDeferred = newTitleEscrow.beneficiary();
  const holderDeferred = newTitleEscrow.holder();
  const [beneficiary, holder] = await Promise.all([beneficiaryDeferred, holderDeferred]);

  if (beneficiary !== previousBeneficiary || holder !== previousHolder)
    throw new Error(`Token was not restored to owner and beneficiary. Tx: ${JSON.stringify(transactionDetails)}`);
};

const processRestoreTransaction = async (
  previousBeneficiary: string,
  previousHolder: string,
  provider: providers.Provider | Signer,
  contractTransaction: ContractTransaction
): Promise<void> => {
  const contractTransactionTx = await contractTransaction.wait();
  const sendTokenArgs = contractTransactionTx.events?.find((event) => event.event === "TitleEscrowDeployed")?.args;
  const reject = false;
  if (sendTokenArgs) {
    const newTitleEscrowAddress = sendTokenArgs.escrowAddress;
    await validateRestoredEntities(
      provider,
      newTitleEscrowAddress,
      previousBeneficiary,
      previousHolder,
      contractTransactionTx
    );
  }
  if (reject) throw new Error(`Token was not successfully restored. Tx: ${JSON.stringify(contractTransactionTx)}`);
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
  provider: providers.Provider | Signer | undefined,
  contractInstance?: TradeTrustERC721,
  tokenId?: string
): {
  restoreToken: (previousBeneficiary: string, previousHolder: string) => Promise<void>;
  state: ContractFunctionState;
  errorMessage?: string;
} => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");

  const restoreToken = async (previousBeneficiary: string, previousHolder: string): Promise<void> => {
    setState("INITIALIZED");
    try {
      if (!provider) throw new UnsupportedNetworkError();
      if (!tokenId) throw new Error("Ownership data is not provided");
      if (!contractInstance?.address) throw new Error("Token Registry Instance should have address");

      setState("PENDING_CONFIRMATION");
      const transaction = await contractInstance.restoreTitle(previousBeneficiary, previousHolder, tokenId);
      processRestoreTransaction(previousBeneficiary, previousHolder, provider, transaction);
      setState("CONFIRMED");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(JSON.stringify(error));
        errorLogger(error);
        setState("ERROR");
      }
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
