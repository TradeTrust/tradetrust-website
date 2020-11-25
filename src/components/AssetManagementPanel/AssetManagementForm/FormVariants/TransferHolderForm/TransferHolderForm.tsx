import React, { useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { isEthereumAddress } from "../../../../../utils";
import { ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface TransferHolderProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleTransfer: (newHolder: string) => void;
  holderTransferringState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const TransferHolderForm = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  holderTransferringState,
  setFormActionNone,
  setShowEndorsementChain,
}: TransferHolderProps) => {
  const [newHolder, setNewHolder] = useState("");
  const isPendingConfirmation = holderTransferringState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = holderTransferringState === FormState.CONFIRMED;
  const isEditable =
    holderTransferringState !== FormState.PENDING_CONFIRMATION && holderTransferringState !== FormState.CONFIRMED;
  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.TRANSFER_HOLDER_SUCCESS, { isSuccess: true, holderAddress: newHolder })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newHolder, showOverlay, setFormActionNone]);

  const isValidTransfer = () => {
    if (!newHolder) return false;
    if (newHolder === holder) return false;
    if (!isEthereumAddress(newHolder)) return false;

    return true;
  };

  return (
    <>
      <AssetManagementTitle
        setFormActionNone={setFormActionNone}
        formAction={formAction}
        disabled={isPendingConfirmation}
      />
      <div className="flex flex-wrap justify-between mb-4 -mx-4">
        <div className="w-full px-4 lg:w-1/3">
          <AssetInformationPanel
            setShowEndorsementChain={setShowEndorsementChain}
            tokenRegistryAddress={tokenRegistryAddress}
          />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle
            role="Holder"
            value={holder}
            newValue={newHolder}
            isEditable={isEditable}
            onSetNewValue={setNewHolder}
            error={holderTransferringState === FormState.ERROR}
          />
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="w-auto ml-auto">
          <div className="flex flex-wrap">
            <div className="w-auto">
              <ButtonSolidWhiteGrey
                onClick={setFormActionNone}
                disabled={isPendingConfirmation}
                data-testid={"cancelTransferBtn"}
              >
                Cancel
              </ButtonSolidWhiteGrey>
            </div>
            <div className="w-auto ml-2">
              <ButtonSolidOrangeWhite
                disabled={!isValidTransfer() || isPendingConfirmation}
                onClick={() => handleTransfer(newHolder)}
                data-testid={"transferBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
              </ButtonSolidOrangeWhite>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
