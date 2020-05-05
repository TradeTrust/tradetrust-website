import * as React from "react";
import { ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
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
  holderState: string;
}

export const TransferHolderForm = ({
  formAction,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleTransfer,
  holderState,
}: TransferHolderProps) => {
  const [newHolder, setNewHolder] = React.useState<string>("");

  const onBackHandler = () => {
    onSetFormAction(AssetManagementActions.None);
  };

  const onSetNewHolder = (value: string) => {
    setNewHolder(value);
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
        <AssetManagementTitle onBack={onBackHandler} formAction={formAction} disabled={false} />
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
              onSetNewValue={onSetNewHolder}
              errorState={holderState}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            <div className="row no-gutters">
              <div className="col-auto">
                <ButtonSolidWhiteGrey
                  onClick={() => onSetFormAction(AssetManagementActions.None)}
                  data-testid={"cancelTransferBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
                <ButtonSolidOrangeWhite
                  disabled={validateTransfer()}
                  onClick={onHandleTransfer}
                  data-testid={"transferBtn"}
                >
                  Transfer
                </ButtonSolidOrangeWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
