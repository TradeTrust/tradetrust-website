import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { AssetManagementTags } from "../AssetManagementTags";
import { DocumentStatus } from "../../DocumentStatus";
import { v5RoleHash } from "@trustvc/trustvc";
import { useTokenRegistryRole } from "../../../common/hooks/useTokenRegistryRole";
import { AssetInformationPanel } from "../AssetInformationPanel";

interface AssetManagementApplicationProps {
  isMagicDemo?: boolean;
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  keyId?: string;
}

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = ({
  isMagicDemo,
  tokenId,
  tokenRegistryAddress,
  setShowEndorsementChain,
  keyId,
}) => {
  const {
    holder,
    approvedBeneficiary,
    beneficiary,
    prevBeneficiary,
    prevHolder,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    returnToIssuer,
    returnToIssuerState,
    destroyTokenState,
    destroyToken,
    isReturnedToIssuer,
    isTokenBurnt,
    isTitleEscrow,
    nominate,
    nominateState,
    transferOwners,
    transferOwnersState,
    documentOwner,
    restoreToken,
    restoreTokenState,
    rejectTransferOwner,
    rejectTransferOwnerState,
    rejectTransferHolder,
    rejectTransferHolderState,
    rejectTransferOwnerHolder,
    rejectTransferOwnerHolderState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeToMetaMaskSigner, provider, account } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  const { hasRole: hasAccepterRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: v5RoleHash.AccepterRole,
  });
  const { hasRole: hasRestorerRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: v5RoleHash.RestorerRole,
  });

  const onDestroyToken = (remark: string = "0x") => {
    destroyToken(tokenId, remark);
  };

  const onSetFormAction = useCallback(
    (assetManagementActions: AssetManagementActions) => {
      setAssetManagementAction(assetManagementActions);
    },
    [setAssetManagementAction]
  );

  useEffect(() => {
    onSetFormAction(AssetManagementActions.None);
  }, [account, onSetFormAction]); // unset action panel to none, whenever user change metamask account

  return (
    <div id="title-transfer-panel">
      {(assetManagementAction === AssetManagementActions.None ||
        assetManagementAction === AssetManagementActions.RejectTransferHolder ||
        assetManagementAction === AssetManagementActions.RejectTransferOwner) && (
        // ui design requirement, to not show DocumentStatus & AssetManagementTags when user is on other actions
        <>
          <div className="container flex justify-between">
            <div className="w-2/3">
              <DocumentStatus isMagicDemo={isMagicDemo} />
            </div>
            <div className="w-auto mt-8">
              <AssetInformationPanel
                setShowEndorsementChain={setShowEndorsementChain}
                tokenRegistryAddress={tokenRegistryAddress}
              />
            </div>
          </div>
          <AssetManagementTags />
        </>
      )}
      <div className="container">
        {isTitleEscrow !== undefined && (
          <AssetManagementForm
            account={account}
            onConnectToWallet={upgradeToMetaMaskSigner}
            beneficiary={beneficiary}
            approvedBeneficiary={approvedBeneficiary}
            holder={holder}
            prevBeneficiary={prevBeneficiary}
            prevHolder={prevHolder}
            documentOwner={documentOwner}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            returnToIssuerState={returnToIssuerState}
            destroyTokenState={destroyTokenState}
            onReturnToIssuer={returnToIssuer}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            isReturnedToIssuer={isReturnedToIssuer}
            isTokenBurnt={isTokenBurnt}
            nominateBeneficiary={nominate}
            approveNewTransferTargetsState={nominateState}
            transferOwners={transferOwners}
            transferOwnersState={transferOwnersState}
            rejectTransferOwner={rejectTransferOwner}
            rejectTransferOwnerState={rejectTransferOwnerState}
            rejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
            rejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            isAcceptor={hasAccepterRole}
            isRestorer={hasRestorerRole}
            onDestroyToken={onDestroyToken}
            onRestoreToken={restoreToken}
            restoreTokenState={restoreTokenState}
            keyId={keyId}
          />
        )}
      </div>
    </div>
  );
};
