import { OverlayContext, showDocumentTransferMessage } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useCallback, useContext, useEffect } from "react";
import { InitialAddress } from "../../../constants/chain-info";
import { FormState } from "../../../constants/FormState";
import { RejectTransferHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferHolderOverlay";
import { RejectTransferOwnerHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerHolderOverlay";
import { RejectTransferOwnerOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerOverlay";
import { AssetManagementActions } from "../AssetManagementActions";
import { AcceptSurrenderedForm } from "./FormVariants/AcceptSurrenderedForm";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { EndorseTransferForm } from "./FormVariants/EndorseTransferForm";
import { NominateBeneficiaryForm } from "./FormVariants/NominateBeneficiary";
import { RejectSurrenderedForm } from "./FormVariants/RejectSurrenderedForm";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";

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
  onReturnToIssuer: (remark: string) => void;
  onDestroyToken: (remark: string) => void;
  returnToIssuerState: string;
  destroyTokenState: string;
  holderTransferringState: string;
  beneficiaryEndorseState: string;
  isReturnedToIssuer: boolean;
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
  returnToIssuerState,
  destroyTokenState,
  onReturnToIssuer,
  onDestroyToken,
  documentOwner,
  isRestorer,
  isAcceptor,
  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
  isReturnedToIssuer,
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
  const isActiveTitleEscrow = isTitleEscrow && !isReturnedToIssuer;
  const isHolder = isTitleEscrow && account === holder;
  const isBeneficiary = isTitleEscrow && account === beneficiary;
  const canReturnToIssuer = isBeneficiary && isHolder && !isReturnedToIssuer;
  /*
    In order to shred we need to check 3 conditions
    - document is surrendered
    - documentOwner is the tokenRegistry
    - currentUser === tokenRegistryMinter
  */
  const canHandleRestore = isTitleEscrow && isRestorer && isReturnedToIssuer && documentOwner === tokenRegistryAddress;
  const canHandleShred = isTitleEscrow && isAcceptor && isReturnedToIssuer && documentOwner === tokenRegistryAddress;

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
  const canRejectHolderTransfer =
    isActiveTitleEscrow && isHolder && hasPreviousHolder && !(isBeneficiary && hasPreviousBeneficiary);
  const canRejectOwnerTransfer =
    isActiveTitleEscrow && isBeneficiary && hasPreviousBeneficiary && !(isHolder && hasPreviousHolder);
  const isRejectPendingConfirmation =
    rejectTransferHolderState === FormState.PENDING_CONFIRMATION ||
    rejectTransferOwnerState === FormState.PENDING_CONFIRMATION ||
    rejectTransferOwnerHolderState === FormState.PENDING_CONFIRMATION;

  const setFormActionNone = useCallback(() => {
    if (
      returnToIssuerState === FormState.PENDING_CONFIRMATION ||
      destroyTokenState === FormState.PENDING_CONFIRMATION ||
      holderTransferringState === FormState.PENDING_CONFIRMATION ||
      beneficiaryEndorseState === FormState.PENDING_CONFIRMATION ||
      approveNewTransferTargetsState === FormState.PENDING_CONFIRMATION ||
      transferOwnersState === FormState.PENDING_CONFIRMATION
    )
      return;
    onSetFormAction(AssetManagementActions.None);
  }, [
    returnToIssuerState,
    destroyTokenState,
    holderTransferringState,
    beneficiaryEndorseState,
    approveNewTransferTargetsState,
    transferOwnersState,
    onSetFormAction,
  ]);

  const { closeOverlay, showOverlay, isOverlayVisible } = useContext(OverlayContext);

  useEffect(() => {
    let additionalComponent;
    switch (formAction) {
      case AssetManagementActions.RejectTransferOwner:
        additionalComponent = (
          <RejectTransferOwnerOverlay
            handleRejectTransferOwner={rejectTransferOwner}
            rejectTransferOwnerState={rejectTransferOwnerState}
            keyId={keyId}
          />
        );
        break;
      case AssetManagementActions.RejectTransferOwnerHolder:
        additionalComponent = (
          <RejectTransferOwnerHolderOverlay
            handleRejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
            keyId={keyId}
          />
        );
        break;
      case AssetManagementActions.RejectTransferHolder:
        additionalComponent = (
          <RejectTransferHolderOverlay
            handleRejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formAction]);

  useEffect(() => {
    if (!isOverlayVisible) {
      switch (formAction) {
        case AssetManagementActions.RejectTransferOwner:
        case AssetManagementActions.RejectTransferHolder:
        case AssetManagementActions.RejectTransferOwnerHolder:
          setFormActionNone();
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverlayVisible]);

  useEffect(() => {
    if (isRejectPendingConfirmation) {
      closeOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRejectPendingConfirmation]);

  useEffect(() => {
    if (
      rejectTransferHolderState === FormState.CONFIRMED ||
      rejectTransferOwnerState === FormState.CONFIRMED ||
      rejectTransferOwnerHolderState === FormState.CONFIRMED
    ) {
      let state: string = "";
      if (rejectTransferHolderState === FormState.CONFIRMED) state = "HOLDER";
      else if (rejectTransferOwnerState === FormState.CONFIRMED) state = "OWNER";
      else if (rejectTransferOwnerHolderState === FormState.CONFIRMED) state = "OWNER_HOLDER";

      const transferMessageMap = {
        HOLDER: ["Holdership Rejection Success", { isSuccess: true, holderAddress: prevHolder }],
        OWNER: ["Ownership Rejection Success", { isSuccess: true, beneficiaryAddress: prevBeneficiary }],
        OWNER_HOLDER: [
          "Ownership & Holdership Rejection Success",
          { isSuccess: true, beneficiaryAddress: prevBeneficiary, holderAddress: prevHolder },
        ],
      };

      const message: [string, any] = transferMessageMap[state as keyof typeof transferMessageMap] as any;
      if (message) {
        showOverlay(showDocumentTransferMessage(...message));
      }

      setFormActionNone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rejectTransferHolderState, rejectTransferOwnerState, rejectTransferOwnerHolderState]);

  switch (formAction) {
    case AssetManagementActions.ReturnToIssuer:
      return (
        <SurrenderForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          keyId={keyId}
          handleReturnToIssuer={onReturnToIssuer}
          returnToIssuerState={returnToIssuerState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.AcceptReturnToIssuer:
      return (
        <AcceptSurrenderedForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          keyId={keyId}
          handleDestroyToken={onDestroyToken}
          destroyTokenState={destroyTokenState}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
        />
      );

    case AssetManagementActions.RejectReturnToIssuer:
      return (
        <RejectSurrenderedForm
          formAction={formAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          keyId={keyId}
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
          keyId={keyId}
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
          keyId={keyId}
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
          keyId={keyId}
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
          keyId={keyId}
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
            canReturnToIssuer={canReturnToIssuer}
            canHandleRestore={canHandleRestore}
            canHandleShred={canHandleShred}
            canRejectOwnerHolderTransfer={canRejectOwnerHolderTransfer}
            canRejectHolderTransfer={canRejectHolderTransfer}
            canRejectOwnerTransfer={canRejectOwnerTransfer}
            onConnectToWallet={onConnectToWallet}
            canChangeHolder={canTransferHolder}
            canEndorseBeneficiary={canTransferBeneficiary}
            isReturnedToIssuer={isReturnedToIssuer}
            isTokenBurnt={isTokenBurnt}
            canNominateBeneficiary={canNominateBeneficiary}
            canEndorseTransfer={canTransferOwners}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            isRejectPendingConfirmation={isRejectPendingConfirmation}
          />
        </>
      );
  }
};
