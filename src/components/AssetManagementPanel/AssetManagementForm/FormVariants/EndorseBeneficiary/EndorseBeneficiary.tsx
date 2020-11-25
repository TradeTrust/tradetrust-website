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

interface EndorseBeneficiaryProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleTransfer: (newBeneficiary: string, newHolder: string) => void;
  beneficiaryEndorseState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorseBeneficiaryForm = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  beneficiaryEndorseState,
  setFormActionNone,
  setShowEndorsementChain,
}: EndorseBeneficiaryProps) => {
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const [newHolder, setNewHolder] = useState("");
  const isPendingConfirmation = beneficiaryEndorseState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = beneficiaryEndorseState === FormState.CONFIRMED;
  const isEditable =
    beneficiaryEndorseState !== FormState.PENDING_CONFIRMATION && beneficiaryEndorseState !== FormState.CONFIRMED;
  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.CHANGE_BENEFICIARY_SUCCESS, {
          isSuccess: true,
          beneficiaryAddress: newBeneficiary,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newBeneficiary, showOverlay, setFormActionNone]);

  const isValidEndorse = () => {
    if (!newBeneficiary || !newHolder) return false;
    if (newBeneficiary === beneficiary && newHolder === holder) return false;
    if (!isEthereumAddress(newBeneficiary) || !isEthereumAddress(newHolder)) return false;

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
          <EditableAssetTitle
            role="Owner"
            value={beneficiary}
            newValue={newBeneficiary}
            isEditable={isEditable}
            onSetNewValue={setNewBeneficiary}
            error={beneficiaryEndorseState === FormState.ERROR}
          />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle
            role="Holder"
            value={holder}
            newValue={newHolder}
            isEditable={isEditable}
            onSetNewValue={setNewHolder}
            error={beneficiaryEndorseState === FormState.ERROR}
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
                data-testid={"cancelEndorseBtn"}
              >
                Cancel
              </ButtonSolidWhiteGrey>
            </div>
            <div className="w-auto ml-2">
              <ButtonSolidOrangeWhite
                disabled={!isValidEndorse() || isPendingConfirmation}
                onClick={() => handleTransfer(newBeneficiary, newHolder)}
                data-testid={"endorseBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse</>}
              </ButtonSolidOrangeWhite>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
