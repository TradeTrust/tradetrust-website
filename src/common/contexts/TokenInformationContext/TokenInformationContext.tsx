import { ContractFunctionState, useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  beneficiary?: string;
  holder?: string;
  titleEscrowOwner?: string;
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
  isTitleEscrow?: boolean;
  resetStates: () => void;
}

const contractFunctionStub = () => {
  return undefined as any;
};

export const TokenInformationContext = createContext<TokenInformationContext>({
  initialize: () => {},
  changeHolder: contractFunctionStub,
  changeHolderState: "UNINITIALIZED",
  transferTo: contractFunctionStub,
  transferToState: "UNINITIALIZED",
  endorseBeneficiary: contractFunctionStub,
  endorseBeneficiaryState: "UNINITIALIZED",
  isSurrendered: false,
  titleEscrowOwner: "",
  approveNewTransferTargets: contractFunctionStub,
  approveNewTransferTargetsState: "UNINITIALIZED",
  transferToNewEscrow: contractFunctionStub,
  transferToNewEscrowState: "UNINITIALIZED",
  resetStates: () => {},
});

export const TokenInformationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const { provider } = useProviderContext();
  const { titleEscrow, updateTitleEscrow, titleEscrowOwner } = useTitleEscrowContract(
    provider,
    tokenRegistryAddress,
    tokenId
  );
  const isSurrendered = titleEscrow?.address === tokenRegistryAddress;

  // First check whether Contract is TitleEscrow
  const { isInterfaceType: isTitleEscrow } = useSupportsInterface(titleEscrow, "0xdcce2211"); // 0xdcce2211 is from TitleEscrow's ERC165 https://github.com/Open-Attestation/token-registry/blob/5cdc6d2ccda4fbbfcbd429ca90c3049e72bc1e56/contracts/TitleEscrow.sol#L56

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(
    titleEscrow,
    "approvedBeneficiary"
  );
  const { call: getApprovedHolder, value: approvedHolder } = useContractFunctionHook(titleEscrow, "approvedHolder");

  // Contract Write Functions (available only after provider has been upgraded)
  const { send: transferTo, state: transferToState, reset: resetTransferTo } = useContractFunctionHook(
    titleEscrow,
    "transferTo"
  );
  const { send: changeHolder, state: changeHolderState, reset: resetChangeHolder } = useContractFunctionHook(
    titleEscrow,
    "changeHolder"
  );
  const {
    send: endorseBeneficiary,
    state: endorseBeneficiaryState,
    reset: resetEndorseBeneficiary,
  } = useContractFunctionHook(titleEscrow, "transferToNewEscrow");
  const {
    send: approveNewTransferTargets,
    state: approveNewTransferTargetsState,
    reset: resetApproveNewTransferTargets,
  } = useContractFunctionHook(titleEscrow, "approveNewTransferTargets");
  const {
    send: transferToNewEscrow,
    state: transferToNewEscrowState,
    reset: resetTransferToNewEscrow,
  } = useContractFunctionHook(titleEscrow, "transferToNewEscrow");

  const resetProviders = useCallback(() => {
    resetTransferTo();
    resetChangeHolder();
    resetEndorseBeneficiary();
    resetApproveNewTransferTargets();
    resetTransferToNewEscrow();
  }, [
    resetApproveNewTransferTargets,
    resetChangeHolder,
    resetEndorseBeneficiary,
    resetTransferTo,
    resetTransferToNewEscrow,
  ]);

  const resetStates = useCallback(() => {
    setTokenId(undefined);
    setTokenRegistryAddress(undefined);
  }, []);

  const initialize = useCallback((address: string, id: string) => {
    setTokenId(id);
    setTokenRegistryAddress(address);
  }, []);

  // Fetch all new information when title escrow is initialized or updated (due to actions)
  useEffect(() => {
    if (isTitleEscrow) {
      // only fetch TitleEscrow info after we determine owner is a Title Escrow contract
      getHolder();
      getApprovedHolder();
      getBeneficiary();
      getApprovedBeneficiary();
    }
  }, [getApprovedBeneficiary, getApprovedHolder, getBeneficiary, getHolder, isTitleEscrow]);

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

  // Reset states for all write functions when provider changes to allow methods to be called again without refreshing
  useEffect(resetProviders, [resetProviders, provider]);

  return (
    <TokenInformationContext.Provider
      value={{
        tokenId,
        tokenRegistryAddress,
        initialize,
        holder: holder?.[0],
        beneficiary: beneficiary?.[0],
        approvedBeneficiary: approvedBeneficiary?.[0],
        approvedHolder: approvedHolder?.[0],
        changeHolder,
        endorseBeneficiary,
        transferTo,
        changeHolderState,
        endorseBeneficiaryState,
        transferToState,
        isSurrendered,
        isTitleEscrow,
        titleEscrowOwner,
        approveNewTransferTargets,
        approveNewTransferTargetsState,
        transferToNewEscrow,
        transferToNewEscrowState,
        resetStates,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
