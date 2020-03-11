/**
 *  TODO: Extract this code out to its own package to reuse in tradetrust-website
 */

import { ReadOnlyToken } from "@govtechsg/oa-token";

import { getLogger } from "../../utils/logger";

import { useState, useEffect, useCallback } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { useEthereumTransactionState, TransactionState } from "./helpers";
const { trace, error } = getLogger("useToken");

type UseReadOnlyToken = { state: TransactionState; tokenInstance: ReadOnlyToken | null; getTokenOwner: GetTokenOwner };
type GetTokenOwner = () => Promise<string>;

export const useReadOnlyToken = ({ document }: { document: WrappedDocument<any> }): UseReadOnlyToken => {
  trace(`document to initialize ${JSON.stringify(document)}`);

  const [tokenInstance, setTokenInstance] = useState<ReadOnlyToken | null>(null);
  const { state, setReady, setLoading, setError, setSuccess } = useEthereumTransactionState();

  const setErrorCallback = useCallback(setError, []);
  const setReadyCallback = useCallback(setReady, []);

  const getTokenOwner: GetTokenOwner = async (): Promise<string> => {
    try {
      if (!tokenInstance) {
        throw new Error(`Token is not initialised`);
      }
      setLoading();
      const tokenOwner = await tokenInstance.getOwner();
      setSuccess();
      return tokenOwner.address;
    } catch (e) {
      error(`Error minting token: ${e}`);
      setError(e);
    }
  };

  useEffect(() => {
    try {
      setTokenInstance(new ReadOnlyToken({ document }));
      setReadyCallback();
    } catch (e) {
      error(`Error initialising token: ${e}`);
      setErrorCallback(e);
    }
  }, [document, setReadyCallback, setErrorCallback]);

  return { state, tokenInstance, getTokenOwner };
};
