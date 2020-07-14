import React, { useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";
import { EndorsementChainContainer } from "../../EndorsementChain/EndorsementChainContainer";
interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
}

export const AssetManagementApplication = ({ tokenId, tokenRegistryAddress }: AssetManagementApplicationProps) => {
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
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
  } = useTokenInformationContext();
  const [showEndorsementChain, setShowEndorsementChain] = useState(false);
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
        <button onClick={() => setShowEndorsementChain(!showEndorsementChain)}>Show/Hide Endorsement Chain</button>
        <AssetManagementTags />
        <AssetManagementForm
          account={account}
          onConnectToWallet={upgradeProvider}
          beneficiary={beneficiary}
          approvedBeneficiary={approvedBeneficiary}
          holder={holder}
          approvedHolder={approvedHolder}
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
          isSurrendered={isSurrendered}
          onApproveNewTransferTargets={approveNewTransferTargets}
          approveNewTransferTargetsState={approveNewTransferTargetsState}
          onTransferToNewEscrow={transferToNewEscrow}
          transferToNewEscrowState={transferToNewEscrowState}
        />
        {showEndorsementChain && <EndorsementChainContainer tokenId={tokenId} tokenRegistry={tokenRegistryAddress} />}
      </div>
    </div>
  );
};
