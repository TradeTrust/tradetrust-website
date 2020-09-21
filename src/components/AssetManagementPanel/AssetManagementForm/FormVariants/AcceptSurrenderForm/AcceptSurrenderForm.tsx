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
import { TagBorderedRedLarge } from "../../../../UI/Tag";

interface AcceptSurrenderFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleAcceptSurrender: () => void;
  acceptSurrenderingState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AcceptSurrenderForm = ({
  formAction,
  tokenRegistryAddress,
  handleAcceptSurrender,
  acceptSurrenderingState,
  setFormActionNone,
  setShowEndorsementChain,
}: AcceptSurrenderFormProps) => {
  const isPendingConfirmation = acceptSurrenderingState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = acceptSurrenderingState === FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.ACCEPT_SURRENDER_DOCUMENT, { isSuccess: true, reload: true })
      );
      setFormActionNone();
    }
  }, [isConfirmed, showOverlay, setFormActionNone]);

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
          <div className="col-12 col-lg-auto align-self-end">
            <div className="py-3">
              <TagBorderedRedLarge id="surrender-sign">Surrendered To Issuer</TagBorderedRedLarge>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            <div className="row no-gutters">
              <div className="col-auto">
                <ButtonSolidWhiteGrey
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
                <ButtonSolidRedWhite
                  onClick={handleAcceptSurrender}
                  disabled={isPendingConfirmation}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Shred Document</>}
                </ButtonSolidRedWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
