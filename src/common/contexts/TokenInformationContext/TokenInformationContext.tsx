import { ContractFunctionState, useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";

interface TokenInformationContext {
  tokenRegistryAddress: string;
  tokenId: string;
  beneficiary?: string;
  holder?: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  changeHolder: TitleEscrow["changeHolder"];
  changeHolderState: ContractFunctionState;
  transferTo: TitleEscrow["transferTo"];
  transferToState: ContractFunctionState;
  endorseBeneficiary: TitleEscrow["endorseBeneficiary"];
  endorseBeneficiaryState: ContractFunctionState;
  approveNewTransferTargets: TitleEscrow["approveNewTransferTargets"];
  approveNewTransferTargetsState: ContractFunctionState;
  transferToNewEscrow: TitleEscrow["transferToNewEscrow"];
  transferToNewEscrowState: ContractFunctionState;
  initialize: (tokenRegistryAddress: string, tokenId: string) => void;
  isSurrendered: boolean;
}

const contractFunctionStub = () => {
  return undefined as any;
};

export const TokenInformationContext = createContext<TokenInformationContext>({
  tokenRegistryAddress: "",
  tokenId: "",
  initialize: () => {},
  changeHolder: contractFunctionStub,
  changeHolderState: "UNINITIALIZED",
  transferTo: contractFunctionStub,
  transferToState: "UNINITIALIZED",
  endorseBeneficiary: contractFunctionStub,
  endorseBeneficiaryState: "UNINITIALIZED",
  isSurrendered: false,
  approveNewTransferTargets: contractFunctionStub,
  approveNewTransferTargetsState: "UNINITIALIZED",
  transferToNewEscrow: contractFunctionStub,
  transferToNewEscrowState: "UNINITIALIZED",
});

export const TokenInformationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenId, setTokenId] = useState("");
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState("");
  const [holder, setHolder] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [approvedHolder, setApprovedHolder] = useState("");
  const [approvedBeneficiary, setApprovedBeneficiary] = useState("");
  const { provider } = useProviderContext();
  const { titleEscrow, updateTitleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);
  const isSurrendered = titleEscrow?.address === tokenRegistryAddress;

  // Contract Read Functions
  const { call: getHolder, value: holderArray } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiaryArray } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiaryArray } = useContractFunctionHook(
    titleEscrow,
    "approvedBeneficiary"
  );
  const { call: getApprovedHolder, value: approvedHolderArray } = useContractFunctionHook(
    titleEscrow,
    "approvedHolder"
  );

  // Contract Write Functions (available only after provider has been upgraded)
  const { send: transferTo, state: transferToState } = useContractFunctionHook(titleEscrow, "transferTo");
  const { send: changeHolder, state: changeHolderState } = useContractFunctionHook(titleEscrow, "changeHolder");
  const { send: endorseBeneficiary, state: endorseBeneficiaryState } = useContractFunctionHook(
    titleEscrow,
    "transferToNewEscrow"
  );
  const { send: approveNewTransferTargets, state: approveNewTransferTargetsState } = useContractFunctionHook(
    titleEscrow,
    "approveNewTransferTargets"
  );
  const { send: transferToNewEscrow, state: transferToNewEscrowState } = useContractFunctionHook(
    titleEscrow,
    "transferToNewEscrow"
  );

  const initialize = (address: string, id: string) => {
    setTokenId(id);
    setTokenRegistryAddress(address);
  };

  // Fetch all new information when title escrow is initialized or updated (due to actions)
  useEffect(() => {
    getHolder();
    getApprovedHolder();
    getBeneficiary();
    getApprovedBeneficiary();
  }, [getBeneficiary, getApprovedBeneficiary, getHolder, getApprovedHolder, titleEscrow]);

  // Update holder whenever holder transfer is successful
  useEffect(() => {
    if (changeHolderState === "CONFIRMED") getHolder();
  }, [changeHolderState, getHolder]);

  // Update entire title escrow whenever endorse is successful
  useEffect(() => {
    if (endorseBeneficiaryState === "CONFIRMED") updateTitleEscrow();
  }, [endorseBeneficiaryState, updateTitleEscrow]);

  // Update entire title escrow whenever transferTo is successful
  useEffect(() => {
    if (transferToState === "CONFIRMED") updateTitleEscrow();
  }, [transferToState, updateTitleEscrow]);

  // Update entire title escrow whenever endorse transfer to beneficiary and holder is successful
  useEffect(() => {
    if (transferToNewEscrowState === "CONFIRMED") updateTitleEscrow();
  }, [transferToNewEscrowState, updateTitleEscrow]);

  useEffect(() => {
    if (Array.isArray(holderArray)) return setHolder(holderArray[0]);
    return setHolder(holderArray);
  }, [holderArray]);

  useEffect(() => {
    if (Array.isArray(beneficiaryArray)) return setBeneficiary(beneficiaryArray[0]);
    return setBeneficiary(beneficiaryArray);
  }, [beneficiaryArray]);

  useEffect(() => {
    if (Array.isArray(approvedHolderArray)) return setApprovedHolder(approvedHolderArray[0]);
    return setApprovedHolder(approvedHolderArray);
  }, [approvedHolderArray]);

  useEffect(() => {
    if (Array.isArray(approvedBeneficiaryArray)) return setApprovedBeneficiary(approvedBeneficiaryArray[0]);
    return setApprovedBeneficiary(approvedBeneficiaryArray);
  }, [approvedBeneficiaryArray]);

  return (
    <TokenInformationContext.Provider
      value={{
        tokenId,
        tokenRegistryAddress,
        initialize,
        holder,
        beneficiary,
        approvedBeneficiary,
        approvedHolder,
        changeHolder,
        endorseBeneficiary,
        transferTo,
        changeHolderState,
        endorseBeneficiaryState,
        transferToState,
        isSurrendered,
        approveNewTransferTargets,
        approveNewTransferTargetsState,
        transferToNewEscrow,
        transferToNewEscrowState,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
