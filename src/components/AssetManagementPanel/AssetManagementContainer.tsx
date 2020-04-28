import React, { FunctionComponent, useState, useEffect } from "react";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { AssetManagementTags } from "./AssetManagementTags";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { useProviderContext } from "../../common/contexts/provider";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { AssetManagementForm } from "./AssetManagementForm";

export enum AssetManagementActions {
  None = "None",
  TransferHolder = "TransferHolder",
  EndorseBeneficiary = "EndorseBeneficiary",
  Surrender = "Surrender",
}

interface AssetManagementApplication {
  tokenId: string;
  tokenRegistryAddress: string;
  titleEscrow: TitleEscrow;
}

export const AssetManagementApplication: FunctionComponent<AssetManagementApplication> = ({
  tokenId,
  tokenRegistryAddress,
  titleEscrow,
}) => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { isUpgraded, upgradeProvider, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedTransferTarget, value: approvedTransferTarget } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );
  const { send: sendSurrender, state: surrenderingState } = useContractFunctionHook(titleEscrow, "transferTo");

  const isHolder = account === holder;
  const isBeneficiary = account === beneficiary;
  // Can surrender when current user is both beneficiary and holder
  const canSurrender = isHolder && isBeneficiary;
  // // Can name the next beneficiary if current user is the beneficiary
  // const canEndorseBeneficiary = isBeneficiary;
  // // Can execute transfer when either (the current user is both the beneficiary and holder)
  // // or the (the current user is the holder and the beneficiary has been named)
  // const canTransfer = isHolder;
  // const canTransferToAnyTarget = canTransfer && isBeneficiary;
  // // Can change holder when current user is holder
  // const canChangeHolder = isHolder;

  const onSurrender = () => {
    sendSurrender(tokenRegistryAddress);
  };

  useEffect(() => {
    getHolder();
    getBeneficiary();
    getApprovedTransferTarget();
  }, [getApprovedTransferTarget, getBeneficiary, getHolder, titleEscrow]);

  return (
    <div id="title-transfer-panel">
      <div className="container-custom">
        <AssetManagementTags />
        <AssetManagementForm
          account={account}
          isConnectedToWallet={isUpgraded}
          onConnectToWallet={upgradeProvider}
          beneficiary={beneficiary}
          holder={holder}
          approvedTransferTarget={approvedTransferTarget}
          formAction={assetManagementAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          onSurrender={onSurrender}
          surrenderingState={surrenderingState}
          onSetFormAction={setAssetManagementAction}
        />
      </div>
    </div>
  );
};

export const AssetManagementContainer = ({ document }: { document: WrappedDocument }) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const { provider } = useProviderContext();
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  if (!titleEscrow) return null;

  return (
    <AssetManagementApplication
      tokenId={tokenId}
      tokenRegistryAddress={tokenRegistryAddress}
      titleEscrow={titleEscrow}
    />
  );
};
