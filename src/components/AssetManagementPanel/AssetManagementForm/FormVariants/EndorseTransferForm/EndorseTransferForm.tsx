import React, { useContext, useEffect } from "react";
import { FormState } from "../../../../../constants/FormState";
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

interface EndorseTransferFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  approvedBeneficiary?: string;
  approvedHolder?: string;
  handleEndorseTransfer: (approvedBeneficiary: string, approvedHolder: string) => void;
  transferToNewEscrowState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorseTransferForm = ({
  formAction,
  tokenRegistryAddress,
  approvedBeneficiary,
  approvedHolder,
  handleEndorseTransfer,
  transferToNewEscrowState,
  setFormActionNone,
  setShowEndorsementChain,
}: EndorseTransferFormProps) => {
  const isPendingConfirmation = transferToNewEscrowState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = transferToNewEscrowState === FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.ENDORSE_TRANSFER_SUCCESS, {
          isSuccess: true,
          beneficiaryAddress: approvedBeneficiary,
          holderAddress: approvedHolder,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, approvedHolder, approvedBeneficiary, showOverlay, setFormActionNone]);

  return (
    <div className="flex flex-wrap py-4">
      <div className="w-full">
        <AssetManagementTitle
          setFormActionNone={setFormActionNone}
          formAction={formAction}
          disabled={isPendingConfirmation}
        />
        <div className="flex flex-wrap py-4">
          <div className="w-full lg:flex-grow">
            <AssetInformationPanel
              setShowEndorsementChain={setShowEndorsementChain}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
          <div className="w-full lg:flex-grow">
            <EditableAssetTitle role="Owner" value={approvedBeneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="w-full lg:flex-grow">
            <EditableAssetTitle role="Holder" value={approvedHolder} isEditable={false} onSetNewValue={() => {}} />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-auto ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <ButtonSolidWhiteGrey onClick={setFormActionNone} disabled={isPendingConfirmation}>
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="w-auto ml-2">
                <ButtonSolidOrangeWhite
                  onClick={() => handleEndorseTransfer(approvedBeneficiary || "", approvedHolder || "")}
                  disabled={isPendingConfirmation}
                  data-testid={"endorseTransferBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse Transfer</>}
                </ButtonSolidOrangeWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
