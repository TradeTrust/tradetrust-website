import { ContractFunctionState, useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@govtechsg/token-registry/contracts";
import React, { createContext, useContext, useEffect, useState, useCallback, FunctionComponent } from "react";
import { useTitleEscrowContract } from "../../hooks/useTitleEscrowContract";
import { useProviderContext } from "../provider";
import { useSupportsInterface } from "../../hooks/useSupportsInterface";
import { useTokenRegistryContract } from "../../hooks/useTokenRegistryContract";
import { TradeTrustToken } from "@govtechsg/token-registry/contracts";
import { useRestoreToken } from "../../hooks/useRestoreToken";
import { BurnAddress } from "../../../constants/chain-info";

interface TokenInformationContext {
  tokenRegistryAddress?: string;
  tokenId?: string;
  beneficiary?: string;
  holder?: string;
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
  initialize: (tokenRegistryAddress: string, tokenId: string) => void;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  isTitleEscrow?: boolean;
  resetStates: () => void;
  destroyToken: TradeTrustToken["burn"];
  destroyTokenState: ContractFunctionState;
  restoreToken: () => Promise<void>;
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
  const { titleEscrow, updateTitleEscrow, documentOwner } = useTitleEscrowContract(
    providerOrSigner,
    tokenRegistry,
    tokenId
  );
  const isSurrendered = documentOwner === tokenRegistryAddress;
  const isTokenBurnt = documentOwner === BurnAddress; // check if the token belongs to burn address.

  // First check whether Contract is TitleEscrow
  const { isInterfaceType: isTitleEscrow } = useSupportsInterface(titleEscrow, "0x079dff60");

  // Contract Read Functions
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedBeneficiary, value: approvedBeneficiary } = useContractFunctionHook(titleEscrow, "nominee");

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

  const resetProviders = useCallback(() => {
    resetSurrender();
    resetDestroyingTokenState();
    resetChangeHolder();
    resetEndorseBeneficiary();
    resetNominate();
    resetTransferOwners();
  }, [
    resetDestroyingTokenState,
    resetNominate,
    resetChangeHolder,
    resetEndorseBeneficiary,
    resetSurrender,
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
    }
  }, [getApprovedBeneficiary, getBeneficiary, getHolder, isTitleEscrow]);

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
        nominate,
        nominateState,
        transferOwners,
        transferOwnersState,
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
