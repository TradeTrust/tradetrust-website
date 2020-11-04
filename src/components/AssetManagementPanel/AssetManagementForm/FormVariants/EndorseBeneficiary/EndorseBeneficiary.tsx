import {
  ButtonSolidOrangeWhite,
  ButtonSolidWhiteGrey,
  LoaderSpinner,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
} from "@govtechsg/tradetrust-ui-components";
import React, { useContext, useEffect, useState } from "react";
import { isEthereumAddress } from "../../../../../utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
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
    <div className="row py-3">
      <div className="col-12">
        <AssetManagementTitle
          setFormActionNone={setFormActionNone}
          formAction={formAction}
          disabled={isPendingConfirmation}
        />
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel
              setShowEndorsementChain={setShowEndorsementChain}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle
              role="Owner"
              value={beneficiary}
              newValue={newBeneficiary}
              isEditable={isEditable}
              onSetNewValue={setNewBeneficiary}
              error={beneficiaryEndorseState === FormState.ERROR}
            />
          </div>
          <div className="col-12 col-lg">
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
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            <div className="row no-gutters">
              <div className="col-auto">
                <ButtonSolidWhiteGrey
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelEndorseBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
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
      </div>
    </div>
  );
};
