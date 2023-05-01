import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { AssetManagementTags } from "../AssetManagementTags";
import { DocumentStatus } from "../../DocumentStatus";
import { constants } from "@govtechsg/token-registry";
import { useTokenRegistryRole } from "../../../common/hooks/useTokenRegistryRole";

interface AssetManagementApplicationProps {
  isMagicDemo?: boolean;
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = ({
  isMagicDemo,
  tokenId,
  tokenRegistryAddress,
  setShowEndorsementChain,
}) => {
  const {
    holder,
    approvedBeneficiary,
    beneficiary,
    changeHolder,
    changeHolderState,
    endorseBeneficiary,
    endorseBeneficiaryState,
    surrender,
    surrenderState,
    destroyTokenState,
    destroyToken,
    isSurrendered,
    isTokenBurnt,
    isTitleEscrow,
    nominate,
    nominateState,
    transferOwners,
    transferOwnersState,
    documentOwner,
    restoreToken,
    restoreTokenState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);
  const { upgradeToMetaMaskSigner, provider, account } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  const { hasRole: hasAccepterRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: constants.roleHash.AccepterRole,
  });
  const { hasRole: hasRestorerRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: constants.roleHash.RestorerRole,
  });

  const onDestroyToken = () => {
    destroyToken(tokenId);
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
      {assetManagementAction === AssetManagementActions.None && (
        // ui design requirement, to not show DocumentStatus & AssetManagementTags when user is on other actions
        <>
          <DocumentStatus isMagicDemo={isMagicDemo} />
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
            documentOwner={documentOwner}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            surrenderingState={surrenderState}
            destroyTokenState={destroyTokenState}
            onSurrender={surrender}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            isSurrendered={isSurrendered}
            isTokenBurnt={isTokenBurnt}
            nominateBeneficiary={nominate}
            approveNewTransferTargetsState={nominateState}
            transferOwners={transferOwners}
            transferOwnersState={transferOwnersState}
            setShowEndorsementChain={setShowEndorsementChain}
            isTitleEscrow={isTitleEscrow}
            isAcceptor={hasAccepterRole}
            isRestorer={hasRestorerRole}
            onDestroyToken={onDestroyToken}
            onRestoreToken={restoreToken}
            restoreTokenState={restoreTokenState}
          />
        )}
      </div>
    </div>
  );
};
