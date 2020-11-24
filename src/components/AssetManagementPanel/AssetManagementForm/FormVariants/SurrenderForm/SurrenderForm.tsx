import React, { useContext, useEffect } from "react";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
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

interface SurrenderFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleSurrender: () => void;
  surrenderingState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const SurrenderForm = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleSurrender,
  surrenderingState,
  setFormActionNone,
  setShowEndorsementChain,
}: SurrenderFormProps) => {
  const isPendingConfirmation = surrenderingState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = surrenderingState === FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.SURRENDER_DOCUMENT_SUCCESS, { isSuccess: true }));
      setFormActionNone();
    }
  }, [isConfirmed, showOverlay, setFormActionNone]);

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
          <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Holder" value={holder} isEditable={false} onSetNewValue={() => {}} />
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="w-auto ml-auto">
          <div className="flex flex-wrap">
            <div className="w-auto">
              <ButtonSolidWhiteGrey
                onClick={setFormActionNone}
                disabled={isPendingConfirmation}
                data-testid={"cancelSurrenderBtn"}
              >
                Cancel
              </ButtonSolidWhiteGrey>
            </div>
            <div className="w-auto ml-2">
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
    </>
  );
};
