import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { BurnAddress } from "../../../constants/chain-info";
import { ContractFunctionState, useContractFunctionHook } from "../../hooks/useContractFunctionHook";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { useProviderContext } from "../provider";
import { TitleEscrow, TradeTrustToken } from "../../../types";
import { useTokenRegistryVersion } from "../../hooks/useTokenRegistryVersion";
import {
  useGaslessTransferHolder,
  useGaslessTransferBeneficiary,
  useGaslessTransferOwners,
  useGaslessNominate,
  useGaslessRejectTransferHolder,
  useGaslessRejectTransferBeneficiary,
  useGaslessRejectTransferOwners,
  useGaslessReturnToIssuer,
  useGaslessAcceptReturned,
  useGaslessRejectReturned,
} from "../../../gasless";

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
  initialize: (tokenRegistryAddress: string, tokenId: string, isObligation?: boolean) => void;
  isReturnedToIssuer: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  resetStates: () => void;
  destroyToken: TradeTrustToken["burn"];
  destroyTokenState: ContractFunctionState;
  restoreToken: TradeTrustToken["restore"];
  restoreTokenState: ContractFunctionState;
  /** Whether the currently loaded document is a BoE / Obligation Record. */
  isObligation: boolean;
  /** BoE document status (Issued/Accepted/Rejected/Discharged). Undefined for classic ETR. */
  obligationStatus?: number;
  acceptObligation: (...args: any[]) => Promise<any>;
  acceptObligationState: ContractFunctionState;
  rejectObligation: (...args: any[]) => Promise<any>;
  rejectObligationState: ContractFunctionState;
  dischargeObligation: (...args: any[]) => Promise<any>;
  dischargeObligationState: ContractFunctionState;
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
  isObligation: false,
  acceptObligation: contractFunctionStub,
  acceptObligationState: "UNINITIALIZED",
  rejectObligation: contractFunctionStub,
  rejectObligationState: "UNINITIALIZED",
  dischargeObligation: contractFunctionStub,
  dischargeObligationState: "UNINITIALIZED",
});

interface TokenInformationContextProviderProps {
  children: React.ReactNode;
}

