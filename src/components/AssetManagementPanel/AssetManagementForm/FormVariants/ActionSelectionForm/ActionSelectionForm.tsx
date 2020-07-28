import React, { useContext } from "react";
import { ButtonSolidOrangeWhite } from "../../../../UI/Button";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { ManageAssetsDropdown } from "../../AssetManagementDropdown";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  isSurrendered: boolean;
  canNominateBeneficiaryHolder: boolean;
  canEndorseTransfer: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const ActionSelectionForm = ({
  onSetFormAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  onConnectToWallet,
  canChangeHolder,
  canEndorseBeneficiary,
  isSurrendered,
  canNominateBeneficiaryHolder,
  canEndorseTransfer,
  setShowEndorsementChain,
}: ActionSelectionFormProps) => {
  const canManage =
    canSurrender || canChangeHolder || canEndorseBeneficiary || canNominateBeneficiaryHolder || canEndorseTransfer;

  const { showOverlay } = useContext(OverlayContext);
  const handleNoAccess = () => {
    showOverlay(showDocumentTransferMessage(MessageTitle.NO_MANAGE_ACCESS, { isSuccess: false }));
  };

  const handleMetamaskError = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;

    showOverlay(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
        isButtonMetamaskInstall: !isUserDeniedAccountAuthorization,
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
    <div className="row">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel
              tokenRegistryAddress={tokenRegistryAddress}
              setShowEndorsementChain={setShowEndorsementChain}
            />
          </div>
          {isSurrendered ? (
            <div className="col-12 col-lg-auto align-self-end">
              <div className="py-3">
                <TagBorderedRedLarge>Surrendered</TagBorderedRedLarge>
              </div>
            </div>
          ) : (
            <>
              <div className="col-12 col-lg">
                <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} />
              </div>
              <div className="col-12 col-lg">
                <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
              </div>
            </>
          )}
        </div>
        {!isSurrendered && (
          <div className="row mb-3">
            <div className="col-auto ml-lg-auto">
              {account ? (
                <>
                  {canManage ? (
                    <ManageAssetsDropdown
                      onSetFormAction={onSetFormAction}
                      canSurrender={canSurrender}
                      canChangeHolder={canChangeHolder}
                      canEndorseBeneficiary={canEndorseBeneficiary}
                      canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
                      canEndorseTransfer={canEndorseTransfer}
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
        )}
      </div>
    </div>
  );
};
