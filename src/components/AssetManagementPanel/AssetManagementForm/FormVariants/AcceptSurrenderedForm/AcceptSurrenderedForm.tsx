import { Button, MessageTitle, OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { useContext, useEffect } from "react";
import { FormState } from "../../../../../constants/FormState";
import { LoaderSpinner } from "../../../../UI/Loader";
import { TagBorderedRedLarge } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";

interface AcceptSurrenderedFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  handleDestroyToken: () => void;
  destroyTokenState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AcceptSurrenderedForm = ({
  formAction,
  tokenRegistryAddress,
  handleDestroyToken,
  destroyTokenState,
  setFormActionNone,
  setShowEndorsementChain,
}: AcceptSurrenderedFormProps) => {
  const { showOverlay } = useContext(OverlayContext);

  const isDestroyTokenPendingConfirmation = destroyTokenState === FormState.PENDING_CONFIRMATION;
  const isDestroyTokenConfirmed = destroyTokenState === FormState.CONFIRMED;

  useEffect(() => {
    if (isDestroyTokenConfirmed) {
      showOverlay(showDocumentTransferMessage(MessageTitle.ACCEPT_SURRENDER_DOCUMENT, { isSuccess: true }));
      setFormActionNone();
    }
  }, [showOverlay, setFormActionNone, isDestroyTokenConfirmed]);

  return (
    <div className="flex flex-wrap py-4">
      <div className="w-full">
        <AssetManagementTitle
          setFormActionNone={setFormActionNone}
          formAction={formAction}
          disabled={isDestroyTokenPendingConfirmation}
        />
        <div className="flex flex-wrap mb-4">
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
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-auto ml-2">
                <Button
                  className="bg-red text-white hover:bg-red-600"
                  onClick={handleDestroyToken}
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isDestroyTokenPendingConfirmation ? (
                    <LoaderSpinner data-testid={"accept-loader"} />
                  ) : (
                    <>Shred Document</>
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
