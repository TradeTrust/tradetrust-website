import { Button, MessageTitle, OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { TagBorderedLg } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  canHandleSurrender?: boolean;
  onConnectToWallet: () => void;
  canChangeHolder: boolean;
  canEndorseBeneficiary: boolean;
  isSurrendered: boolean;
  isTokenBurnt: boolean;
  canNominateBeneficiary: boolean;
  canEndorseTransfer: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
}

export const ActionSelectionForm: FunctionComponent<ActionSelectionFormProps> = ({
  onSetFormAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  canHandleSurrender,
  onConnectToWallet,
  canChangeHolder,
  canEndorseBeneficiary,
  isSurrendered,
  isTokenBurnt,
  canNominateBeneficiary,
  canEndorseTransfer,
  setShowEndorsementChain,
  isTitleEscrow,
}) => {
  const canManage =
    canHandleSurrender ||
    canSurrender ||
    canChangeHolder ||
    canEndorseBeneficiary ||
    canNominateBeneficiary ||
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
    } catch (error: any) {
      handleMetamaskError(error.message, error.code);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-between pb-4 -mx-4">
        <div className="w-full px-4 lg:w-1/3">
          <AssetInformationPanel
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        </div>
        {isSurrendered && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedLg id="surrender-sign" className="bg-white rounded-xl text-scarlet-500 border-scarlet-500">
                <h3 className="text-4xl" data-testid="surrenderToIssuer">
                  Surrendered To Issuer
                </h3>
              </TagBorderedLg>
            </div>
          </div>
        )}
        {isTokenBurnt && (
          <div className="w-full px-4 lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedLg id="surrendered-sign" className="bg-white rounded-xl text-scarlet-500 border-scarlet-500">
                <h3 className="text-4xl">Surrendered</h3>
              </TagBorderedLg>
            </div>
          </div>
        )}
        {!isSurrendered && !isTokenBurnt && isTitleEscrow && (
          <>
            <div className="w-full px-4 lg:w-1/3">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
          </>
        )}
      </div>
      {!isTokenBurnt && (
        <div className="flex flex-wrap pb-4">
          <div className="w-auto lg:ml-auto">
            {account ? (
              <>
                {canManage ? (
                  <AssetManagementDropdown
                    onSetFormAction={onSetFormAction}
                    canSurrender={canSurrender}
                    canChangeHolder={canChangeHolder}
                    canEndorseBeneficiary={canEndorseBeneficiary}
                    canNominateBeneficiary={canNominateBeneficiary}
                    canEndorseTransfer={canEndorseTransfer}
                    canHandleSurrender={canHandleSurrender}
                  />
                ) : (
                  <Button
                    className="bg-cerulean-500 text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-800"
                    onClick={handleNoAccess}
                  >
                    No Access
                  </Button>
                )}
              </>
            ) : (
              <Button
                className="bg-cerulean-500 text-white rounded-xl text-lg py-2 px-3 hover:bg-cerulean-800"
                data-testid={"connectToWallet"}
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
