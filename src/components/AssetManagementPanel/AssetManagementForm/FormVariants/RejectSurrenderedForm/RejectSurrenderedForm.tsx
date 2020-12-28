import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
  LoaderSpinner,
} from "@govtechsg/tradetrust-ui-components";
import React, { useContext, useEffect } from "react";
import { useEndorsementChain } from "../../../../../common/hooks/useEndorsementChain";
import { FormState } from "../../../../../constants/FormState";
import { TitleEscrowEvent } from "../../../../../types";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";

interface RejectSurrenderedFormProps {
  tokenId: string;
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  handleRestoreToken: (lastBeneficiary?: string, lastHolder?: string) => void;
  restoreTokenState: string;
}

export const RejectSurrenderedForm = ({
  tokenId,
  formAction,
  tokenRegistryAddress,
  setFormActionNone,
  setShowEndorsementChain,
  handleRestoreToken,
  restoreTokenState,
}: RejectSurrenderedFormProps) => {
  const { showOverlay } = useContext(OverlayContext);
  const { endorsementChain, pending } = useEndorsementChain(tokenRegistryAddress, tokenId);

  const lastTransferEvent = endorsementChain
    ?.filter(({ eventType }) => eventType === "Transfer")
    .reverse()[0] as TitleEscrowEvent;
  const lastBeneficiary = lastTransferEvent?.beneficiary;
  const lastHolderEvent = lastTransferEvent?.holderChangeEvents.reverse()[0];
  const lastHolder = lastHolderEvent?.holder;

  const isRestoreTokenPendingConfirmation = restoreTokenState === FormState.PENDING_CONFIRMATION;
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
          disabled={isRestoreTokenPendingConfirmation}
        />
        <div className="flex flex-wrap pb-4">
          <div className="w-full lg:flex-grow lg:w-auto">
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
        <div className="flex flex-wrap pb-4">
          <div className="w-auto ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <Button
                  className="bg-white text-grey hover:bg-grey-100"
                  onClick={setFormActionNone}
                  disabled={isRestoreTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-auto ml-2">
                <Button
                  className="bg-red text-white hover:bg-red-600"
                  onClick={onClickRejectSurrender}
                  disabled={isRestoreTokenPendingConfirmation || pending}
                  data-testid={"rejectSurrenderBtn"}
                >
                  {isRestoreTokenPendingConfirmation || pending ? (
                    <LoaderSpinner data-testid={"reject-loader"} />
                  ) : (
                    <>Reject Document</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
