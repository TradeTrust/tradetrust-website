import React, { useEffect, useContext } from "react";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";

interface SurrenderFormProps {
  formAction: AssetManagementActions;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleSurrender: () => void;
  surrenderingState: string;
  onBack: () => void;
}

export const SurrenderForm = ({
  formAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleSurrender,
  surrenderingState,
  onBack,
}: SurrenderFormProps) => {
  const isPendingConfirmation = surrenderingState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = surrenderingState === FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.SURRENDER_DOCUMENT_SUCCESS, { isSuccess: true }));
      onBack(); // onSetFormAction to none
    }
  }, [isConfirmed, showOverlay, onBack]);

  return (
    <div className="row py-3">
      <div className="col-12">
        <AssetManagementTitle onBack={onBack} formAction={formAction} disabled={isPendingConfirmation} />
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} onSetNewValue={() => {}} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            <div className="row no-gutters">
              <div className="col-auto">
                <ButtonSolidWhiteGrey
                  onClick={onBack}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
                <ButtonSolidRedWhite
                  onClick={handleSurrender}
                  disabled={isPendingConfirmation}
                  data-testid={"surrenderBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Surrender Document</>}
                </ButtonSolidRedWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
