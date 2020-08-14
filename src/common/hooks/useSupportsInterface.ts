import { useEffect, useState } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { Contract } from "ethers";

interface Erc165Contract extends Contract {
  supportsInterface: (interfaceId: []) => Promise<boolean> | undefined;
}

/**
 * This hook calls checks if token is an instance of given interfaceId
 */
export const useSupportsInterface = (contractInstance: Erc165Contract | undefined, interfaceId: string) => {
  const [isInterfaceType, setIsInterfaceType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    call: supportsInterface,
    value: isSameInterfaceType,
    errorMessage: supportsInterfaceErrorMessage,
    state,
  } = useContractFunctionHook(contractInstance, "supportsInterface");

  // Check if token is type of interface on load
  useEffect(() => {
    setIsLoading(true);
    supportsInterface(interfaceId);
  }, [interfaceId, supportsInterface]);

  // On result return, set the states
  useEffect(() => {
    if (state === "ERROR") {
      setErrorMessage(supportsInterfaceErrorMessage);
      setIsInterfaceType(false);
      setIsLoading(false);
    } else if (state === "CONFIRMED") {
      setIsInterfaceType(isSameInterfaceType);
      setIsLoading(false);
    }
  }, [isSameInterfaceType, state, supportsInterfaceErrorMessage]);

  return { isLoading, isInterfaceType, errorMessage };
};
