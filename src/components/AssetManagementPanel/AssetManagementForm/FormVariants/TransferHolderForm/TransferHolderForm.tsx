import React, { useState } from "react";
import { ButtonSolidGreenWhite, ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface TransferHolderProps {
  formAction: AssetManagementActions;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleTransfer: (newHolder: string) => void;
  holderTransferringState: string;
}

export const TransferHolderForm = ({
  formAction,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  holderTransferringState,
}: TransferHolderProps) => {
  const [newHolder, setNewHolder] = useState("");
  const isPendingConfirmation = holderTransferringState === "PENDING_CONFIRMATION";
  const isConfirmed = holderTransferringState === "CONFIRMED";

  const onBackHandler = () => {
    onSetFormAction(AssetManagementActions.None);
  };

  const onHandleTransfer = () => {
    handleTransfer(newHolder);
  };

  const validateTransfer = () => {
    if (!newHolder) return true;
    if (newHolder === holder) return true;

    return false;
  };

  return (
    <div className="row py-3">
      <div className="col-12">
        {!isConfirmed && (
          <AssetManagementTitle onBack={onBackHandler} formAction={formAction} disabled={isPendingConfirmation} />
        )}
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle
              role="Holder"
              value={holder}
              newValue={newHolder}
              isEditable={true}
              onSetNewValue={setNewHolder}
              errorState={holderTransferringState}
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
                    onClick={onBackHandler}
                    disabled={isPendingConfirmation}
                    data-testid={"cancelTransferBtn"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidOrangeWhite
                    disabled={validateTransfer() || isPendingConfirmation}
                    onClick={onHandleTransfer}
                    data-testid={"transferBtn"}
                  >
                    {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
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
