import React, { useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";
interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetManagementApplication = ({
  tokenId,
  tokenRegistryAddress,
  setShowEndorsementChain,
}: AssetManagementApplicationProps) => {
  const {
    initialize,
    approvedHolder,
    holder,
    approvedBeneficiary,
    beneficiary,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    transferTo,
    transferToState,
    isSurrendered,
    isLoading,
    tokenOwnerType,
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
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
      {!isLoading && (
        <div className="container-custom">
          <AssetManagementTags />
          {tokenOwnerType === "TitleEscrow" && (
            <AssetManagementForm
              account={account}
              onConnectToWallet={upgradeProvider}
              beneficiary={beneficiary}
              approvedBeneficiary={approvedBeneficiary}
              holder={holder}
              approvedHolder={approvedHolder}
              formAction={assetManagementAction}
              tokenRegistryAddress={tokenRegistryAddress}
              onSetFormAction={onSetFormAction}
              surrenderingState={transferToState}
              onSurrender={onSurrender}
              onTransferHolder={changeHolder}
              holderTransferringState={changeHolderState}
              onEndorseBeneficiary={endorseBeneficiary}
              beneficiaryEndorseState={endorseBeneficiaryState}
              isSurrendered={isSurrendered}
              isLoading={isLoading}
              onApproveNewTransferTargets={approveNewTransferTargets}
              approveNewTransferTargetsState={approveNewTransferTargetsState}
              onTransferToNewEscrow={transferToNewEscrow}
              transferToNewEscrowState={transferToNewEscrowState}
              setShowEndorsementChain={setShowEndorsementChain}
            />
          )}
          {tokenOwnerType === "Wallet" && (
            <h5>At this point in time, direct interaction with Erc721 is not supported on tradetrust.io</h5>
          )}
        </div>
      )}
    </div>
  );
};
