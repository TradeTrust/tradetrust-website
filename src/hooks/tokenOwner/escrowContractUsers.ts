import { createOwner, TitleEscrowOwner } from "@govtechsg/oa-token";

import { getLogger } from "../../utils/logger";

import { useCallback, useEffect, useState } from "react";
import { useEthereumTransactionState, TransactionStateStatus, StateType } from "../helpers";
import { useProvider } from "../provider";
const { trace, error } = getLogger("hooks:escrowContractUsers");

type UseEscrowContractUsers = { state: StateType; holderAddress: string; beneficiaryAddress: string };

export const useEscrowContractUsers = ({
  escrowContractAddress
}: {
  escrowContractAddress: string;
}): UseEscrowContractUsers => {
  trace(`escrow contract address ${escrowContractAddress}`);
  const [holderAddress, setHolderAddress] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const { web3Provider } = useProvider();
  const [state, dispatch] = useEthereumTransactionState();
  const setDispatchCallback = useCallback(dispatch, []);

  const getEscrowContractUsers = useCallback(async () => {
    const titleEscrowInstance = await createOwner({ address: escrowContractAddress, web3Provider });
    if (!(titleEscrowInstance instanceof TitleEscrowOwner)) throw new Error("Address is not an Escrow contract");
    const [beneficiary, holder] = await Promise.all([titleEscrowInstance.beneficiary(), titleEscrowInstance.holder()]);
    trace(`beneficiary: ${beneficiary}, holder: ${holder}`);
    setHolderAddress(holder);
    setBeneficiaryAddress(beneficiary);
  }, [escrowContractAddress, web3Provider]);

  useEffect(() => {
    async function fetchEscrowContractUsers() {
      try {
        setDispatchCallback({ type: TransactionStateStatus.LOADING });
        await getEscrowContractUsers();
        setDispatchCallback({ type: TransactionStateStatus.SUCCESS });
      } catch (e) {
        error(`Error initialising token: ${e}`);
        setDispatchCallback({ type: TransactionStateStatus.ERROR, message: e.message });
      }
    }
    if (escrowContractAddress) fetchEscrowContractUsers();
  }, [escrowContractAddress, getEscrowContractUsers, setDispatchCallback]);
  return { state, beneficiaryAddress, holderAddress };
};
