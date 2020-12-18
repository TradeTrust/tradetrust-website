import { Button, MessageTitle, OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { useContext, useEffect } from "react";
import { FormState } from "../../../../../constants/FormState";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
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
          <EditableAssetTitle role="Owner" value={approvedBeneficiary} isEditable={false} onSetNewValue={() => {}} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Holder" value={approvedHolder} isEditable={false} onSetNewValue={() => {}} />
        </div>
      </div>
      <div className="flex flex-wrap pb-4">
        <div className="w-auto ml-auto">
          <div className="flex flex-wrap">
            <div className="w-auto">
              <Button
                className="bg-white text-grey hover:bg-grey-100"
                onClick={setFormActionNone}
                disabled={isPendingConfirmation}
              >
                Cancel
              </Button>
            </div>
            <div className="w-auto ml-2">
              <Button
                className="bg-orange text-white hover:bg-orange-600"
                onClick={() => handleEndorseTransfer(approvedBeneficiary || "", approvedHolder || "")}
                disabled={isPendingConfirmation}
                data-testid={"endorseTransferBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse Transfer</>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
