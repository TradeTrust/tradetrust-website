import React, { createContext, useContext, useState, useEffect } from "react";
import { useProviderContext } from "../provider";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useContractFunctionHook, ContractFunctionState } from "@govtechsg/ethers-contract-hook";

interface TokenInformationContext {
  tokenRegistryAddress: string;
  tokenId: string;
  beneficiary?: string;
  approvedTransferTarget?: string;
  holder?: string;
  changeHolder: TitleEscrow["changeHolder"];
  changeHolderState: ContractFunctionState;
  transferTo: TitleEscrow["transferTo"];
  transferToState: ContractFunctionState;
  endorseBeneficiary: TitleEscrow["endorseBeneficiary"];
  endorseBeneficiaryState: ContractFunctionState;
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
});

export const TokenInformationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenId, setTokenId] = useState("");
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState("");
  const { provider } = useProviderContext();
  const { titleEscrow, updateTitleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);
  const isSurrendered = titleEscrow?.address === tokenRegistryAddress;

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedTransferTarget, value: approvedTransferTarget } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );

  // Contract Write Functions (available only after provider has been upgraded)
  const { send: transferTo, state: transferToState } = useContractFunctionHook(titleEscrow, "transferTo");
  const { send: changeHolder, state: changeHolderState } = useContractFunctionHook(titleEscrow, "changeHolder");
  const { send: endorseBeneficiary, state: endorseBeneficiaryState } = useContractFunctionHook(
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
    getBeneficiary();
    getApprovedTransferTarget();
  }, [getApprovedTransferTarget, getBeneficiary, getHolder, titleEscrow]);

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

  return (
    <TokenInformationContext.Provider
      value={{
        tokenId,
        tokenRegistryAddress,
        initialize,
        holder,
        beneficiary,
        approvedTransferTarget,
        changeHolder,
        endorseBeneficiary,
        transferTo,
        changeHolderState,
        endorseBeneficiaryState,
        transferToState,
        isSurrendered,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
