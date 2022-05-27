import { ContractFunctionState, useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrowCloneable } from "@govtechsg/token-registry";
import React, { createContext, useContext, useEffect, useState, useCallback, FunctionComponent } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { TradeTrustERC721 } from "@govtechsg/token-registry";
import { useRestoreToken } from "../../hooks/useRestoreToken";

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  beneficiary?: string;
  holder?: string;
  documentOwner?: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  changeHolder: TitleEscrowCloneable["changeHolder"];
  changeHolderState: ContractFunctionState;
  surrender: TitleEscrowCloneable["surrender"];
  surrenderState: ContractFunctionState;
  endorseBeneficiary: TitleEscrowCloneable["approveNewTransferTargets"];
  endorseBeneficiaryState: ContractFunctionState;
  approveNewTransferTargets: TitleEscrowCloneable["approveNewTransferTargets"];
  approveNewTransferTargetsState: ContractFunctionState;
  transferToNewEscrow: TitleEscrowCloneable["transferToNewEscrow"];
  transferToNewEscrowState: ContractFunctionState;
  initialize: (tokenRegistryAddress: string, tokenId: string) => void;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  resetStates: () => void;
  destroyToken: TradeTrustERC721["destroyToken"];
  destroyTokenState: ContractFunctionState;
  restoreToken: typeof restoreTokenStub;
  restoreTokenState: ContractFunctionState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const restoreTokenStub = async (previousBeneficiary: string, previousHolder: string) => {};

const contractFunctionStub = () => {
  return undefined as any;
};

export const TokenInformationContext = createContext<TokenInformationContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize: () => {},
  changeHolder: contractFunctionStub,
  changeHolderState: "UNINITIALIZED",
  surrender: contractFunctionStub,
  surrenderState: "UNINITIALIZED",
  endorseBeneficiary: contractFunctionStub,
  endorseBeneficiaryState: "UNINITIALIZED",
  isSurrendered: false,
  isTokenBurnt: false,
  documentOwner: "",
  approveNewTransferTargets: contractFunctionStub,
  approveNewTransferTargetsState: "UNINITIALIZED",
  transferToNewEscrow: contractFunctionStub,
  transferToNewEscrowState: "UNINITIALIZED",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetStates: () => {},
  destroyToken: contractFunctionStub,
  destroyTokenState: "UNINITIALIZED",
  restoreToken: contractFunctionStub,
  restoreTokenState: "UNINITIALIZED",
});

interface TokenInformationContextProviderProps {
  children: React.ReactNode;
}

export const TokenInformationContextProvider: FunctionComponent<TokenInformationContextProviderProps> = ({
  children,
}) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const { getTransactor } = useProviderContext();
  const transactor = getTransactor();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, transactor);
  const { titleEscrow, updateTitleEscrow, documentOwner } = useTitleEscrowContract(transactor, tokenRegistry, tokenId);
  const isSurrendered = documentOwner === tokenRegistryAddress;
  const isTokenBurnt = documentOwner === "0x000000000000000000000000000000000000dEaD"; // check if the token belongs to burn address.

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

  const {
    send: destroyToken,
    state: destroyTokenState,
    reset: resetDestroyingTokenState,
  } = useContractFunctionHook(tokenRegistry, "destroyToken");

  const { restoreToken, state: restoreTokenState } = useRestoreToken(transactor, tokenRegistry, tokenId);

  // Contract Write Functions (available only after provider has been upgraded)
  const {
    send: surrender,
    state: surrenderState,
    reset: resetSurrender,
  } = useContractFunctionHook(titleEscrow, "surrender");

  const {
    send: changeHolder,
    state: changeHolderState,
    reset: resetChangeHolder,
  } = useContractFunctionHook(titleEscrow, "changeHolder");
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
    resetSurrender();
    resetDestroyingTokenState();
    resetChangeHolder();
    resetEndorseBeneficiary();
    resetApproveNewTransferTargets();
    resetTransferToNewEscrow();
  }, [
    resetDestroyingTokenState,
    resetApproveNewTransferTargets,
    resetChangeHolder,
    resetEndorseBeneficiary,
    resetSurrender,
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

  // Update entire title escrow whenever surrender is successful
  useEffect(() => {
    if (surrenderState === "CONFIRMED") updateTitleEscrow();
  }, [surrenderState, updateTitleEscrow]);

  // Update entire title escrow whenever token is burnt
  useEffect(() => {
    if (destroyTokenState === "CONFIRMED") updateTitleEscrow();
  }, [destroyTokenState, updateTitleEscrow]);

  useEffect(() => {
    if (restoreTokenState === "CONFIRMED") updateTitleEscrow();
  }, [restoreTokenState, updateTitleEscrow]);

  // Update entire title escrow whenever endorse transfer to beneficiary and holder is successful
  useEffect(() => {
    if (transferToNewEscrowState === "CONFIRMED") updateTitleEscrow();
  }, [transferToNewEscrowState, updateTitleEscrow]);

  // Reset states for all write functions when provider changes to allow methods to be called again without refreshing
  useEffect(resetProviders, [resetProviders, transactor]);

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
        surrender,
        changeHolderState,
        endorseBeneficiaryState,
        surrenderState,
        destroyTokenState,
        destroyToken,
        isSurrendered,
        isTokenBurnt,
        isTitleEscrow,
        documentOwner,
        approveNewTransferTargets,
        approveNewTransferTargetsState,
        transferToNewEscrow,
        transferToNewEscrowState,
        resetStates,
        restoreToken,
        restoreTokenState,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
