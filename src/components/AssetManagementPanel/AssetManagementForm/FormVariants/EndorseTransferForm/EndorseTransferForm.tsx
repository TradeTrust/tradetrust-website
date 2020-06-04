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
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  approvedBeneficiary: string;
  approvedHolder: string;
  handleEndorseTransfer: (newBeneficiary: string, newHolder: string) => void;
  transferToNewEscrowState: string;
  onBack: () => void;
}

export const EndorseTransferForm = ({
  formAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  approvedBeneficiary,
  approvedHolder,
  handleEndorseTransfer,
  transferToNewEscrowState,
  onBack,
}: EndorseTransferFormProps) => {
  const isPendingConfirmation = transferToNewEscrowState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = transferToNewEscrowState === FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      // TODO: check the overlay
      showOverlay(
        showDocumentTransferMessage(MessageTitle.ENDORSE_TRANSFER_SUCCESS, {
          isSuccess: true,
          beneficiaryAddress: approvedBeneficiary,
          holderAddress: approvedHolder,
        })
      );
    }
  }, [isConfirmed, approvedBeneficiary, approvedHolder, showOverlay]);

  return (
    <div className="row py-3">
      <div className="col-12">
        {!isConfirmed && (
          <AssetManagementTitle onBack={onBack} formAction={formAction} disabled={isPendingConfirmation} />
        )}
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle
              role="Beneficiary"
              value={approvedBeneficiary}
              isEditable={false}
              onSetNewValue={() => {}}
            />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Holder" value={approvedHolder} isEditable={false} onSetNewValue={() => {}} />
          </div>
        </div>
        {!isConfirmed && (
          <div className="row mb-3">
            <div className="col-auto ml-auto">
              <div className="row no-gutters">
                <div className="col-auto">
                  <ButtonSolidWhiteGrey
                    onClick={onBack}
                    disabled={isPendingConfirmation}
                    data-testid={"cancelEndorseTraansferBtn"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidOrangeWhite
                    onClick={() => handleEndorseTransfer(approvedBeneficiary, approvedHolder)}
                    disabled={isPendingConfirmation || !approvedBeneficiary || !approvedHolder}
                    data-testid={"endorseTransferBtn"}
                  >
                    {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse</>}
                  </ButtonSolidOrangeWhite>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
