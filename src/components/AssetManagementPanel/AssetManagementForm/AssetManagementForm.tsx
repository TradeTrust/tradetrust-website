import React, { FunctionComponent, useCallback, useContext, useEffect } from "react";
import { OverlayContext } from "../../../common/contexts/OverlayContext";
import { InitialAddress } from "../../../constants/chain-info";
import { FormState } from "../../../constants/FormState";
import { showDocumentTransferMessage } from "../../UI/Overlay/OverlayContent";
import { RejectTransferHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferHolderOverlay";
import { RejectTransferOwnerHolderOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerHolderOverlay";
import { RejectTransferOwnerOverlay } from "../AssetManagementActionOverlay/RejectTransferOwnerOverlay";
import { AssetManagementActions } from "../AssetManagementActions";
import { FooterActionButtons } from "./FooterActionButtons";
import { ActionForm } from "./FormVariants/ActionForm";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";

interface RejectTransferActions {
  rejectTransferOwnerHolder: ({ remarks }: { remarks: string }) => void;
  rejectTransferOwnerHolderState: string;
  rejectTransferOwner: ({ remarks }: { remarks: string }) => void;
  rejectTransferOwnerState: string;
  rejectTransferHolder: ({ remarks }: { remarks: string }) => void;
  rejectTransferHolderState: string;
}

interface TransferActions {
  onTransferHolder: ({ newHolderAddress, remarks }: { newHolderAddress: string; remarks: string }) => void;
  holderTransferringState: string;
  onEndorseBeneficiary: ({
    newBeneficiaryAddress,
    remarks,
  }: {
    newBeneficiaryAddress: string;
    remarks: string;
  }) => void;
  beneficiaryEndorseState: string;
  nominateBeneficiary: ({ newBeneficiaryAddress, remarks }: { newBeneficiaryAddress: string; remarks: string }) => void;
  nominateBeneficiaryState: string;
  transferOwners: ({
    newBeneficiaryAddress,
    newHolderAddress,
    remarks,
  }: {
    newBeneficiaryAddress: string;
    newHolderAddress: string;
    remarks: string;
  }) => void;
  transferOwnersState: string;
}

interface ReturnToIssuerActions {
  onReturnToIssuer: (remark: string) => void;
  returnToIssuerState: string;
  onDestroyToken: (remark: string) => void;
  destroyTokenState: string;
  onRestoreToken: (remark: string) => void;
  restoreTokenState: string;
}

interface ContractState {
  beneficiary?: string;
  holder?: string;
  nominee?: string;
  prevBeneficiary?: string;
  prevHolder?: string;
}

interface AssetManagementFormProps
  extends ContractState,
    RejectTransferActions,
    TransferActions,
    ReturnToIssuerActions {
  isRestorer?: boolean;
  isAcceptor?: boolean;
  isTitleEscrow: boolean;
  isReturnedToIssuer: boolean;
  isTokenBurnt: boolean;
  isExpired?: boolean;
  documentOwner?: string;
  tokenRegistryAddress: string;
  account?: string;
  keyId?: string;
  formAction: AssetManagementActions;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetManagementForm: FunctionComponent<AssetManagementFormProps> = ({
  beneficiary,
  holder,
  nominee,
  prevBeneficiary,
  prevHolder,

  account,
  formAction,
  tokenRegistryAddress,
  onSetFormAction,
  isRestorer,
  isAcceptor,
  isReturnedToIssuer,
  isTokenBurnt,
  setShowEndorsementChain,
  isTitleEscrow,
  isExpired,
  keyId,

  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
  nominateBeneficiary,
  nominateBeneficiaryState,
  transferOwners,
  transferOwnersState,

  rejectTransferOwner,
  rejectTransferOwnerState,
  rejectTransferHolder,
  rejectTransferHolderState,
  rejectTransferOwnerHolder,
  rejectTransferOwnerHolderState,

  onRestoreToken,
  restoreTokenState,
  onReturnToIssuer,
  returnToIssuerState,
  onDestroyToken,
  destroyTokenState,
}) => {
  const isActiveTitleEscrow = isTitleEscrow && !isReturnedToIssuer;
  const isHolder = isTitleEscrow && account === holder;
  const isBeneficiary = isTitleEscrow && account === beneficiary;
  const isHolderAndBeneficiary = isHolder && isBeneficiary;
  const hasNominee = !!nominee && nominee !== InitialAddress;
  const hasPreviousBeneficiary = !!prevBeneficiary && prevBeneficiary !== InitialAddress;
  const hasPreviousHolder = !!prevHolder && prevHolder !== InitialAddress;

  const canReturnToIssuer = isBeneficiary && isHolder && !isReturnedToIssuer;
  /*
    In order to shred we need to check 3 conditions
    - document is surrendered
    - documentOwner is the tokenRegistry
    - currentUser === tokenRegistryMinter
  */
  const canHandleRestore = isTitleEscrow && isRestorer && isReturnedToIssuer;
  const canHandleShred = isTitleEscrow && isAcceptor && isReturnedToIssuer;
  const canTransferHolder = isActiveTitleEscrow && isHolder;
  const canTransferBeneficiary = isActiveTitleEscrow && isHolderAndBeneficiary;
  const canTransferOwners = isActiveTitleEscrow && isHolder && isBeneficiary;
  const canNominateBeneficiary = isActiveTitleEscrow && isBeneficiary && !isHolder;
  const canEndorseBeneficiary = isActiveTitleEscrow && isHolder && hasNominee;
  const canRejectOwnerHolderTransfer =
    isActiveTitleEscrow && isHolder && isBeneficiary && hasPreviousHolder && hasPreviousBeneficiary;
  const canRejectHolderTransfer = // Bug here, transfer holder and transfer holder back, will not be able to reject
    !isHolderAndBeneficiary &&
    isActiveTitleEscrow &&
    isHolder &&
    hasPreviousHolder &&
    !(isBeneficiary && hasPreviousBeneficiary);
  const canRejectOwnerTransfer =
    !isHolderAndBeneficiary &&
    isActiveTitleEscrow &&
    isBeneficiary &&
    hasPreviousBeneficiary &&
    !(isHolder && hasPreviousHolder);
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
      nominateBeneficiaryState === FormState.PENDING_CONFIRMATION ||
      transferOwnersState === FormState.PENDING_CONFIRMATION
    )
      return;
    onSetFormAction(AssetManagementActions.None);
  }, [
    returnToIssuerState,
    destroyTokenState,
    holderTransferringState,
    beneficiaryEndorseState,
    nominateBeneficiaryState,
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
          />
        );
        break;
      case AssetManagementActions.RejectTransferOwnerHolder:
        additionalComponent = (
          <RejectTransferOwnerHolderOverlay
            handleRejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
          />
        );
        break;
      case AssetManagementActions.RejectTransferHolder:
        additionalComponent = (
          <RejectTransferHolderOverlay
            handleRejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
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
        showOverlay(
          showDocumentTransferMessage(
            ...message,
            <FooterActionButtons setShowEndorsementChain={setShowEndorsementChain} closeOverlay={closeOverlay} />
          )
        );
      }

      setFormActionNone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rejectTransferHolderState, rejectTransferOwnerState, rejectTransferOwnerHolderState]);

  return (
    <>
      {formAction === AssetManagementActions.None && (
        <ActionSelectionForm
          onSetFormAction={onSetFormAction}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          nominee={nominee}
          account={account}
          canReturnToIssuer={canReturnToIssuer}
          canHandleRestore={canHandleRestore}
          canHandleShred={canHandleShred}
          canRejectOwnerHolderTransfer={canRejectOwnerHolderTransfer}
          canRejectHolderTransfer={canRejectHolderTransfer}
          canRejectOwnerTransfer={canRejectOwnerTransfer}
          canTransferHolder={canTransferHolder}
          canTransferBeneficiary={canTransferBeneficiary}
          canNominateBeneficiary={canNominateBeneficiary}
          canEndorseBeneficiary={canEndorseBeneficiary}
          canTransferOwners={canTransferOwners}
          isReturnedToIssuer={isReturnedToIssuer}
          isTokenBurnt={isTokenBurnt}
          setShowEndorsementChain={setShowEndorsementChain}
          isTitleEscrow={isTitleEscrow}
          isRejectPendingConfirmation={isRejectPendingConfirmation}
          isExpired={isExpired}
        />
      )}
      {(formAction === AssetManagementActions.TransferHolder ||
        formAction === AssetManagementActions.TransferOwner ||
        formAction === AssetManagementActions.TransferOwnerHolder ||
        formAction === AssetManagementActions.EndorseBeneficiary ||
        formAction === AssetManagementActions.NominateBeneficiary ||
        formAction === AssetManagementActions.ReturnToIssuer ||
        formAction === AssetManagementActions.AcceptReturnToIssuer ||
        formAction === AssetManagementActions.RejectReturnToIssuer) && (
        <ActionForm
          type={formAction}
          beneficiary={beneficiary!}
          holder={holder!}
          nominee={nominee}
          keyId={keyId}
          isExpired={isExpired}
          setFormActionNone={setFormActionNone}
          setShowEndorsementChain={setShowEndorsementChain}
          // nominate
          handleNomination={nominateBeneficiary}
          nominationState={nominateBeneficiaryState}
          // transfer beneficiary / endorse beneficiary
          handleBeneficiaryTransfer={onEndorseBeneficiary}
          beneficiaryEndorseState={beneficiaryEndorseState}
          // transfer holder
          handleTransfer={onTransferHolder}
          holderTransferringState={holderTransferringState}
          // transfer owners
          handleEndorseTransfer={transferOwners}
          transferOwnersState={transferOwnersState}
          // return to issuer
          handleReturnToIssuer={onReturnToIssuer}
          returnToIssuerState={returnToIssuerState}
          // accept return to issuer
          handleDestroyToken={onDestroyToken}
          destroyTokenState={destroyTokenState}
          // reject return to issuer
          handleRestoreToken={onRestoreToken}
          restoreTokenState={restoreTokenState}
        />
      )}
    </>
  );
};
