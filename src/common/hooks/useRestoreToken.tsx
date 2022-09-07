import { useState, useCallback, useEffect } from "react";
import { ContractFunctionState } from "@govtechsg/ethers-contract-hook";
import { getLogger } from "../../utils/logger";
import { TradeTrustERC721 } from "@govtechsg/token-registry/contracts";
import { BigNumberish, providers, Signer } from "ethers";
import { UnsupportedNetworkError } from "../errors";

const { error: errorLogger } = getLogger("services:userestoretoken");

export const useRestoreToken = (
  provider: providers.Provider | Signer | undefined,
  contractInstance?: TradeTrustERC721
  // tokenId?: string
): {
  restoreToken: (tokenId: BigNumberish) => Promise<void>;
  state: ContractFunctionState;
  errorMessage?: string;
} => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");

  const restoreToken = async (tokenId: BigNumberish): Promise<void> => {
    setState("INITIALIZED");
    try {
      if (!provider) throw new UnsupportedNetworkError();
      if (!tokenId) throw new Error("Ownership data is not provided");
      if (!contractInstance?.address) throw new Error("Token Registry Instance should have address");

      setState("PENDING_CONFIRMATION");
      await contractInstance.restore(tokenId);
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
  // useEffect(() => () => reset(), [contractInstance, provider, reset, tokenId]);
  useEffect(() => () => reset(), [contractInstance, provider, reset]);

  return { restoreToken, state, errorMessage };
};
