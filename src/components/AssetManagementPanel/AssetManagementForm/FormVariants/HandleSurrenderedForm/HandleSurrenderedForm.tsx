import React, { useContext, useEffect } from "react";
import { OverlayContext } from "../../../../../common/contexts/OverlayContext";
import { useEndorsementChain } from "../../../../../common/hooks/useEndorsementChain";
import { FormState } from "../../../../../constants/FormState";
import { TitleEscrowEvent } from "../../../../../types";
import { ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "../../../../UI/Overlay/OverlayContent/DocumentTransferMessage";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";

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

  const lastTransferEvent = endorsementChain
    ?.filter(({ eventType }) => eventType === "Transfer")
    .reverse()[0] as TitleEscrowEvent;
  const lastBeneficiary = lastTransferEvent?.beneficiary;
  const lastHolderEvent = lastTransferEvent?.holderChangeEvents.reverse()[0];
  const lastHolder = lastHolderEvent?.holder;

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
    <div className="flex flex-wrap py-4">
      <div className="w-full">
        <AssetManagementTitle
          setFormActionNone={setFormActionNone}
          formAction={formAction}
          disabled={isPendingConfirmation}
        />
        <div className="flex flex-wrap mb-4">
          <div className="w-full lg:flex-grow">
            <AssetInformationPanel
              setShowEndorsementChain={setShowEndorsementChain}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
          <div className="w-full lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedRedLarge id="surrender-sign">Surrendered To Issuer</TagBorderedRedLarge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-auto ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <ButtonSolidWhiteGrey
                  onClick={onClickRejectSurrender}
                  disabled={isPendingConfirmation || pending}
                  data-testid={"rejectSurrenderBtn"}
                >
                  {isRestoreTokenPendingConfirmation || pending ? (
                    <LoaderSpinner data-testid={"reject-loader"} />
                  ) : (
                    <>Reject Document</>
                  )}
                </ButtonSolidWhiteGrey>
              </div>
              <div className="w-auto ml-2">
                <ButtonSolidRedWhite
                  onClick={handleDestroyToken}
                  disabled={isPendingConfirmation || pending}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isDestroyTokenPendingConfirmation || pending ? (
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
