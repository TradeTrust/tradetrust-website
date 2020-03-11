/**
 *  TODO: Extract this code out to its own package to reuse in tradetrust-website
 */

import { WriteableToken } from "@govtechsg/oa-token";

import { getLogger } from "../../utils/logger";

import { useState, useEffect, useCallback } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { ethers, Wallet } from "ethers";
import { useEthereumTransactionState, TransactionState } from "./helpers";
const { trace, error } = getLogger("useToken");

type UseWriteableToken = {
  state: TransactionState;
  tokenInstance: WriteableToken | null;
  surrenderToken: SurrenderToken;
};
type SurrenderToken = () => Promise<any>;

export const useWriteableToken = ({
  document,
  web3Provider,
  wallet
}: {
  document: WrappedDocument<any>;
  web3Provider: ethers.providers.BaseProvider;
  wallet: Wallet;
}): UseWriteableToken => {
  trace(`document to initialize ${JSON.stringify(document)}`);

  const [tokenInstance, setTokenInstance] = useState<WriteableToken | null>(null);
  const { state, setReady, setMining, setError, setSuccess } = useEthereumTransactionState();

  const setErrorCallback = useCallback(setError, []);
  const setReadyCallback = useCallback(setReady, []);

  const surrenderToken: SurrenderToken = async (): Promise<string | void> => {
    try {
      if (!tokenInstance) {
        throw new Error(`Token is not initialised`);
      }
      setMining();
      const txHash = await tokenInstance.surrender();
      setSuccess();
      return txHash;
    } catch (e) {
      error(`Error minting token: ${e}`);
      setError(e);
    }
  };

  useEffect(() => {
    try {
      setTokenInstance(new WriteableToken({ document, web3Provider, wallet }));
      setReadyCallback();
    } catch (e) {
      error(`Error initialising token: ${e}`);
      setErrorCallback(e);
    }
  }, [document, web3Provider, wallet, setReadyCallback, setErrorCallback]);

  return { state, tokenInstance, surrenderToken };
};
