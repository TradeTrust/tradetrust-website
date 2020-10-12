import React, { useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { OverlayContext } from "../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "../../../../UI/Overlay/OverlayContent/DocumentTransferMessage";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { useEndorsementChain } from "../../../../../common/hooks/useEndorsementChain";
import { TitleEscrowEvent } from "../../../../../types";

interface HandleSurrenderedFormProps {
  tokenId: string;
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleDestroyToken: () => void;
  destroyTokenState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  handleRestoreToken: (lastBeneficiary?: string, lastHolder?: string) => void;
  restoreTokenState: string;
}

export const HandleSurrenderedForm = ({
  tokenId,
  formAction,
  tokenRegistryAddress,
  handleDestroyToken,
  destroyTokenState,
  setFormActionNone,
  setShowEndorsementChain,
  handleRestoreToken,
  restoreTokenState,
}: HandleSurrenderedFormProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const { endorsementChain, pending } = useEndorsementChain(tokenRegistryAddress, tokenId);
  const [lastBeneficiary, setLastBeneficiary] = useState<string>();
  const [lastHolder, setLastHolder] = useState<string>();

  const isDestroyTokenPendingConfirmation = destroyTokenState === FormState.PENDING_CONFIRMATION;
  const isRestoreTokenPendingConfirmation = restoreTokenState === FormState.PENDING_CONFIRMATION;
  const isPendingConfirmation = isDestroyTokenPendingConfirmation || isRestoreTokenPendingConfirmation;
  const isDestroyTokenConfirmed = destroyTokenState === FormState.CONFIRMED;
  const isRestoreTokenConfirmed = restoreTokenState === FormState.CONFIRMED;

  const onClickRejectSurrender = () => {
    showOverlay(
      showDocumentTransferMessage(MessageTitle.CONFIRM_REJECT_SURRENDER_DOCUMENT, {
        isSuccess: true,
        beneficiaryAddress: lastBeneficiary || "Loading...",
        holderAddress: lastHolder || "Loading...",
        isConfirmationMessage: true,
        onConfirmationAction: () => handleRestoreToken(lastBeneficiary, lastHolder),
      })
    );
  };

  useEffect(() => {
    if (!pending) {
      const lastTransferEvent = endorsementChain
        ?.filter(({ eventType }) => eventType === "Transfer")
        .pop() as TitleEscrowEvent;
      const lastBeneficiary = lastTransferEvent?.beneficiary;
      setLastBeneficiary(lastBeneficiary);
      const lastHolderEvent = lastTransferEvent?.holderChangeEvents.pop();
      const lastHolder = lastHolderEvent?.holder;
      setLastHolder(lastHolder);
    }
  }, [endorsementChain, pending]);

  useEffect(() => {
    if (isDestroyTokenConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.ACCEPT_SURRENDER_DOCUMENT, { isSuccess: true }));
      setFormActionNone();
    }
  }, [showOverlay, setFormActionNone, isDestroyTokenConfirmed]);

  useEffect(() => {
    if (isRestoreTokenConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.REJECT_SURRENDER_DOCUMENT, { isSuccess: true }));
      setFormActionNone();
    }
  }, [showOverlay, setFormActionNone, isRestoreTokenConfirmed]);

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
        {!pending && (
          <div className="row mb-3">
            <div className="col-auto ml-auto">
              <div className="row no-gutters">
                <div className="col-auto">
                  <ButtonSolidWhiteGrey
                    onClick={onClickRejectSurrender}
                    disabled={isPendingConfirmation}
                    data-testid={"rejectSurrenderBtn"}
                  >
                    {isRestoreTokenPendingConfirmation ? (
                      <LoaderSpinner data-testid={"reject-loader"} />
                    ) : (
                      <>Reject Document</>
                    )}
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidRedWhite
                    onClick={handleDestroyToken}
                    disabled={isPendingConfirmation}
                    data-testid={"acceptSurrenderBtn"}
                  >
                    {isDestroyTokenPendingConfirmation ? (
                      <LoaderSpinner data-testid={"accept-loader"} />
                    ) : (
                      <>Shred Document</>
                    )}
                  </ButtonSolidRedWhite>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
