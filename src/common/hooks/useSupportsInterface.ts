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
  const [isInterfaceType, setIsInterfaceType] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    call: supportsInterface,
    value: isSameInterfaceType,
    errorMessage: supportsInterfaceErrorMessage,
    state,
  } = useContractFunctionHook(contractInstance, "supportsInterface");

  // Check if token is type of interface on load
  useEffect(() => {
    supportsInterface(interfaceId);
  }, [interfaceId, supportsInterface]);

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

  return { isInterfaceType, errorMessage };
};
