import { useEffect, useState, useCallback } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { Contract } from "ethers";

interface Erc165Contract extends Contract {
  supportsInterface: (interfaceId: []) => Promise<boolean> | undefined;
}

/**
 * This hook calls checks if a given smart contract instance supports the given Erc165 interface
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md
 * @returns true if supportsInterface(id) returns true
 * @returns false if supportsInterface(id) returns false, or throws error because method is not supported, or contract not deployed
 * errorMessage is populated if any other error is returned
 */
export const useSupportsInterface = (contractInstance: Erc165Contract | undefined, interfaceId: string) => {
  const [isInterfaceType, setIsInterfaceType] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    call: supportsInterface,
    value: isSameInterfaceType,
    errorMessage: supportsInterfaceErrorMessage,
    state,
    reset: resetSupportsInterface,
  } = useContractFunctionHook(contractInstance, "supportsInterface");

  const reset = useCallback(() => {
    setIsInterfaceType(undefined);
    setErrorMessage(undefined);
    resetSupportsInterface();
  }, [resetSupportsInterface]);

  // Check if token is type of interface on load
  useEffect(() => {
    supportsInterface(interfaceId);
  }, [interfaceId, supportsInterface, contractInstance]);

  // On result return, infer the types
  useEffect(() => {
    if (state === "ERROR") {
      if (supportsInterfaceErrorMessage?.includes("contract not deployed")) {
        setIsInterfaceType(false);
      } else if (supportsInterfaceErrorMessage?.includes("call exception")) {
        setIsInterfaceType(false);
      } else {
        setErrorMessage(supportsInterfaceErrorMessage);
      }
    } else if (state === "CONFIRMED") {
      setIsInterfaceType(isSameInterfaceType);
    }
  }, [interfaceId, isSameInterfaceType, state, supportsInterfaceErrorMessage]);

  return { isInterfaceType, errorMessage, reset };
};
