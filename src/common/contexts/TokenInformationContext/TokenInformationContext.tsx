import { TitleEscrowInterface, v5Contracts } from "@trustvc/trustvc";
import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { BurnAddress } from "../../../constants/chain-info";
import { ContractFunctionState, useContractFunctionHook } from "../../hooks/useContractFunctionHook";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { useProviderContext } from "../provider";
type TitleEscrow = typeof v5Contracts.TitleEscrow;
type TradeTrustToken = typeof v5Contracts.TradeTrustToken;

export enum TokenRegistryVersion {
  V2 = "V2",
  V4 = "V4",
  V5 = "V5",
}

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  titleEscrowAddress?: string;
  beneficiary?: string;
  holder?: string;
  prevBeneficiary?: string;
  prevHolder?: string;
  remark?: string;
  documentOwner?: string;
  approvedBeneficiary?: string;
  changeHolder: TitleEscrow["transferHolder"];
  changeHolderState: ContractFunctionState;
  returnToIssuer: TitleEscrow["returnToIssuer"];
  returnToIssuerState: ContractFunctionState;
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
  isReturnedToIssuer: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  version?: TokenRegistryVersion;
  resetStates: () => void;
  destroyToken: TradeTrustToken["burn"];
  destroyTokenState: ContractFunctionState;
  restoreToken: TradeTrustToken["restore"];
  restoreTokenState: ContractFunctionState;
}

const contractFunctionStub: any = () => {
  return undefined as any;
};

export const TokenInformationContext = createContext<TokenInformationContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize: () => {},
  changeHolder: contractFunctionStub,
  changeHolderState: "UNINITIALIZED",
  returnToIssuer: contractFunctionStub,
  returnToIssuerState: "UNINITIALIZED",
  endorseBeneficiary: contractFunctionStub,
  endorseBeneficiaryState: "UNINITIALIZED",
  isReturnedToIssuer: false,
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

export const TokenInformationContextProvider: FunctionComponent<TokenInformationContextProviderProps> = ({
  children,
}) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const { providerOrSigner } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner);
  const { titleEscrow, titleEscrowAddress, updateTitleEscrow, documentOwner } = useTitleEscrowContract(
    providerOrSigner,
    tokenRegistry,
    tokenId
  );
  const isReturnedToIssuer = documentOwner?.toLowerCase() === tokenRegistryAddress?.toLowerCase();
  const isTokenBurnt = documentOwner?.toLowerCase() === BurnAddress?.toLowerCase(); // check if the token belongs to burn address.

  // First check whether Contract is TitleEscrow
  const { isInterfaceType: isTitleEscrowV4 } = useSupportsInterface(titleEscrow, TitleEscrowInterface.V4);
  const { isInterfaceType: isTitleEscrowV5 } = useSupportsInterface(titleEscrow, TitleEscrowInterface.V5);
  const isTitleEscrow: boolean = isTitleEscrowV4 || isTitleEscrowV5;
  const version: TokenRegistryVersion | undefined = isTitleEscrowV4
    ? TokenRegistryVersion.V4
    : isTitleEscrowV5
    ? TokenRegistryVersion.V5
    : undefined;

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(titleEscrow, "nominee");
  const { call: getPrevBeneficiary, value: prevBeneficiary } = useContractFunctionHook(titleEscrow, "prevBeneficiary");
  const { call: getPrevHolder, value: prevHolder } = useContractFunctionHook(titleEscrow, "prevHolder");
  const { call: getRemark, value: remark } = useContractFunctionHook(titleEscrow, "remark");

  const {
    send: changeHolder,
    state: changeHolderState,
    reset: resetChangeHolder,
  } = useContractFunctionHook(
    titleEscrow,
    "transferHolder",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner // move to hook itself
  );

  const {
    send: destroyToken,
    state: destroyTokenState,
    reset: resetDestroyingTokenState,
  } = useContractFunctionHook(
    tokenRegistry,
    "acceptReturned",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: endorseBeneficiary,
    state: endorseBeneficiaryState,
    reset: resetEndorseBeneficiary,
  } = useContractFunctionHook(
    titleEscrow,
    "transferBeneficiary",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: nominate,
    state: nominateState,
    reset: resetNominate,
  } = useContractFunctionHook(
    titleEscrow,
    "nominate",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: rejectTransferHolder,
    state: rejectTransferHolderState,
    reset: resetRejectTransferHolder,
  } = useContractFunctionHook(
    titleEscrow,
    "rejectTransferHolder",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: rejectTransferOwner,
    state: rejectTransferOwnerState,
    reset: resetRejectTransferOwner,
  } = useContractFunctionHook(
    titleEscrow,
    "rejectTransferBeneficiary",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: rejectTransferOwnerHolder,
    state: rejectTransferOwnerHolderState,
    reset: resetRejectTransferOwnerHolder,
  } = useContractFunctionHook(
    titleEscrow,
    "rejectTransferOwners",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: restoreToken, // restoreToken function does not return any value
    state: restoreTokenState,
    reset: resetRestoreTokenState,
  } = useContractFunctionHook(
    tokenRegistry,
    "rejectReturned",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: returnToIssuer,
    state: returnToIssuerState,
    reset: resetReturnToIssuer,
  } = useContractFunctionHook(
    titleEscrow,
    "returnToIssuer",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const {
    send: transferOwners,
    state: transferOwnersState,
    reset: resetTransferOwners,
  } = useContractFunctionHook(
    titleEscrow,
    "transferOwners",
    { titleEscrowAddress, tokenRegistryAddress, tokenId },
    providerOrSigner
  );

  const resetProviders = useCallback(() => {
    resetChangeHolder();
    resetDestroyingTokenState();
    resetEndorseBeneficiary();
    resetNominate();
    resetRejectTransferHolder();
    resetRejectTransferOwner();
    resetRejectTransferOwnerHolder();
    resetRestoreTokenState();
    resetReturnToIssuer();
    resetTransferOwners();
  }, [
    resetChangeHolder,
    resetDestroyingTokenState,
    resetEndorseBeneficiary,
    resetNominate,
    resetRejectTransferHolder,
    resetRejectTransferOwner,
    resetRejectTransferOwnerHolder,
    resetRestoreTokenState,
    resetReturnToIssuer,
    resetTransferOwners,
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
      getRemark();
    }
  }, [getApprovedBeneficiary, getBeneficiary, getHolder, getPrevBeneficiary, getPrevHolder, getRemark, isTitleEscrow]);

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
    if (returnToIssuerState === "CONFIRMED") updateTitleEscrow();
  }, [returnToIssuerState, updateTitleEscrow]);

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
        titleEscrowAddress,
        initialize,
        holder: holder?.[0],
        beneficiary: beneficiary?.[0],
        approvedBeneficiary: approvedBeneficiary?.[0],
        prevBeneficiary: prevBeneficiary?.[0],
        prevHolder: prevHolder?.[0],
        remark: remark?.[0],
        changeHolder,
        endorseBeneficiary,
        returnToIssuer,
        changeHolderState,
        endorseBeneficiaryState,
        returnToIssuerState,
        destroyTokenState,
        destroyToken,
        isReturnedToIssuer,
        isTokenBurnt,
        isTitleEscrow,
        version,
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
