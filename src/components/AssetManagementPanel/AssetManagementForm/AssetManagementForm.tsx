import React from "react";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
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
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
  surrenderingState: string;
  onSurrender: () => void;
  holderTransferringState: string;
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
}: AssetManagementFormProps) => {
  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;

  const onBack = (isPendingConfirmation: boolean) => {
    if (isPendingConfirmation) return;
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
        />
      );
  }
};
