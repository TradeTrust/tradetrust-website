import { useEffect, useState } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { Contract } from "ethers";

interface Erc165Contract extends Contract {
  supportsInterface: (interfaceId: []) => Promise<boolean> | undefined;
}

export const useSupportsInterface = (contractInstance: Erc165Contract | undefined, interfaceId: string) => {
  const [isInterfaceType, setIsInterfaceType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { call: supportsInterface, value: isSameInterfaceType, errorMessage, state } = useContractFunctionHook(
    contractInstance,
    "supportsInterface"
  );

  useEffect(() => {
    setIsLoading(true);
    supportsInterface(interfaceId);
  }, [interfaceId, supportsInterface]);

  useEffect(() => {
    if (state === "ERROR") {
      setIsInterfaceType(false);
    } else if (state === "CONFIRMED") {
      setIsInterfaceType(isSameInterfaceType);
    }
    setIsLoading(false);
  }, [errorMessage, isSameInterfaceType, state]);

  useEffect(() => {
    console.log("suportinterface state: " + state);
  });

  return { isLoading, isInterfaceType };
};
