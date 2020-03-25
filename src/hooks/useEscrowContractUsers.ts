import { createOwner, TitleEscrowOwner } from "@govtechsg/oa-token";

import { getLogger } from "../utils/logger";

import { useEffect, useState } from "react";
import { useEthereumTransactionState, TransactionStateStatus, StateType } from "./useEthereumTransactionState";
import { useWeb3Provider } from "./useWeb3Provider";
const { trace, error } = getLogger("hooks:useEscrowContractUsers");

type UseEscrowContractUsers = { state: StateType; holderAddress: string; beneficiaryAddress: string };

export const useEscrowContractUsers = ({
  escrowContractAddress
}: {
  escrowContractAddress: string;
}): UseEscrowContractUsers => {
  trace(`escrow contract address ${escrowContractAddress}`);
  const [holderAddress, setHolderAddress] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const { web3Provider } = useWeb3Provider();
  const [state, dispatch] = useEthereumTransactionState();

  useEffect(() => {
    async function fetchEscrowContractUsers() {
      try {
        dispatch({ type: TransactionStateStatus.LOADING });
        const titleEscrowInstance = (await createOwner({
          address: escrowContractAddress,
          web3Provider
        }));
        if (!titleEscrowInstance.isTitleEscrow()) throw new Error("Address is not an Escrow contract");
        const [beneficiary, holder] = await Promise.all([
          titleEscrowInstance.beneficiary(),
          titleEscrowInstance.holder()
        ]);
        trace(`beneficiary: ${beneficiary}, holder: ${holder}`);
        setHolderAddress(holder);
        setBeneficiaryAddress(beneficiary);
        dispatch({ type: TransactionStateStatus.SUCCESS });
      } catch (e) {
        error(`Error initialising token: ${e}`);
        dispatch({ type: TransactionStateStatus.ERROR, message: e.message });
      }
    }
    if (escrowContractAddress) fetchEscrowContractUsers();
  }, [escrowContractAddress, dispatch, web3Provider]);
  return { state, beneficiaryAddress, holderAddress };
};
