import React, { useEffect, useState, useCallback } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./../AssetManagementForm";
import { AssetManagementTags } from "./../AssetManagementTags";
import { getLogger } from "../../../utils/logger";
import { useDispatch } from "react-redux";
import { resetCertificateState } from "../../../reducers/certificate";
interface AssetManagementApplicationProps {
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

const { trace } = getLogger("component: assetmanagementapplication");

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
    isTitleEscrow,
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
    resetStates: resetTokenInformationState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeProvider, account } = useProviderContext();
  const dispatch = useDispatch();

  const resetCertificateData = useCallback(() => dispatch(resetCertificateState()), [dispatch]);

  useEffect(() => {
    trace("initialise token information context");
    initialize(tokenRegistryAddress, tokenId);
    return () => {
      trace("reseting token information on unmount");
      resetTokenInformationState();
      resetCertificateData();
    };
  }, [initialize, tokenId, tokenRegistryAddress, resetTokenInformationState, resetCertificateData]);

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
        {isTitleEscrow && (
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
            onApproveNewTransferTargets={approveNewTransferTargets}
            approveNewTransferTargetsState={approveNewTransferTargetsState}
            onTransferToNewEscrow={transferToNewEscrow}
            transferToNewEscrowState={transferToNewEscrowState}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        )}
        {isTitleEscrow === false && (
          <h5 id="interaction-unavailable-text">
            At this point in time, direct interaction with Erc721 is not supported on tradetrust.io
          </h5>
        )}
      </div>
    </div>
  );
};
