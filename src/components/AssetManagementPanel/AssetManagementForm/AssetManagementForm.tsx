import React from "react";
import { AssetManagementActions } from "../AssetManagementContainer";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { SurrenderForm } from "./FormVariants/SurrenderForm";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedTransferTarget?: string;

  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  surrenderingState: any;
  isConnectedToWallet: boolean;
  onConnectToWallet: () => void;
  onSurrender: () => void;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder?: (nextHolder: string) => void;
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
}

export const AssetManagementForm = ({
  account,
  formAction,
  tokenId,
  tokenRegistryAddress,
  onSurrender,
  surrenderingState,
  isConnectedToWallet,
  onConnectToWallet,
  beneficiary,
  holder,
  onSetFormAction,
}: AssetManagementFormProps) => {
  const handleFormAction = () => {
    // Depending on the form type, perform different things, right now we know it's only just surrender so...
    if (formAction !== AssetManagementActions.Surrender) return alert("Only surrender is supported now");
    onSurrender();
  };

  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  const canSurrender = isBeneficiary && isHolder;

  if (formAction === AssetManagementActions.Surrender)
    return (
      <SurrenderForm
        formAction={formAction}
        onSetFormAction={onSetFormAction}
        tokenId={tokenId}
        tokenRegistryAddress={tokenRegistryAddress}
        beneficiary={beneficiary}
        holder={holder}
        surrenderingState={surrenderingState}
        handleFormAction={handleFormAction}
      />
    );
  return (
    <ActionSelectionForm
      isConnectedToWallet={isConnectedToWallet}
      onSetFormAction={onSetFormAction}
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      beneficiary={beneficiary}
      holder={holder}
      account={account}
      canSurrender={canSurrender}
      onConnectToWallet={onConnectToWallet}
    />
  );
};
