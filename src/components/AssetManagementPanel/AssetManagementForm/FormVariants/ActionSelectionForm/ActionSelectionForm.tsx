import React, { useContext } from "react";
import { ButtonSolidOrangeWhite } from "../../../../UI/Button";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { ManageAssetsDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  DocumentTransferMessage,
  MessageNoManageAccess,
  MessageNoMetamask,
  MessageNoUserAuthorization,
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

  const { setOverlayContent, setOverlayVisible } = useContext(OverlayContext);
  const onNoAccessHandle = () => {
    setOverlayContent(
      <DocumentTransferMessage title="No manage assets access" isTitleIconSuccess={false}>
        <MessageNoManageAccess />
      </DocumentTransferMessage>
    );
    setOverlayVisible(true);
  };

  const onMetamaskErrorHandle = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;

    setOverlayContent(
      <DocumentTransferMessage
        title={errorMesssage}
        isTitleIconSuccess={false}
        isMetamaskLink={!isUserDeniedAccountAuthorization}
      >
        {isUserDeniedAccountAuthorization ? <MessageNoUserAuthorization /> : <MessageNoMetamask />}
      </DocumentTransferMessage>
    );
    setOverlayVisible(true);
  };

  const onConnectWalletHandle = async () => {
    try {
      await onConnectToWallet();
    } catch (error) {
      onMetamaskErrorHandle(error.message, error.code);
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
                  <ButtonSolidOrangeWhite onClick={onNoAccessHandle}>No Access</ButtonSolidOrangeWhite>
                )}
              </>
            ) : (
              <ButtonSolidOrangeWhite data-testid={"connectToWallet"} onClick={onConnectWalletHandle}>
                Connect Wallet
              </ButtonSolidOrangeWhite>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
