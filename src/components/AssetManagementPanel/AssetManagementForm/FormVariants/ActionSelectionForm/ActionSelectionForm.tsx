import React, { useContext } from "react";
import { ButtonSolidOrangeWhite } from "../../../../UI/Button";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementDropdown } from "../../AssetManagementDropdown";
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
  canAcceptSurrender?: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  canNominateBeneficiaryHolder: boolean;
  canEndorseTransfer: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
}

export const ActionSelectionForm = ({
  onSetFormAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  canAcceptSurrender,
  onConnectToWallet,
  canChangeHolder,
  canEndorseBeneficiary,
  isSurrendered,
  isTokenBurnt,
  canNominateBeneficiaryHolder,
  canEndorseTransfer,
  setShowEndorsementChain,
  isTitleEscrow,
}: ActionSelectionFormProps) => {
  const canManage =
    canAcceptSurrender ||
    canSurrender ||
    canChangeHolder ||
    canEndorseBeneficiary ||
    canNominateBeneficiaryHolder ||
    canEndorseTransfer;

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
    <>
      <div className="flex flex-wrap justify-between mb-4 -mx-4">
        <div className="w-full px-4 lg:w-auto">
          <AssetInformationPanel
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        </div>
        {isSurrendered && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedRedLarge id="surrender-sign">Surrendered To Issuer</TagBorderedRedLarge>
            </div>
          </div>
        )}
        {isTokenBurnt && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedRedLarge id="surrendered-sign">Surrendered</TagBorderedRedLarge>
            </div>
          </div>
        )}
        {!isSurrendered && !isTokenBurnt && isTitleEscrow && (
          <>
            <div className="w-full px-4 lg:w-auto">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="w-full px-4 lg:w-auto">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
          </>
        )}
      </div>
      {!isTokenBurnt && (
        <div className="flex flex-wrap mb-4">
          <div className="w-auto lg:ml-auto">
            {account ? (
              <>
                {canManage ? (
                  <AssetManagementDropdown
                    onSetFormAction={onSetFormAction}
                    canSurrender={canSurrender}
                    canChangeHolder={canChangeHolder}
                    canEndorseBeneficiary={canEndorseBeneficiary}
                    canNominateBeneficiaryHolder={canNominateBeneficiaryHolder}
                    canEndorseTransfer={canEndorseTransfer}
                    canAcceptSurrender={canAcceptSurrender}
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
    </>
  );
};
