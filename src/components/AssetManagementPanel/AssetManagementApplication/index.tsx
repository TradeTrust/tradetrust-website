import { v5RoleHash, v4RoleHash } from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Upload } from "react-feather";
import { Link } from "react-router-dom";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { useTokenRegistryRole } from "../../../common/hooks/useTokenRegistryRole";
import { FORM_SG_URL } from "../../../routes";
import { Button } from "../../Button";
import { DocumentStatus } from "../../DocumentStatus";
import { Banner } from "../../UI/Banner";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { TagBordered } from "../../UI/Tag";
import { useTokenRegistryVersion } from "../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../constants";

interface AssetManagementIsTransferableDocumentProps {
  isMagicDemo?: boolean;
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  isTransferableDocument: true;
  isExpired: boolean;
}

interface AssetManagementIsNotTransferableDocumentProps {
  isMagicDemo?: boolean;
  isTransferableDocument: false;
  isExpired: boolean;
}

type AssetManagementApplicationProps =
  | (AssetManagementIsNotTransferableDocumentProps | AssetManagementIsTransferableDocumentProps) & {
      isSampleDocument: boolean;
    };

const renderBanner = (isSample: boolean, isMagic: boolean | undefined) => {
  const props = {
    to: FORM_SG_URL,
    buttonText: "Contact us now",
    title: "Ready to learn how TradeTrust can benefit your business?",
    absolute: true,
  };
  if (isSample || isMagic) {
    return <Banner {...props} />;
  } else {
    return null;
  }
};

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = (props) => {
  const { isMagicDemo, tokenId, tokenRegistryAddress, setShowEndorsementChain, isTransferableDocument, isExpired } =
    props as AssetManagementIsTransferableDocumentProps;
  const isSampleDocument = props.isSampleDocument;
  const {
    approvedBeneficiary: nominee,
    holder,
    beneficiary,
    prevBeneficiary,
    prevHolder,
    isReturnedToIssuer,
    isTokenBurnt,
    isTitleEscrow,
    documentOwner,
    // nominate
    nominate,
    nominateState,
    // transferHolder
    changeHolder,
    changeHolderState,
    // endorseBeneficiary / transferBeneficiary
    endorseBeneficiary,
    endorseBeneficiaryState,
    // transferOwners
    transferOwners,
    transferOwnersState,
    // returnToIssuer
    returnToIssuer,
    returnToIssuerState,
    // reject return to issuer
    restoreToken,
    restoreTokenState,
    // accept return to issuer
    destroyToken,
    destroyTokenState,
    // reject transfer owner
    rejectTransferOwner,
    rejectTransferOwnerState,
    // reject transfer holder
    rejectTransferHolder,
    rejectTransferHolderState,
    // reject transfer owner holder
    rejectTransferOwnerHolder,
    rejectTransferOwnerHolderState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState<AssetManagementActions>(
    AssetManagementActions.None
  );
  const tokenRegistryVersion = useTokenRegistryVersion();
  const { provider, account } = useProviderContext();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  const { hasRole: hasAccepterRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.AccepterRole : v5RoleHash.AccepterRole,
  });
  const { hasRole: hasRestorerRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.RestorerRole : v5RoleHash.RestorerRole,
  });

  const onDestroyToken = (remarks: string = "0x") => {
    destroyToken({ tokenId, remarks });
  };

  const onRestoreToken = (remarks: string = "0x") => {
    restoreToken({ tokenId, remarks });
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
    <div id="title-transfer-panel" className="container justify-between">
      <div id="asset-management-box" className="flex p-4 flex-col gap-2 bg-white rounded-xl">
        <div id="file-name" className="flex-1 justify-between">
          <div className="flex flex-row justify-end content-center min-h-16 gap-2">
            <Link id="upload-new-file" data-testid="upload-new-file" className="content-center" to={"/"}>
              <Button className="bg-white text-cerulean-500 hover:bg-cloud-100 w-10 h-10 xs:w-auto flex items-center justify-center">
                <div className="sm:block hidden px-2">Upload New File</div>
                <Upload className="sm:hidden block text-cerulean-500 max-w-[16px]" />
              </Button>
            </Link>
          </div>
        </div>
        {(assetManagementAction === AssetManagementActions.None ||
          assetManagementAction === AssetManagementActions.RejectTransferHolder ||
          assetManagementAction === AssetManagementActions.RejectTransferOwner ||
          assetManagementAction === AssetManagementActions.RejectTransferOwnerHolder) && (
          <DocumentStatus
            isMagicDemo={isMagicDemo}
            isTransferableDocument={isTransferableDocument}
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        )}

        <div id="divider" className="flex-1 border-t-2 my-2" />

        {isTransferableDocument && isTitleEscrow !== undefined ? (
          <AssetManagementForm
            beneficiary={beneficiary}
            holder={holder}
            nominee={nominee}
            prevBeneficiary={prevBeneficiary}
            prevHolder={prevHolder}
            account={account}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            documentOwner={documentOwner}
            isRestorer={hasRestorerRole}
            isAcceptor={hasAccepterRole}
            isReturnedToIssuer={isReturnedToIssuer}
            isTitleEscrow={isTitleEscrow}
            setShowEndorsementChain={setShowEndorsementChain}
            isTokenBurnt={isTokenBurnt}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            nominateBeneficiary={nominate}
            nominateBeneficiaryState={nominateState}
            transferOwners={transferOwners}
            transferOwnersState={transferOwnersState}
            rejectTransferOwner={rejectTransferOwner}
            rejectTransferOwnerState={rejectTransferOwnerState}
            rejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
            rejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
            onReturnToIssuer={returnToIssuer}
            returnToIssuerState={returnToIssuerState}
            onDestroyToken={onDestroyToken}
            destroyTokenState={destroyTokenState}
            onRestoreToken={onRestoreToken}
            restoreTokenState={restoreTokenState}
            isExpired={isExpired}
          />
        ) : (
          isExpired && (
            <div className="flex-1 content-center space-y-2 md:space-x-2 md:space-y-0">
              <TagBordered
                id="expired-sign"
                rounded="rounded-full"
                className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
              >
                <h5 data-testid="expiredDoc" className="text-center break-keep">
                  Expired
                </h5>
              </TagBordered>
            </div>
          )
        )}
        {renderBanner(isSampleDocument, isMagicDemo)}
      </div>
    </div>
  );
};
