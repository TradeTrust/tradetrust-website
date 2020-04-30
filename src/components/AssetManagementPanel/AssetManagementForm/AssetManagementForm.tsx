import React from "react";
import { AssetManagementActions } from "../AssetManagementActions";
import { ActionSelectionForm } from "./FormVariants/ActionSelectionForm";
import { SurrenderForm } from "./FormVariants/SurrenderForm";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

interface AssetManagementFormProps {
  beneficiary?: string;
  holder?: string;
  approvedTransferTarget?: string;
  tokenId: string;
  tokenRegistryAddress: string;
  account?: string;
  formAction: AssetManagementActions;
  onConnectToWallet: () => void;
  titleEscrow: TitleEscrow;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  onTransferHolder?: (nextHolder: string) => void;
  onEndorseBeneficiary?: (nextBeneficiary: string) => void; // Assuming holder is default to current holder
  surrenderingState: string;
}

export const AssetManagementForm = ({
  account,
  formAction,
  tokenId,
  tokenRegistryAddress,
  onConnectToWallet,
  beneficiary,
  holder,
  titleEscrow,
  onSetFormAction,
  surrenderingState,
}: AssetManagementFormProps) => {
  const { send: sendSurrender } = useContractFunctionHook(titleEscrow, "transferTo");

  const handleFormAction = () => {
    // Depending on the form type, perform different things, right now we know it's only just surrender so...
    if (formAction !== AssetManagementActions.Surrender) return alert("Only surrender is supported now");
    sendSurrender(tokenRegistryAddress);
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
        handleSurrender={handleFormAction}
        surrenderingState={surrenderingState}
      />
    );
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
    />
  );
};
