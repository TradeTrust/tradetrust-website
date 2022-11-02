import React, { FunctionComponent } from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { EndorseTransferForm } from "./FormVariants/EndorseTransferForm";
import { NominateBeneficiaryForm } from "./FormVariants/NominateBeneficiaryHolder";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";
import { AcceptSurrenderedForm } from "./FormVariants/AcceptSurrenderedForm";
import { RejectSurrenderedForm } from "./FormVariants/RejectSurrenderedForm";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedBeneficiary?: string;
  documentOwner?: string;
  isMinter?: boolean;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder: (nextHolder: string) => void;
  onEndorseBeneficiary: (nominee: string) => void;
  onApproveNewTransferTargets: (nominee: string) => void;
  transferOwners: (approvedBeneficiary: string, approvedHolder: string) => void;
  onSurrender: () => void;
  onDestroyToken: () => void;
  surrenderingState: string;
  destroyTokenState: string;
  holderTransferringState: string;
  beneficiaryEndorseState: string;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  approveNewTransferTargetsState: string;
  transferOwnersState: string;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
  onRestoreToken: () => void;
  restoreTokenState: string;
  tokenId: string;
}

export const AssetManagementForm: FunctionComponent<AssetManagementFormProps> = ({
  account,
  formAction,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  approvedBeneficiary,
  onSetFormAction,
  surrenderingState,
  destroyTokenState,
  onSurrender,
  onDestroyToken,
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
  transferOwners,
  transferOwnersState,
  setShowEndorsementChain,
  isTitleEscrow,
  onRestoreToken,
  restoreTokenState,
  tokenId,
}) => {
  const isHolder = isTitleEscrow && account === holder;
  const isBeneficiary = isTitleEscrow && account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;
  /*
    In order to surrender we need to check 3 conditions
    - document is surrendered
    - documentOwner is the tokenRegistry
    - currentUser === tokenRegistryMinter
  */
  const canHandleSurrender =
    isSurrendered && isTitleEscrow === false && documentOwner === tokenRegistryAddress && isMinter;

  // canEndorseBeneficiary
  // function transferBeneficiary(address beneficiaryNominee) external;
  // Only if isHolder and isBeneficiary, nominee is previously nominated

  // function transferHolder(address newHolder) external;
  // onlyHolder, current holder not new holder

  // canNominateBeneficiary
  // function nominate(address beneficiaryNominee) external;
  // Must be beneficiary, current beneficiary cannot nominate self

  // function transferOwners(address beneficiaryNominee, address newHolder) external;
  // transferHolder
  // transferBeneficiary

  const canNominateBeneficiary = isTitleEscrow && isBeneficiary; // Must be beneficiary, current beneficiary cannot nominate self
  const hasNominee = !!approvedBeneficiary && approvedBeneficiary !== "0x0000000000000000000000000000000000000000";
  const canTransferBeneficiary = isTitleEscrow && isBeneficiary && isHolder && hasNominee; // Only if isHolder and isBeneficiary: function transferBeneficiary(address _nominee)
  const canTransferHolder = isTitleEscrow && isHolder;
  const canTransferOwners = canTransferBeneficiary && canTransferHolder;

  const setFormActionNone = () => {
    if (
      surrenderingState === FormState.PENDING_CONFIRMATION ||
      destroyTokenState === FormState.PENDING_CONFIRMATION ||
      holderTransferringState === FormState.PENDING_CONFIRMATION ||
      beneficiaryEndorseState === FormState.PENDING_CONFIRMATION ||
      approveNewTransferTargetsState === FormState.PENDING_CONFIRMATION ||
      transferOwnersState === FormState.PENDING_CONFIRMATION
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

    case AssetManagementActions.AcceptSurrendered:
      return (
        <AcceptSurrenderedForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          handleDestroyToken={onDestroyToken}
          destroyTokenState={destroyTokenState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.RejectSurrendered:
      return (
        <RejectSurrenderedForm
          tokenId={tokenId}
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
          handleRestoreToken={onRestoreToken}
          restoreTokenState={restoreTokenState}
        />
      );

    case AssetManagementActions.NominateBeneficiary:
      return (
        <NominateBeneficiaryForm
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
          nominee={approvedBeneficiary}
          handleBeneficiaryTransfer={onEndorseBeneficiary}
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
          holder={holder}
          handleEndorseTransfer={transferOwners}
          transferOwnersState={transferOwnersState}
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
          canHandleSurrender={canHandleSurrender}
          onConnectToWallet={onConnectToWallet}
          canChangeHolder={canTransferHolder}
          canEndorseBeneficiary={canTransferBeneficiary}
          isSurrendered={isSurrendered}
          isTokenBurnt={isTokenBurnt}
          canNominateBeneficiary={canNominateBeneficiary}
          canEndorseTransfer={canTransferOwners}
          setShowEndorsementChain={setShowEndorsementChain}
          isTitleEscrow={isTitleEscrow}
        />
      );
  }
};
