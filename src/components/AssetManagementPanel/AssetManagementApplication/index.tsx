import React, { useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
}

export const AssetManagementApplication = ({ tokenId, tokenRegistryAddress }: AssetManagementApplicationProps) => {
  const {
    initialize,
    holder,
    beneficiary,
    approvedTransferTarget,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    transferTo,
    transferToState,
    isEBLSurrendered,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeProvider, account } = useProviderContext();

  useEffect(() => {
    initialize(tokenRegistryAddress, tokenId);
  }, [initialize, tokenId, tokenRegistryAddress]);

  const onSurrender = () => {
    transferTo(tokenRegistryAddress);
  };

  const onSetFormAction = (AssetManagementActions: AssetManagementActions) => {
    setAssetManagementAction(AssetManagementActions);
  };

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
          surrenderingState={transferToState}
          onSurrender={onSurrender}
          onTransferHolder={changeHolder}
          holderTransferringState={changeHolderState}
          onEndorseBeneficiary={endorseBeneficiary}
          beneficiaryEndorseState={endorseBeneficiaryState}
          isEBLSurrendered={isEBLSurrendered}
        />
      </div>
    </div>
  );
};