export const TokenInformationContextProvider: FunctionComponent<TokenInformationContextProviderProps> = ({
  children,
}) => {
  const [tokenId, setTokenId] = useState<string>();
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string>();
  const [isObligation, setIsObligation] = useState<boolean>(false);
  const { providerOrSigner, currentChainId } = useProviderContext();
  const documentChainId = currentChainId ? String(currentChainId) : undefined;
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, providerOrSigner, isObligation);
  const { titleEscrow, titleEscrowAddress, updateTitleEscrow, documentOwner } = useTitleEscrowContract(
    providerOrSigner,
    tokenRegistry,
    tokenId,
    isObligation
  );
  const isReturnedToIssuer = documentOwner?.toLowerCase() === tokenRegistryAddress?.toLowerCase();
  const isTokenBurnt = documentOwner?.toLowerCase() === BurnAddress?.toLowerCase(); // check if the token belongs to burn address.
  const isTitleEscrow = !!useTokenRegistryVersion() || undefined;

  // First check whether Contract is TitleEscrow

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(titleEscrow, "nominee");
  const { call: getPrevBeneficiary, value: prevBeneficiary } = useContractFunctionHook(titleEscrow, "prevBeneficiary");
  const { call: getPrevHolder, value: prevHolder } = useContractFunctionHook(titleEscrow, "prevHolder");
  const { call: getRemark, value: remark } = useContractFunctionHook(titleEscrow, "remark");
  const { call: getObligationStatus, value: obligationStatusRaw } = useContractFunctionHook(
    titleEscrow as any,
    "status"
  );
  const obligationStatus =
    obligationStatusRaw !== undefined && obligationStatusRaw !== null ? Number(obligationStatusRaw) : undefined;

  const contractOptions = { titleEscrowAddress, tokenRegistryAddress, tokenId };

  // Classic ETR: gasless-capable hooks. BoE: paid obligation-registry SDK path via useContractFunctionHook.
  const {
    send: changeHolderGasless,
    state: changeHolderGaslessState,
    reset: resetChangeHolderGasless,
  } = useGaslessTransferHolder(contractOptions, providerOrSigner, documentChainId);
  const {
    send: changeHolderPaid,
    state: changeHolderPaidState,
    reset: resetChangeHolderPaid,
  } = useContractFunctionHook(titleEscrow as any, "transferHolder", contractOptions, providerOrSigner, isObligation);
  const changeHolder = isObligation ? changeHolderPaid : changeHolderGasless;
  const changeHolderState = isObligation ? changeHolderPaidState : changeHolderGaslessState;
  const resetChangeHolder = isObligation ? resetChangeHolderPaid : resetChangeHolderGasless;

  const {
    send: endorseBeneficiaryGasless,
    state: endorseBeneficiaryGaslessState,
    reset: resetEndorseBeneficiaryGasless,
  } = useGaslessTransferBeneficiary(contractOptions, providerOrSigner, documentChainId);
  const {
    send: endorseBeneficiaryPaid,
    state: endorseBeneficiaryPaidState,
    reset: resetEndorseBeneficiaryPaid,
  } = useContractFunctionHook(
    titleEscrow as any,
    "transferBeneficiary",
    contractOptions,
    providerOrSigner,
    isObligation
  );
  const endorseBeneficiary = isObligation ? endorseBeneficiaryPaid : endorseBeneficiaryGasless;
  const endorseBeneficiaryState = isObligation ? endorseBeneficiaryPaidState : endorseBeneficiaryGaslessState;
  const resetEndorseBeneficiary = isObligation ? resetEndorseBeneficiaryPaid : resetEndorseBeneficiaryGasless;

  const {
    send: transferOwnersGasless,
    state: transferOwnersGaslessState,
    reset: resetTransferOwnersGasless,
  } = useGaslessTransferOwners(contractOptions, providerOrSigner, documentChainId);
  const {
    send: transferOwnersPaid,
    state: transferOwnersPaidState,
    reset: resetTransferOwnersPaid,
  } = useContractFunctionHook(titleEscrow as any, "transferOwners", contractOptions, providerOrSigner, isObligation);
  const transferOwners = isObligation ? transferOwnersPaid : transferOwnersGasless;
  const transferOwnersState = isObligation ? transferOwnersPaidState : transferOwnersGaslessState;
  const resetTransferOwners = isObligation ? resetTransferOwnersPaid : resetTransferOwnersGasless;

  const {
    send: nominateGasless,
    state: nominateGaslessState,
    reset: resetNominateGasless,
  } = useGaslessNominate(contractOptions, providerOrSigner, documentChainId);
  const {
    send: nominatePaid,
    state: nominatePaidState,
    reset: resetNominatePaid,
  } = useContractFunctionHook(titleEscrow as any, "nominate", contractOptions, providerOrSigner, isObligation);
  const nominate = isObligation ? nominatePaid : nominateGasless;
  const nominateState = isObligation ? nominatePaidState : nominateGaslessState;
  const resetNominate = isObligation ? resetNominatePaid : resetNominateGasless;

  const {
    send: rejectTransferHolderGasless,
    state: rejectTransferHolderGaslessState,
    reset: resetRejectTransferHolderGasless,
  } = useGaslessRejectTransferHolder(contractOptions, providerOrSigner, documentChainId);
  const {
    send: rejectTransferHolderPaid,
    state: rejectTransferHolderPaidState,
    reset: resetRejectTransferHolderPaid,
  } = useContractFunctionHook(
    titleEscrow as any,
    "rejectTransferHolder",
    contractOptions,
    providerOrSigner,
    isObligation
  );
  const rejectTransferHolder = isObligation ? rejectTransferHolderPaid : rejectTransferHolderGasless;
  const rejectTransferHolderState = isObligation ? rejectTransferHolderPaidState : rejectTransferHolderGaslessState;
  const resetRejectTransferHolder = isObligation ? resetRejectTransferHolderPaid : resetRejectTransferHolderGasless;

  const {
    send: rejectTransferOwnerGasless,
    state: rejectTransferOwnerGaslessState,
    reset: resetRejectTransferOwnerGasless,
  } = useGaslessRejectTransferBeneficiary(contractOptions, providerOrSigner, documentChainId);
  const {
    send: rejectTransferOwnerPaid,
    state: rejectTransferOwnerPaidState,
    reset: resetRejectTransferOwnerPaid,
  } = useContractFunctionHook(
    titleEscrow as any,
    "rejectTransferBeneficiary",
    contractOptions,
    providerOrSigner,
    isObligation
  );
  const rejectTransferOwner = isObligation ? rejectTransferOwnerPaid : rejectTransferOwnerGasless;
  const rejectTransferOwnerState = isObligation ? rejectTransferOwnerPaidState : rejectTransferOwnerGaslessState;
  const resetRejectTransferOwner = isObligation ? resetRejectTransferOwnerPaid : resetRejectTransferOwnerGasless;

  const {
    send: rejectTransferOwnerHolderGasless,
    state: rejectTransferOwnerHolderGaslessState,
    reset: resetRejectTransferOwnerHolderGasless,
  } = useGaslessRejectTransferOwners(contractOptions, providerOrSigner, documentChainId);
  const {
    send: rejectTransferOwnerHolderPaid,
    state: rejectTransferOwnerHolderPaidState,
    reset: resetRejectTransferOwnerHolderPaid,
  } = useContractFunctionHook(
    titleEscrow as any,
    "rejectTransferOwners",
    contractOptions,
    providerOrSigner,
    isObligation
  );
  const rejectTransferOwnerHolder = isObligation ? rejectTransferOwnerHolderPaid : rejectTransferOwnerHolderGasless;
  const rejectTransferOwnerHolderState = isObligation
    ? rejectTransferOwnerHolderPaidState
    : rejectTransferOwnerHolderGaslessState;
  const resetRejectTransferOwnerHolder = isObligation
    ? resetRejectTransferOwnerHolderPaid
    : resetRejectTransferOwnerHolderGasless;

  const {
    send: returnToIssuerGasless,
    state: returnToIssuerGaslessState,
    reset: resetReturnToIssuerGasless,
  } = useGaslessReturnToIssuer(contractOptions, providerOrSigner, documentChainId);
  const {
    send: returnToIssuerPaid,
    state: returnToIssuerPaidState,
    reset: resetReturnToIssuerPaid,
  } = useContractFunctionHook(titleEscrow as any, "returnToIssuer", contractOptions, providerOrSigner, isObligation);
  const returnToIssuer = isObligation ? returnToIssuerPaid : returnToIssuerGasless;
  const returnToIssuerState = isObligation ? returnToIssuerPaidState : returnToIssuerGaslessState;
  const resetReturnToIssuer = isObligation ? resetReturnToIssuerPaid : resetReturnToIssuerGasless;

  const {
    send: destroyTokenGasless,
    state: destroyTokenGaslessState,
    reset: resetDestroyingTokenStateGasless,
  } = useGaslessAcceptReturned(contractOptions, providerOrSigner, documentChainId);
  const {
    send: destroyTokenPaid,
    state: destroyTokenPaidState,
    reset: resetDestroyingTokenStatePaid,
  } = useContractFunctionHook(titleEscrow as any, "acceptReturned", contractOptions, providerOrSigner, isObligation);
  const destroyToken = isObligation ? destroyTokenPaid : destroyTokenGasless;
  const destroyTokenState = isObligation ? destroyTokenPaidState : destroyTokenGaslessState;
  const resetDestroyingTokenState = isObligation ? resetDestroyingTokenStatePaid : resetDestroyingTokenStateGasless;

  const {
    send: restoreTokenGasless,
    state: restoreTokenGaslessState,
    reset: resetRestoreTokenStateGasless,
  } = useGaslessRejectReturned(contractOptions, providerOrSigner, documentChainId);
  const {
    send: restoreTokenPaid,
    state: restoreTokenPaidState,
    reset: resetRestoreTokenStatePaid,
  } = useContractFunctionHook(titleEscrow as any, "rejectReturned", contractOptions, providerOrSigner, isObligation);
  const restoreToken = isObligation ? restoreTokenPaid : restoreTokenGasless;
  const restoreTokenState = isObligation ? restoreTokenPaidState : restoreTokenGaslessState;
  const resetRestoreTokenState = isObligation ? resetRestoreTokenStatePaid : resetRestoreTokenStateGasless;

  // BoE obligation lifecycle — paid-only, never gasless.
  const {
    send: acceptObligation,
    state: acceptObligationState,
    reset: resetAcceptObligation,
  } = useContractFunctionHook(titleEscrow as any, "accept", contractOptions, providerOrSigner, isObligation);
  const {
    send: rejectObligation,
    state: rejectObligationState,
    reset: resetRejectObligation,
  } = useContractFunctionHook(titleEscrow as any, "reject", contractOptions, providerOrSigner, isObligation);
  const {
    send: dischargeObligation,
    state: dischargeObligationState,
    reset: resetDischargeObligation,
  } = useContractFunctionHook(titleEscrow as any, "discharge", contractOptions, providerOrSigner, isObligation);

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
    resetAcceptObligation();
    resetRejectObligation();
    resetDischargeObligation();
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
    resetAcceptObligation,
    resetRejectObligation,
    resetDischargeObligation,
  ]);

  const resetStates = useCallback(() => {
    setTokenId(undefined);
    setTokenRegistryAddress(undefined);
    setIsObligation(false);
  }, []);

  const initialize = useCallback((address: string, id: string, obligation?: boolean) => {
    setTokenId(id);
    setTokenRegistryAddress(address);
    setIsObligation(!!obligation);
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
      if (isObligation) getObligationStatus();
    }
  }, [
    getApprovedBeneficiary,
    getBeneficiary,
    getHolder,
    getPrevBeneficiary,
    getPrevHolder,
    getRemark,
    getObligationStatus,
    isTitleEscrow,
    isObligation,
  ]);

  // Refresh escrow state after BoE lifecycle actions
  useEffect(() => {
    if (
      acceptObligationState === "CONFIRMED" ||
      rejectObligationState === "CONFIRMED" ||
      dischargeObligationState === "CONFIRMED"
    ) {
      updateTitleEscrow();
    }
  }, [acceptObligationState, rejectObligationState, dischargeObligationState, updateTitleEscrow]);

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
        changeHolder: changeHolder as any,
        endorseBeneficiary: endorseBeneficiary as any,
        returnToIssuer: returnToIssuer as any,
        changeHolderState,
        endorseBeneficiaryState,
        returnToIssuerState,
        destroyTokenState,
        destroyToken: destroyToken as any,
        isReturnedToIssuer,
        isTokenBurnt,
        isTitleEscrow,
        documentOwner,
        nominate: nominate as any,
        nominateState,
        transferOwners: transferOwners as any,
        transferOwnersState,
        rejectTransferOwner: rejectTransferOwner as any,
        rejectTransferOwnerState,
        rejectTransferHolder: rejectTransferHolder as any,
        rejectTransferHolderState,
        rejectTransferOwnerHolder: rejectTransferOwnerHolder as any,
        rejectTransferOwnerHolderState,
        resetStates,
        restoreToken: restoreToken as any,
        restoreTokenState,
        isObligation,
        obligationStatus: isObligation ? obligationStatus : undefined,
        acceptObligation: acceptObligation as any,
        acceptObligationState,
        rejectObligation: rejectObligation as any,
        rejectObligationState,
        dischargeObligation: dischargeObligation as any,
        dischargeObligationState,
      }}
    >
      {children}
    </TokenInformationContext.Provider>
  );
};

export const useTokenInformationContext = (): TokenInformationContext =>
  useContext<TokenInformationContext>(TokenInformationContext);
