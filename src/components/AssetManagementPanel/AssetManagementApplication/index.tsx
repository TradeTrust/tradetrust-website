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
  const [holderErrorState, setHolderErrorState] = useState("");
  const { upgradeProvider, account } = useProviderContext();
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getApprovedTransferTarget, value: approvedTransferTarget } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );
  const { send: sendSurrender, state: surrenderingState } = useContractFunctionHook(titleEscrow, "transferTo");

  const { send: changeHolder, state: holderState } = useContractFunctionHook(titleEscrow, "changeHolder");

  const onSurrender = () => {
    sendSurrender(tokenRegistryAddress);
  };

  const onTransfer = (nextHolder: string) => {
    changeHolder(nextHolder);
  };

  const onSetFormAction = (AssetManagementActions: AssetManagementActions) => {
    setAssetManagementAction(AssetManagementActions);
    setHolderErrorState("");
  };

  useEffect(() => {
    setHolderErrorState(holderState);
    console.log("reseting holder error state", holderState);

    if (holderState === "PENDING_CONFIRMATION") {
      onSetFormAction(AssetManagementActions.None);
    }

    if (holderState === "CONFIRMED") {
      getHolder();
    }
  }, [holderState, getHolder]);

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
          onTransferHolder={onTransfer}
          holderState={holderErrorState}
        />
      </div>
    </div>
  );
};
