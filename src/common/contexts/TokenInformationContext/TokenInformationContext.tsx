import { ContractFunctionState, useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@tradetrust-tt/token-registry/contracts";
import React, { createContext, useContext, useEffect, useState, useCallback, FunctionComponent } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { TradeTrustToken } from "@tradetrust-tt/token-registry/contracts";
import { useRestoreToken } from "../../hooks/useRestoreToken";
import { BurnAddress } from "../../../constants/chain-info";

export enum TokenRegistryVersion {
  V2 = "V2",
  V4 = "V4",
  V5 = "V5",
}

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  beneficiary?: string;
  holder?: string;
  prevBeneficiary?: string;
  prevHolder?: string;
  documentOwner?: string;
  approvedBeneficiary?: string;
  changeHolder: TitleEscrow["transferHolder"];
  changeHolderState: ContractFunctionState;
  surrender: TitleEscrow["surrender"];
  surrenderState: ContractFunctionState;
  endorseBeneficiary: TitleEscrow["transferBeneficiary"];
  endorseBeneficiaryState: ContractFunctionState;
  nominate: TitleEscrow["nominate"];
  nominateState: ContractFunctionState;
  transferOwners: TitleEscrow["transferOwners"];
  transferOwnersState: ContractFunctionState;
  rejectTransferOwner: TitleEscrow["rejectTransferBeneficiary"];
  rejectTransferOwnerState: ContractFunctionState;
  rejectTransferHolder: TitleEscrow["rejectTransferHolder"];
  rejectTransferHolderState: ContractFunctionState;
  rejectTransferOwnerHolder: TitleEscrow["rejectTransferOwners"];
  rejectTransferOwnerHolderError?: Error;
  rejectTransferOwnerHolderErrorMessage?: string;
  rejectTransferOwnerHolderState: ContractFunctionState;
  initialize: (tokenRegistryAddress: string, tokenId: string) => void;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  version?: TokenRegistryVersion;
  resetStates: () => void;
  destroyToken: TradeTrustToken["burn"];
  destroyTokenState: ContractFunctionState;
  restoreToken: (remark: string) => Promise<void>;
  restoreTokenState: ContractFunctionState;
}

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
  nominate: contractFunctionStub,
  nominateState: "UNINITIALIZED",
  transferOwners: contractFunctionStub,
  transferOwnersState: "UNINITIALIZED",
  rejectTransferOwner: contractFunctionStub,
  rejectTransferOwnerState: "UNINITIALIZED",
  rejectTransferOwnerHolderError: undefined,
  rejectTransferHolder: contractFunctionStub,
  rejectTransferHolderState: "UNINITIALIZED",
  rejectTransferOwnerHolder: contractFunctionStub,
  rejectTransferOwnerHolderState: "UNINITIALIZED",
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

// TODO: HAN Move the constant value to token-registry repo
export const TitleEscrowInterface = {
  V4: "0x079dff60",
  V5: "0xa00f1762",
};

