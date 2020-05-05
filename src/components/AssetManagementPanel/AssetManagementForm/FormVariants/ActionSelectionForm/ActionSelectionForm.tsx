import React, { useContext } from "react";
import { ButtonSolidOrangeWhite } from "../../../../UI/Button";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { ManageAssetsDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
}

export const ActionSelectionForm = ({
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  onConnectToWallet,
  canChangeHolder,
}: ActionSelectionFormProps) => {
  const canManage = canSurrender || canChangeHolder;

  const { setOverlayContent } = useContext(OverlayContext);
  const handleNoAccess = () => {
    setOverlayContent(showDocumentTransferMessage(MessageTitle.NO_MANAGE_ACCESS, { isSuccess: false }));
  };

  const handleMetamaskError = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;

    setOverlayContent(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
        isMetamaskLink: !isUserDeniedAccountAuthorization,
      })
    ); // there is 2 type of errors that will be handled here, 1st = NO_METAMASK (error thrown from provider.tsx), 2nd = NO_USER_AUTHORIZATION (error from metamask extension itself).
  };

  const handleConnectWallet = async () => {
    try {
      await onConnectToWallet();
    } catch (error) {
      handleMetamaskError(error.message, error.code);
    }
  };

  return (
    <div className="row py-3">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {account ? (
              <>
                {canManage ? (
                  <ManageAssetsDropdown
                    onSetFormAction={onSetFormAction}
                    canSurrender={canSurrender}
                    canChangeHolder={canChangeHolder}
                  />
                ) : (
                  <ButtonSolidOrangeWhite onClick={handleNoAccess}>No Access</ButtonSolidOrangeWhite>
                )}
              </>
            ) : (
              <ButtonSolidOrangeWhite data-testid={"connectToWallet"} onClick={handleConnectWallet}>
                Connect Wallet
              </ButtonSolidOrangeWhite>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
