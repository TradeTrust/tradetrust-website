import React, { useState, useEffect } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { AssetManagementTags } from "./../AssetManagementTags";
import { AssetManagementForm } from "./../AssetManagementForm";
import { useProviderContext } from "../../../common/contexts/provider";
import { AssetManagementActions } from "../AssetManagementActions";

interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
  titleEscrow: TitleEscrow;
}

export const AssetManagementApplication = ({
  tokenId,
  tokenRegistryAddress,
  titleEscrow,
}: AssetManagementApplicationProps) => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeProvider, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedTransferTarget, value: approvedTransferTarget } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );
  const { state: surrenderingState } = useContractFunctionHook(titleEscrow, "transferTo");

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
          onConnectToWallet={upgradeProvider}
          beneficiary={beneficiary}
          holder={holder}
          approvedTransferTarget={approvedTransferTarget}
          formAction={assetManagementAction}
          tokenId={tokenId}
          tokenRegistryAddress={tokenRegistryAddress}
          titleEscrow={titleEscrow}
          onSetFormAction={setAssetManagementAction}
          surrenderingState={surrenderingState}
        />
      </div>
    </div>
  );
};
