import React, { useState, useEffect, useContext } from "react";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidGreenWhite, ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
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
  const [isConfirmedSurrenderSuccess, setConfirmedSurrenderSuccess] = useState(false);
  const isPendingConfirmation = surrenderingState === "PENDING_CONFIRMATION";
  const isConfirmed = surrenderingState === "CONFIRMED";

  const { setOverlayContent } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed && !isConfirmedSurrenderSuccess) {
      setOverlayContent(showDocumentTransferMessage(MessageTitle.SURRENDER_DOCUMENT_SUCCESS, { isSuccess: true }));
      setConfirmedSurrenderSuccess(true);
    }
  }, [isConfirmed, isConfirmedSurrenderSuccess, setOverlayContent]);

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
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} onSetNewValue={() => {}} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {isConfirmed ? (
              <div className="row">
                <div className="col-auto">
                  <ButtonSolidGreenWhite disabled>Surrender Successful</ButtonSolidGreenWhite>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
