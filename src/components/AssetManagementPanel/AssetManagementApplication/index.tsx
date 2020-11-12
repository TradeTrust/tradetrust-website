import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import React, { useCallback, useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
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
    destroyTokenState,
    destroyToken,
    isSurrendered,
    isTokenBurnt,
    isTitleEscrow,
    approveNewTransferTargets,
    approveNewTransferTargetsState,
    transferToNewEscrow,
    transferToNewEscrowState,
    documentOwner,
    restoreToken,
    restoreTokenState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeProvider, account, provider } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  // Check if direct owner is minter, useContractFunctionHook value returns {0: boolean}
  const { call: checkIsMinter, value: isMinter } = useContractFunctionHook(tokenRegistry, "isMinter");

  useEffect(() => {
    if (isTitleEscrow === false && account) {
      checkIsMinter(account);
    }
  }, [account, checkIsMinter, isTitleEscrow]);
  const onSurrender = () => {
    // Change to surrendered state
    transferTo(tokenRegistryAddress);
  };

  const onDestroyToken = () => {
    destroyToken(tokenId);
  };

  const onRestoreToken = (lastBeneficiary?: string, lastHolder?: string) => {
    if (!lastBeneficiary || !lastHolder) throw new Error("Ownership data is not found");
    restoreToken(lastBeneficiary, lastHolder);
  };

  const onSetFormAction = useCallback(
    (AssetManagementActions: AssetManagementActions) => {
      setAssetManagementAction(AssetManagementActions);
    },
    [setAssetManagementAction]
  );

  useEffect(() => {
    onSetFormAction(AssetManagementActions.None);
  }, [account, onSetFormAction]); // unset action panel to none, whenever user change metamask account

  return (
    <div id="title-transfer-panel">
      <div className="container">
        <AssetManagementTags />
        {isTitleEscrow !== undefined && (
          <AssetManagementForm
            account={account}
            onConnectToWallet={upgradeProvider}
            beneficiary={beneficiary}
            approvedBeneficiary={approvedBeneficiary}
            holder={holder}
            approvedHolder={approvedHolder}
            documentOwner={documentOwner}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            surrenderingState={transferToState}
            destroyTokenState={destroyTokenState}
            onSurrender={onSurrender}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            isSurrendered={isSurrendered}
            isTokenBurnt={isTokenBurnt}
            onApproveNewTransferTargets={approveNewTransferTargets}
            approveNewTransferTargetsState={approveNewTransferTargetsState}
            onTransferToNewEscrow={transferToNewEscrow}
            transferToNewEscrowState={transferToNewEscrowState}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            isMinter={isMinter?.[0]}
            onDestroyToken={onDestroyToken}
            onRestoreToken={onRestoreToken}
            restoreTokenState={restoreTokenState}
            tokenId={tokenId}
          />
        )}
      </div>
    </div>
  );
};
