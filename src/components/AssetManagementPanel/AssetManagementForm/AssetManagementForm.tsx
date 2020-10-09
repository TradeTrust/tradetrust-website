import React from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { EndorseTransferForm } from "./FormVariants/EndorseTransferForm";
import { NominateBeneficiaryHolderForm } from "./FormVariants/NominateBeneficiaryHolder";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";
import { HandleSurrenderedForm } from "./FormVariants/HandleSurrenderedForm";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  documentOwner?: string;
  isMinter?: boolean;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder: (nextHolder: string) => void;
  onEndorseBeneficiary: (newBeneficiary: string, newHolder: string) => void;
  onApproveNewTransferTargets: (newBeneficiary: string, newHolder: string) => void;
  onTransferToNewEscrow: (approvedBeneficiary: string, approvedHolder: string) => void;
  onSurrender: () => void;
  onAcceptSurrender: () => void;
  surrenderingState: string;
  destroyingTokenState: string;
  holderTransferringState: string;
  beneficiaryEndorseState: string;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  approveNewTransferTargetsState: string;
  transferToNewEscrowState: string;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
  onRejectSurrender: (lastBeneficiary: string) => void;
  restoreTokenState: string;
  tokenId: string;
}

export const AssetManagementForm = ({
  account,
  formAction,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  approvedBeneficiary,
  approvedHolder,
  onSetFormAction,
  surrenderingState,
  destroyingTokenState,
  onSurrender,
  onAcceptSurrender,
  documentOwner,
  isMinter,
  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
  isSurrendered,
  isTokenBurnt,
  onApproveNewTransferTargets,
  approveNewTransferTargetsState,
  onTransferToNewEscrow,
  transferToNewEscrowState,
  setShowEndorsementChain,
  isTitleEscrow,
  onRejectSurrender,
  restoreTokenState,
  tokenId,
}: AssetManagementFormProps) => {
  const isHolder = isTitleEscrow && account === holder;
  const isBeneficiary = isTitleEscrow && account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;
  /*
    In order for surrender we need to check 3 conditions
    - document is surrendered
    - documentOwner is the tokenRegistry
    -  currentUser === tokenRegistryMinter
  */
  const canAcceptSurrender =
    isSurrendered && isTitleEscrow === false && documentOwner === tokenRegistryAddress && isMinter;
  const canEndorseBeneficiary = isTitleEscrow && isBeneficiary && isHolder;
  const canNominateBeneficiaryHolder = isTitleEscrow && isBeneficiary && !isHolder;
  const canEndorseTransfer =
    !!approvedBeneficiary &&
    approvedBeneficiary !== "0x0000000000000000000000000000000000000000" &&
    !!approvedHolder &&
    approvedHolder !== "0x0000000000000000000000000000000000000000" &&
    isHolder &&
    isTitleEscrow;

  const setFormActionNone = () => {
    if (
      surrenderingState === FormState.PENDING_CONFIRMATION ||
      destroyingTokenState === FormState.PENDING_CONFIRMATION ||
      holderTransferringState === FormState.PENDING_CONFIRMATION ||
      beneficiaryEndorseState === FormState.PENDING_CONFIRMATION ||
      approveNewTransferTargetsState === FormState.PENDING_CONFIRMATION ||
      transferToNewEscrowState === FormState.PENDING_CONFIRMATION
    )
      return;
    onSetFormAction(AssetManagementActions.None);
  };

  switch (formAction) {
    case AssetManagementActions.Surrender:
      return (
        <SurrenderForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleSurrender={onSurrender}
          surrenderingState={surrenderingState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.HandleSurrendered:
      return (
        <HandleSurrenderedForm
          tokenId={tokenId}
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleAcceptSurrender={onAcceptSurrender}
          destroyingTokenState={destroyingTokenState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
          handleRejectSurrender={onRejectSurrender}
          restoreTokenState={restoreTokenState}
        />
      );

    case AssetManagementActions.NominateBeneficiaryHolder:
      return (
        <NominateBeneficiaryHolderForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleNomination={onApproveNewTransferTargets}
          nominationState={approveNewTransferTargetsState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.EndorseBeneficiary:
      return (
        <EndorseBeneficiaryForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onEndorseBeneficiary}
          beneficiaryEndorseState={beneficiaryEndorseState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.TransferHolder:
      return (
        <TransferHolderForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onTransferHolder}
          holderTransferringState={holderTransferringState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.EndorseTransfer:
      return (
        <EndorseTransferForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          approvedBeneficiary={approvedBeneficiary}
          approvedHolder={approvedHolder}
          handleEndorseTransfer={onTransferToNewEscrow}
          transferToNewEscrowState={transferToNewEscrowState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    default:
      return (
        <ActionSelectionForm
          onSetFormAction={onSetFormAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          account={account}
          canSurrender={canSurrender}
          canAcceptSurrender={canAcceptSurrender}
          onConnectToWallet={onConnectToWallet}
          canChangeHolder={isHolder}
          canEndorseBeneficiary={canEndorseBeneficiary}
          isSurrendered={isSurrendered}
          isTokenBurnt={isTokenBurnt}
          canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
          canEndorseTransfer={canEndorseTransfer}
          setShowEndorsementChain={setShowEndorsementChain}
          isTitleEscrow={isTitleEscrow}
        />
      );
  }
};
