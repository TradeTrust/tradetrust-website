import { createOwner, TitleEscrowOwner } from "@govtechsg/oa-token";

import { getLogger } from "../../utils/logger";

import { useCallback, useEffect, useState } from "react";
import { useEthereumTransactionState, TransactionStateStatus } from "../helpers";
import { useProvider } from "../provider";
const { trace, error } = getLogger("hooks:escrowContractUsers");

type UseEscrowContractUsers = { state: TransactionStateStatus; holderAddress: string; beneficiaryAddress: string };

export const useEscrowContractUsers = ({
  escrowContractAddress
}: {
  escrowContractAddress: string;
}): UseEscrowContractUsers => {
  trace(`document to initialize ${JSON.stringify(document)}`);
  const [holderAddress, setHolderAddress] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const { web3Provider } = useProvider();
  const [state, dispatch] = useEthereumTransactionState();
  const setDispatchCallback = useCallback(dispatch, []);

  const getApprovedEscrowContractUsers = useCallback(async () => {
    const titleEscrowInstance = await createOwner({ address: escrowContractAddress, web3Provider });
    if (!(titleEscrowInstance instanceof TitleEscrowOwner)) throw new Error("Address is not an Escrow contract");
    const [beneficiary, holder] = await Promise.all([titleEscrowInstance.beneficiary(), titleEscrowInstance.holder()]);
    trace(`approved beneficiary: ${JSON.stringify(beneficiary)}, approved holder: ${holder}`);
    setHolderAddress(holder);
    setBeneficiaryAddress(beneficiary);
  }, [escrowContractAddress, web3Provider]);

  useEffect(() => {
    (async () => {
      try {
        setDispatchCallback({ type: TransactionStateStatus.LOADING, error: undefined });
        await getApprovedEscrowContractUsers();
        setDispatchCallback({ type: TransactionStateStatus.SUCCESS, error: undefined });
      } catch (e) {
        error(`Error initialising token: ${e}`);
        setDispatchCallback({ type: TransactionStateStatus.ERROR, message: e.message });
      }
    })();
  }, [escrowContractAddress, getApprovedEscrowContractUsers, setDispatchCallback]);
  return { state, beneficiaryAddress, holderAddress };
};
