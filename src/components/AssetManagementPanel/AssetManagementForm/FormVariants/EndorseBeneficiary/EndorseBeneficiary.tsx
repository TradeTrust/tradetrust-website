import React, { useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidGreenWhite, ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface EndorseBeneficiaryProps {
  formAction: AssetManagementActions;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleTransfer: (newBeneficiary: string, newHolder: string) => void;
  beneficiaryEndorseState: string;
  onBack: () => void;
}

export const EndorseBeneficiaryForm = ({
  formAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  beneficiaryEndorseState,
  onBack,
}: EndorseBeneficiaryProps) => {
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const [newHolder, setNewHolder] = useState("");
  const isPendingConfirmation = beneficiaryEndorseState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = beneficiaryEndorseState === FormState.CONFIRMED;
  const isEditable =
    beneficiaryEndorseState !== FormState.PENDING_CONFIRMATION && beneficiaryEndorseState !== FormState.CONFIRMED;

  const isValidEndorse = () => {
    if (!newBeneficiary || !newHolder) return false;
    if (newBeneficiary === beneficiary && newHolder === holder) return false;

    return true;
  };

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
              isEditable={isEditable}
              onSetNewValue={setNewHolder}
              error={beneficiaryEndorseState === FormState.ERROR}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {isConfirmed ? (
              <div className="row">
                <div className="col-auto">
                  <ButtonSolidGreenWhite disabled>Success</ButtonSolidGreenWhite>
                </div>
              </div>
            ) : (
              <div className="row no-gutters">
                <div className="col-auto">
                  <ButtonSolidWhiteGrey
                    onClick={onBack}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
