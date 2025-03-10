import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
} from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext } from "react";
import { TagBordered, TagBorderedSm } from "../../../../UI/Tag";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface ActionSelectionFormProps {
  beneficiary?: string;
  holder?: string;
  nominee?: string;

  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenRegistryAddress: string;
  account?: string;
  onConnectToWallet: () => void;
  isReturnedToIssuer: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
  isTitleEscrow: boolean;
  isRejectPendingConfirmation?: boolean;
  isTokenBurnt: boolean;

  canReturnToIssuer: boolean;
  canHandleShred?: boolean;
  canHandleRestore?: boolean;
  canTransferHolder: boolean;
  canTransferBeneficiary: boolean;
  canNominateBeneficiary: boolean;
  canEndorseBeneficiary: boolean;
  canTransferOwners: boolean;
  canRejectOwnerHolderTransfer: boolean;
  canRejectHolderTransfer: boolean;
  canRejectOwnerTransfer: boolean;
}

export const ActionSelectionForm: FunctionComponent<ActionSelectionFormProps> = ({
  onSetFormAction,
  beneficiary,
  holder,
  account,
  isReturnedToIssuer,
  isTokenBurnt,
  isTitleEscrow,
  isRejectPendingConfirmation,
  onConnectToWallet,

  canTransferHolder,
  canTransferBeneficiary,
  canTransferOwners,
  canNominateBeneficiary,
  canEndorseBeneficiary,
  canReturnToIssuer,
  canHandleShred,
  canHandleRestore,
  canRejectOwnerHolderTransfer,
  canRejectHolderTransfer,
  canRejectOwnerTransfer,
}) => {
  // const [tooltipMessage, setTooltipMessage] = useState("Copy");
  // const tooltipRef = useRef(null);

  const canManage =
    canTransferHolder ||
    canTransferBeneficiary ||
    canTransferOwners ||
    canNominateBeneficiary ||
    canEndorseBeneficiary ||
    canReturnToIssuer ||
    canHandleShred ||
    canHandleRestore ||
    canRejectOwnerHolderTransfer ||
    canRejectHolderTransfer ||
    canRejectOwnerTransfer;

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
      console.error(error);
      handleMetamaskError(error.message, error.code);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col flex-wrap justify-between gap-2">
        {isTokenBurnt && (
          <div className="flex-1 content-center">
            <TagBorderedSm
              id="surrendered-sign"
              className="bg-white rounded-xl text-scarlet-500 border-scarlet-500 content-center justify-self-center w-full xs:w-auto"
            >
              <h5 className="text-center break-keep">Taken out of circulation</h5>
            </TagBorderedSm>
          </div>
        )}
        {!isReturnedToIssuer && !isTokenBurnt && isTitleEscrow && (
          <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2">
            <div className="col-span-1">
              <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
            </div>
            <div className="col-span-1">
              <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
            </div>
          </div>
        )}
        {!isTokenBurnt && (
          <div className="flex-1 flex flex-col flex-wrap md:flex-row md:flex-nowrap justify-between gap-2">
            {isReturnedToIssuer && (
              <div className="flex-1 content-center">
                <TagBordered
                  id="surrender-sign"
                  className="bg-white rounded-xl text-scarlet-500 border-scarlet-500 content-center justify-self-center w-full xs:w-auto"
                >
                  <h5 data-testid="surrenderToIssuer" className="text-center break-keep">
                    ETR returned to Issuer
                  </h5>
                </TagBordered>
              </div>
            )}
            <div className="gap-y-4 xs:ml-auto xs:min-w-48 w-full xs:max-w-64 flex flex-col justify-center">
              <>
                {account ? (
                  <>
                    {canManage ? (
                      <AssetManagementDropdown
                        onSetFormAction={onSetFormAction}
                        canTransferHolder={canTransferHolder}
                        canTransferBeneficiary={canTransferBeneficiary}
                        canNominateBeneficiary={canNominateBeneficiary}
                        canEndorseBeneficiary={canEndorseBeneficiary}
                        canTransferOwners={canTransferOwners}
                        canReturnToIssuer={canReturnToIssuer}
                        canHandleRestore={canHandleRestore}
                        canHandleShred={canHandleShred}
                        canRejectOwnerHolderTransfer={canRejectOwnerHolderTransfer}
                        canRejectHolderTransfer={canRejectHolderTransfer}
                        canRejectOwnerTransfer={canRejectOwnerTransfer}
                        isRejectPendingConfirmation={isRejectPendingConfirmation}
                      />
                    ) : (
                      <Button
                        className="bg-cerulean-500 text-white rounded-xl text-lg py-2 px-3 min-w-6 hover:bg-cerulean-800 xs:w-full"
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
      </div>
    </>
  );
};
