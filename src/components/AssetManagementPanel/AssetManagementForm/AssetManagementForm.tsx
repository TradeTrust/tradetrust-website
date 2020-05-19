import React from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { EndorseBeneficiaryForm } from "./FormVariants/EndorseBeneficiary";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TransferHolderForm } from "./FormVariants/TransferHolderForm";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedTransferTarget?: string;
  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder: (nextHolder: string) => void;
  onEndorseBeneficiary: (newBeneficiary: string, newHolder: string) => void;
  surrenderingState: string;
  onSurrender: () => void;
  holderTransferringState: string;
  beneficiaryEndorseState: string;
}

export const AssetManagementForm = ({
  account,
  formAction,
  tokenId,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  onSetFormAction,
  surrenderingState,
  onSurrender,
  onTransferHolder,
  holderTransferringState,
  onEndorseBeneficiary,
  beneficiaryEndorseState,
}: AssetManagementFormProps) => {
  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;
  const canEndorseBeneficiary = isBeneficiary && isHolder;

  const onBack = () => {
    if (
      surrenderingState === FormState.PENDING_CONFIRMATION ||
      holderTransferringState === FormState.PENDING_CONFIRMATION ||
      beneficiaryEndorseState === FormState.PENDING_CONFIRMATION
    )
      return;
    onSetFormAction(AssetManagementActions.None);
  };

  switch (formAction) {
    case AssetManagementActions.Surrender:
      return (
        <SurrenderForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleSurrender={onSurrender}
          surrenderingState={surrenderingState}
          onBack={onBack}
        />
      );

    case AssetManagementActions.EndorseBeneficiary:
      return (
        <EndorseBeneficiaryForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onEndorseBeneficiary}
          beneficiaryEndorseState={beneficiaryEndorseState}
          onBack={onBack}
        />
      );

    case AssetManagementActions.TransferHolder:
      return (
        <TransferHolderForm
          formAction={formAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          handleTransfer={onTransferHolder}
          holderTransferringState={holderTransferringState}
          onBack={onBack}
        />
      );

    default:
      return (
        <ActionSelectionForm
          onSetFormAction={onSetFormAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          beneficiary={beneficiary}
          holder={holder}
          account={account}
          canSurrender={canSurrender}
          onConnectToWallet={onConnectToWallet}
          canChangeHolder={isHolder}
          canEndorseBeneficiary={canEndorseBeneficiary}
        />
      );
  }
};
