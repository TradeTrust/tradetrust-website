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
import { useEndorsementChain } from "../../../../../common/hooks/useEndorsementChain";
import { TitleEscrowEvent } from "../../../../../types";

interface AcceptSurrenderFormProps {
  tokenId: string;
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleAcceptSurrender: () => void;
  acceptSurrenderingState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  handleRejectSurrender: (lastBeneficary: string) => void;
  rejectSurrenderingState: string;
}

export const AcceptSurrenderForm = ({
  tokenId,
  formAction,
  tokenRegistryAddress,
  handleAcceptSurrender,
  acceptSurrenderingState,
  setFormActionNone,
  setShowEndorsementChain,
  handleRejectSurrender,
  rejectSurrenderingState,
}: AcceptSurrenderFormProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const { endorsementChain } = useEndorsementChain(tokenRegistryAddress, tokenId);

  const isAcceptSurrenderingPendingConfirmation = acceptSurrenderingState === FormState.PENDING_CONFIRMATION;
  const isRejectSurrenderingPendingConfirmation = rejectSurrenderingState === FormState.PENDING_CONFIRMATION;
  const isPendingConfirmation = isAcceptSurrenderingPendingConfirmation || isRejectSurrenderingPendingConfirmation;
  const isAcceptSurrenderConfirmed = acceptSurrenderingState === FormState.CONFIRMED;
  const isRejectSurrenderConfirmed = rejectSurrenderingState === FormState.CONFIRMED;

  const lastTransferEvent = endorsementChain
    ?.filter(({ eventType }) => eventType === "Transfer")
    .pop() as TitleEscrowEvent;
  const lastBeneficary = lastTransferEvent?.beneficiary;

  const onClickRejectSurrender = () => {
    showOverlay(
      showDocumentTransferMessage(MessageTitle.CONFIRM_REJECT_SURRENDER_DOCUMENT, {
        isSuccess: true,
        beneficiaryAddress: lastBeneficary,
        isConfirmationMessage: true,
        onConfirmaionAction: () => handleRejectSurrender(lastBeneficary),
      })
    );
  };

  useEffect(() => {
    if (isAcceptSurrenderConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.ACCEPT_SURRENDER_DOCUMENT, { isSuccess: true }));
      setFormActionNone();
    }
    if (isRejectSurrenderConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.REJECT_SURRENDER_DOCUMENT, { isSuccess: false }));
      setFormActionNone();
    }
  }, [isAcceptSurrenderConfirmed, showOverlay, setFormActionNone, isRejectSurrenderConfirmed]);

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
                  onClick={onClickRejectSurrender}
                  disabled={isPendingConfirmation}
                  data-testid={"rejectSurrenderBtn"}
                >
                  {isRejectSurrenderingPendingConfirmation ? (
                    <LoaderSpinner data-testid={"reject-loader"} />
                  ) : (
                    <>Reject Document</>
                  )}
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
                <ButtonSolidRedWhite
                  onClick={handleAcceptSurrender}
                  disabled={isPendingConfirmation}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isAcceptSurrenderingPendingConfirmation ? (
                    <LoaderSpinner data-testid={"accept-loader"} />
                  ) : (
                    <>Shred Document</>
                  )}
                </ButtonSolidRedWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
