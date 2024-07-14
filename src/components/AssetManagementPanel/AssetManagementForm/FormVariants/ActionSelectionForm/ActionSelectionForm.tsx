import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
} from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useRef, useState } from "react";
import { TagBorderedLg } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import ReactTooltip from "react-tooltip";

interface ActionSelectionFormProps {
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  canHandleShred?: boolean;
  canHandleRestore?: boolean;
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
  canHandleShred,
  canHandleRestore,
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
  const [tooltipMessage, setTooltipMessage] = useState("Copy");
  const tooltipRef = useRef(null);

  const canManage =
    canHandleShred ||
    canHandleRestore ||
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

  const handleActiveWalletClicked = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        setTooltipMessage("Copied!");
        ReactTooltip.hide(tooltipRef.current!);
        setTimeout(() => {
          ReactTooltip.show(tooltipRef.current!);
        }, 0);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const handleConnectWallet = async () => {
    try {
      await onConnectToWallet();
    } catch (error: any) {
      console.error(error);
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
        <div className="flex flex-col items-stretch pb-4 ">
          <div className="gap-y-4 lg:ml-auto w-44 flex flex-col">
            {account ? (
              <>
                <div
                  onMouseLeave={() => setTooltipMessage("Copy")}
                  ref={tooltipRef}
                  data-tip={tooltipMessage}
                  data-for="active-wallet-tooltip"
                  onClick={handleActiveWalletClicked}
                  data-testid="activeWallet"
                  className="w-44 px-4 py-1 ml-auto flex items-center bg-gray-100 text-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out select-none"
                >
                  <img src={"/static/images/wallet.png"} alt="Wallet Icon" className="w-6 h-6 mr-4" />
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-sm">Active Wallet</p>
                    <h5 className="text-cerulean-300 text-sm font-bold block whitespace-nowrap">{`${account.slice(
                      0,
                      6
                    )}...${account.slice(-4)}`}</h5>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <>
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
                      canHandleRestore={canHandleRestore}
                      canHandleShred={canHandleShred}
                    />
                  ) : (
                    <Button
                      className="bg-cerulean-500 text-white rounded-xl text-lg py-2 px-3 min-w-6 hover:bg-cerulean-800"
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
            </>
          </div>
        </div>
      )}
      <ReactTooltip type="light" id="active-wallet-tooltip" effect="solid" getContent={() => tooltipMessage} />
    </>
  );
};