export const TokenInformationContextProvider: FunctionComponent<TokenInformationContextProviderProps> = ({
  children,
}) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const { providerOrSigner } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner);
  const { titleEscrow, updateTitleEscrow, documentOwner } = useTitleEscrowContract(
    providerOrSigner,
    tokenRegistry,
    tokenId
  );
  const isSurrendered = documentOwner === tokenRegistryAddress;
  const isTokenBurnt = documentOwner === BurnAddress; // check if the token belongs to burn address.

  // First check whether Contract is TitleEscrow
  const { isInterfaceType: isTitleEscrowV4 } = useSupportsInterface(titleEscrow, TitleEscrowInterface.V4);
  const { isInterfaceType: isTitleEscrowV5 } = useSupportsInterface(titleEscrow, TitleEscrowInterface.V5);
  const isTitleEscrow = isTitleEscrowV4 || isTitleEscrowV5;

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(titleEscrow, "nominee");
  const { call: getPrevBeneficiary, value: prevBeneficiary } = useContractFunctionHook(titleEscrow, "prevBeneficiary");
  const { call: getPrevHolder, value: prevHolder } = useContractFunctionHook(titleEscrow, "prevHolder");

  const {
    send: destroyToken,
    state: destroyTokenState,
    reset: resetDestroyingTokenState,
  } = useContractFunctionHook(tokenRegistry, "burn");

  const { restoreToken, state: restoreTokenState } = useRestoreToken(providerOrSigner, tokenRegistry, tokenId);

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
  } = useContractFunctionHook(titleEscrow, "transferHolder");

  const {
    send: endorseBeneficiary,
    state: endorseBeneficiaryState,
    reset: resetEndorseBeneficiary,
  } = useContractFunctionHook(titleEscrow, "transferBeneficiary");

  const {
    send: nominate,
    state: nominateState,
    reset: resetNominate,
  } = useContractFunctionHook(titleEscrow, "nominate");

  const {
    send: transferOwners,
    state: transferOwnersState,
    reset: resetTransferOwners,
  } = useContractFunctionHook(titleEscrow, "transferOwners");
  const {
    send: rejectTransferHolder,
    state: rejectTransferHolderState,
    reset: resetRejectTransferHolder,
  } = useContractFunctionHook(titleEscrow, "rejectTransferHolder");

  const {
    send: rejectTransferOwner,
    state: rejectTransferOwnerState,
    reset: resetRejectTransferOwner,
  } = useContractFunctionHook(titleEscrow, "rejectTransferBeneficiary");

  const {
    send: rejectTransferOwnerHolder,
    state: rejectTransferOwnerHolderState,
    reset: resetRejectTransferOwnerHolder,
  } = useContractFunctionHook(titleEscrow, "rejectTransferOwners");

  const resetProviders = useCallback(() => {
    resetSurrender();
    resetDestroyingTokenState();
    resetChangeHolder();
    resetEndorseBeneficiary();
    resetNominate();
    resetTransferOwners();
    resetRejectTransferOwner();
    resetRejectTransferHolder();
    resetRejectTransferOwnerHolder();
  }, [
    resetDestroyingTokenState,
    resetNominate,
    resetChangeHolder,
    resetEndorseBeneficiary,
    resetSurrender,
    resetTransferOwners,
    resetRejectTransferOwner,
    resetRejectTransferHolder,
    resetRejectTransferOwnerHolder,
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
      getBeneficiary();
      getApprovedBeneficiary();
      getPrevBeneficiary();
      getPrevHolder();
    }
  }, [getApprovedBeneficiary, getBeneficiary, getHolder, getPrevBeneficiary, getPrevHolder, isTitleEscrow]);

  // Update holder whenever holder transfer is successful
  useEffect(() => {
    if (changeHolderState === "CONFIRMED") getHolder();
  }, [changeHolderState, getHolder]);

  useEffect(() => {
    if (nominateState === "CONFIRMED") getApprovedBeneficiary();
  }, [nominateState, getApprovedBeneficiary]);

  // Update entire title escrow whenever endorse is successful
  useEffect(() => {
    if (endorseBeneficiaryState === "CONFIRMED") updateTitleEscrow();
  }, [endorseBeneficiaryState, updateTitleEscrow]);

  // Update entire title escrow whenever transferTo is successful
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
    if (transferOwnersState === "CONFIRMED") updateTitleEscrow();
  }, [transferOwnersState, updateTitleEscrow]);

  // Update entire title escrow whenever reject transfer to holder is successful
  useEffect(() => {
    if (rejectTransferOwnerState === "CONFIRMED") updateTitleEscrow();
  }, [rejectTransferOwnerState, updateTitleEscrow]);

  // Update entire title escrow whenever reject transfer holder is successful
  useEffect(() => {
    if (rejectTransferHolderState === "CONFIRMED") updateTitleEscrow();
  }, [rejectTransferHolderState, updateTitleEscrow]);

  // Update entire title escrow whenever reject transfer owners is successful
  useEffect(() => {
    if (rejectTransferOwnerHolderState === "CONFIRMED") updateTitleEscrow();
  }, [rejectTransferOwnerHolderState, updateTitleEscrow]);

  // Reset states for all write functions when provider changes to allow methods to be called again without refreshing
  useEffect(resetProviders, [resetProviders, providerOrSigner]);

  return (
    <TokenInformationContext.Provider
      value={{
        tokenId,
        tokenRegistryAddress,
        initialize,
        holder: holder?.[0],
        beneficiary: beneficiary?.[0],
        approvedBeneficiary: approvedBeneficiary?.[0],
        prevBeneficiary: prevBeneficiary?.[0],
        prevHolder: prevHolder?.[0],
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
        version: isTitleEscrowV4 ? TokenRegistryVersion.V4 : TokenRegistryVersion.V5,
        documentOwner,
        nominate,
        nominateState,
        transferOwners,
        transferOwnersState,
        rejectTransferOwner,
        rejectTransferOwnerState,
        rejectTransferHolder,
        rejectTransferHolderState,
        rejectTransferOwnerHolder,
        rejectTransferOwnerHolderState,
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
