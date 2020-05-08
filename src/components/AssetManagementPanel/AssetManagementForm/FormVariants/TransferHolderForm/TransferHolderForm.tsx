import React, { useState } from "react";
import { ButtonSolidGreenWhite, ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface TransferHolderProps {
  formAction: AssetManagementActions;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleTransfer: (newHolder: string) => void;
  holderTransferringState: string;
  onBack: (isPendingConfirmation: boolean) => void;
}

export const TransferHolderForm = ({
  formAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  holderTransferringState,
  onBack,
}: TransferHolderProps) => {
  const [newHolder, setNewHolder] = useState("");
  const isPendingConfirmation = holderTransferringState === "PENDING_CONFIRMATION";
  const isConfirmed = holderTransferringState === "CONFIRMED";

  const onHandleTransfer = () => {
    handleTransfer(newHolder);
  };

  const isValidTransfer = () => {
    if (!newHolder) return false;
    if (newHolder === holder) return false;

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
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle
              role="Holder"
              value={holder}
              newValue={newHolder}
              isEditable={true}
              onSetNewValue={setNewHolder}
              error={holderTransferringState === "ERROR"}
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
                    onClick={() => onBack(isPendingConfirmation)}
                    disabled={isPendingConfirmation}
                    data-testid={"cancelTransferBtn"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidOrangeWhite
                    disabled={!isValidTransfer() || isPendingConfirmation}
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
