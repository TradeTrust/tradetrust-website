/**
 *  TODO: Extract this code out to its own package to reuse in tradetrust-website
 */

import { WriteableToken, WriteableTitleEscrowOwner, TitleEscrowOwner, Owner } from "@govtechsg/oa-token";

import { getLogger } from "../../utils/logger";

import { useState, useEffect, useCallback } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { ethers, Wallet } from "ethers";
import { useEthereumTransactionState, TransactionState } from "./helpers";
const { trace, error } = getLogger("useToken");

type UseWriteableTitleEscrowOwner = {
  state: TransactionState;
  tokenInstance: TokenOwnerInstance;
  isEscrowContract: IsEscrowContract;
};
type IsEscrowContract = () => Promise<any>;
type TokenOwnerInstance = WriteableTitleEscrowOwner | Owner | null;
type UseWriteableTitleEscrowOwnerProps = {
  document: WrappedDocument<any>;
  web3Provider: ethers.providers.BaseProvider;
  wallet: Wallet;
};

export const useWriteableTitleEscrowOwner = ({
  document,
  web3Provider,
  wallet
}: UseWriteableTitleEscrowOwnerProps): UseWriteableTitleEscrowOwner => {
  trace(`document to initialize ${JSON.stringify(document)}`);

  const [tokenInstance, setTokenInstance] = useState<TokenOwnerInstance>(null);
  const { state, setReady, setMining, setLoading, setError, setSuccess } = useEthereumTransactionState();

  const setErrorCallback = useCallback(setError, []);
  const setReadyCallback = useCallback(setReady, []);

  const isEscrowContract: IsEscrowContract = async (): Promise<boolean | void> => {
    try {
      if (!tokenInstance) {
        throw new Error(`Token is not initialised`);
      }
      setLoading();
      const isEscrowContract = await tokenInstance.isTitleEscrow();
      setSuccess();
      return isEscrowContract;
    } catch (e) {
      error(`Error minting token: ${e}`);
      setError(e);
    }
  };

  const initializeToken = async ({ document, web3Provider, wallet }: UseWriteableTitleEscrowOwnerProps) => {
    try {
      const writeableTokenInstance = new WriteableToken({ document, web3Provider, wallet });
      setTokenInstance(await writeableTokenInstance.getOwner());
      setReadyCallback();
    } catch (e) {
      error(`Error initialising token: ${e}`);
      setErrorCallback(e);
    }
  };

  useEffect(() => {
    initializeToken({ document, web3Provider, wallet });
  }, [document, web3Provider, wallet, initializeToken]);

  return { state, tokenInstance, isEscrowContract };
};
