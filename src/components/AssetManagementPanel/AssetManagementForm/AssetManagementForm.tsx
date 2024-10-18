import React, { FunctionComponent, useCallback, useContext, useEffect } from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { EndorseTransferForm } from "./FormVariants/EndorseTransferForm";
import { NominateBeneficiaryForm } from "./FormVariants/NominateBeneficiary";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";
import { AcceptSurrenderedForm } from "./FormVariants/AcceptSurrenderedForm";
import { RejectSurrenderedForm } from "./FormVariants/RejectSurrenderedForm";
import { InitialAddress } from "../../../constants/chain-info";
import { RejectTransferHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferHolderOverlay";
import { RejectTransferOwnerOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerOverlay";
import { RejectTransferOwnerHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerHolderOverlay";
import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  prevBeneficiary?: string;
  prevHolder?: string;
  approvedBeneficiary?: string;
  documentOwner?: string;
  isRestorer?: boolean;
  isAcceptor?: boolean;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder: (nextHolder: string, remark: string) => void;
  onEndorseBeneficiary: (nominee: string, remark: string) => void;
  nominateBeneficiary: (nominee: string, remark: string) => void;
  transferOwners: (nextBeneficiary: string, nextHolder: string, remark: string) => void;
  rejectTransferOwnerHolder: (remark: string) => void;
  rejectTransferOwnerHolderState: string;
  rejectTransferOwner: (remark: string) => void;
  rejectTransferOwnerState: string;
  rejectTransferHolder: (remark: string) => void;
  rejectTransferHolderState: string;
  onSurrender: (remark: string) => void;
  onDestroyToken: (remark: string) => void;
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
  onRestoreToken: (remark: string) => void;
  restoreTokenState: string;
  keyId?: string;
}

export const AssetManagementForm: FunctionComponent<AssetManagementFormProps> = ({
  account,
  formAction,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  approvedBeneficiary,
  prevBeneficiary,
  prevHolder,
  onSetFormAction,
  surrenderingState,
  destroyTokenState,
  onSurrender,
  onDestroyToken,
  documentOwner,
  isRestorer,
  isAcceptor,
  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
  isSurrendered,
  isTokenBurnt,
  nominateBeneficiary,
  approveNewTransferTargetsState,
  transferOwners,
  transferOwnersState,
  rejectTransferOwner,
  rejectTransferOwnerState,
  rejectTransferHolder,
  rejectTransferHolderState,
  rejectTransferOwnerHolder,
  rejectTransferOwnerHolderState,
  setShowEndorsementChain,
  isTitleEscrow,
  onRestoreToken,
  restoreTokenState,
  keyId,
}) => {
  const isActiveTitleEscrow = isTitleEscrow && !isSurrendered;
  const isHolder = isTitleEscrow && account === holder;
  const isBeneficiary = isTitleEscrow && account === beneficiary;
  const canSurrender = isBeneficiary && isHolder && !isSurrendered;
  /*
    In order to shred we need to check 3 conditions
    - document is surrendered
    - documentOwner is the tokenRegistry
    - currentUser === tokenRegistryMinter
  */
  const canHandleRestore = isTitleEscrow && isRestorer && isSurrendered && documentOwner === tokenRegistryAddress;
  const canHandleShred = isTitleEscrow && isAcceptor && isSurrendered && documentOwner === tokenRegistryAddress;

  // canEndorseBeneficiary
  // function transferBeneficiary(address beneficiaryNominee) external;
  // Only if (isHolder and isBeneficiary) or (nominee is previously nominated and isHolder)

  // function transferHolder(address newHolder) external;
  // onlyHolder, current holder !== new holder

  // canNominateBeneficiary
  // function nominate(address beneficiaryNominee) external;
  // Must be beneficiary, current beneficiary cannot nominate self
  // user requirements: onlyHolder

  // function transferOwners(address beneficiaryNominee, address newHolder) external;
  // transferHolder
  // transferBeneficiary

  const canNominateBeneficiary = isActiveTitleEscrow && isBeneficiary && !isHolder;

  const hasNominee = !!approvedBeneficiary && approvedBeneficiary !== InitialAddress;
  const hasPreviousBeneficiary = !!prevBeneficiary && prevBeneficiary !== InitialAddress;
  const hasPreviousHolder = !!prevHolder && prevHolder !== InitialAddress;
  const canTransferBeneficiary = isActiveTitleEscrow && isHolder && hasNominee;
  const canTransferHolder = isActiveTitleEscrow && isHolder;
  const canTransferOwners = isActiveTitleEscrow && isHolder && isBeneficiary;
  const canRejectOwnerHolderTransfer =
    isActiveTitleEscrow && isHolder && isBeneficiary && hasPreviousHolder && hasPreviousBeneficiary;
  const canRejectHolderTransfer = isActiveTitleEscrow && isHolder && hasPreviousHolder;
  const canRejectOwnerTransfer = isActiveTitleEscrow && isBeneficiary && hasPreviousBeneficiary;

  const setFormActionNone = useCallback(() => {
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
  }, [
    surrenderingState,
    destroyTokenState,
    holderTransferringState,
    beneficiaryEndorseState,
    approveNewTransferTargetsState,
    transferOwnersState,
    onSetFormAction,
  ]);
  const { showOverlay } = useContext(OverlayContext);
  useEffect(() => {
    let additionalComponent;
    switch (formAction) {
      case AssetManagementActions.RejectTransferOwner:
        additionalComponent = (
          <RejectTransferOwnerOverlay
            handleRejectTransferOwner={rejectTransferOwner}
            rejectTransferOwnerState={rejectTransferOwnerState}
            setFormActionNone={setFormActionNone}
            setShowEndorsementChain={setShowEndorsementChain}
            keyId={keyId}
          />
        );
        break;
      case AssetManagementActions.RejectTransferOwnerHolder:
        additionalComponent = (
          <RejectTransferOwnerHolderOverlay
            handleRejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
            setFormActionNone={setFormActionNone}
            setShowEndorsementChain={setShowEndorsementChain}
            keyId={keyId}
          />
        );
        break;
      case AssetManagementActions.RejectTransferHolder:
        additionalComponent = (
          <RejectTransferHolderOverlay
            handleRejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
            setFormActionNone={setFormActionNone}
            setShowEndorsementChain={setShowEndorsementChain}
            keyId={keyId}
          />
        );
        break;

      default:
        additionalComponent = null;
    }
    if (additionalComponent) {
      showOverlay(additionalComponent);
    }
  }, [
    holder,
    formAction,
    rejectTransferOwnerState,
    rejectTransferHolderState,
    rejectTransferOwnerHolderState,
    tokenRegistryAddress,
    showOverlay,
    setFormActionNone,
    setShowEndorsementChain,
    rejectTransferOwner,
    rejectTransferHolder,
    rejectTransferOwnerHolder,
    keyId,
  ]);

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
          handleNomination={nominateBeneficiary}
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
          holder={holder}
          handleEndorseTransfer={transferOwners}
          transferOwnersState={transferOwnersState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    default:
      return (
        <>
          {/* {additionalComponent && showOverlay(additionalComponent)} */}
          <ActionSelectionForm
            onSetFormAction={onSetFormAction}
            tokenRegistryAddress={tokenRegistryAddress}
            beneficiary={beneficiary}
            holder={holder}
            account={account}
            canSurrender={canSurrender}
            canHandleRestore={canHandleRestore}
            canHandleShred={canHandleShred}
            canRejectOwnerHolderTransfer={canRejectOwnerHolderTransfer}
            canRejectHolderTransfer={canRejectHolderTransfer}
            canRejectOwnerTransfer={canRejectOwnerTransfer}
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
        </>
      );
  }
};
