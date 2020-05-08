import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import React, { useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";

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
  const [holderTransferringState, setHolderTransferringState] = useState("");
  const { upgradeProvider, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedTransferTarget, value: approvedTransferTarget } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );
  const { send: sendSurrender, state: surrenderingState } = useContractFunctionHook(titleEscrow, "transferTo");

  const { send: changeHolder, state: changeHolderState } = useContractFunctionHook(titleEscrow, "changeHolder");

  const onSurrender = () => {
    sendSurrender(tokenRegistryAddress);
  };

  const onSetFormAction = (AssetManagementActions: AssetManagementActions) => {
    setAssetManagementAction(AssetManagementActions);
    setHolderTransferringState("");
  };

  useEffect(() => {
    setHolderTransferringState(changeHolderState);
  }, [changeHolderState]);

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
          onSetFormAction={onSetFormAction}
          surrenderingState={surrenderingState}
          onSurrender={onSurrender}
          onTransferHolder={changeHolder}
          holderTransferringState={holderTransferringState}
        />
      </div>
    </div>
  );
};
