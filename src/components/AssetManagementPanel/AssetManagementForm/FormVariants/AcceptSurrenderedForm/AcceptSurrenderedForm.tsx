import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
  LoaderSpinner,
} from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { TagBorderedSm } from "../../../../UI/Tag";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "../EditableAssetTitle";
import { encryptRemark } from "../../../../../common/utils/chain-utils";

interface AcceptSurrenderedFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  keyId?: string;
  handleDestroyToken: (remark: string) => void;
  destroyTokenState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const AcceptSurrenderedForm: FunctionComponent<AcceptSurrenderedFormProps> = ({
  formAction,
  tokenRegistryAddress,
  keyId,
  handleDestroyToken,
  destroyTokenState,
  setFormActionNone,
  setShowEndorsementChain,
}) => {
  const { showOverlay } = useContext(OverlayContext);
  const [remark, setRemark] = useState("");
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
        <div className="flex flex-wrap pb-4">
          <div className="w-full lg:flex-grow lg:w-auto">
            <AssetInformationPanel
              setShowEndorsementChain={setShowEndorsementChain}
              tokenRegistryAddress={tokenRegistryAddress}
            />
          </div>
          <div className="w-full lg:w-auto self-end">
            <div className="py-4">
              <TagBorderedSm id="surrender-sign" className="bg-white rounded-xl text-scarlet-500 border-scarlet-500">
                <h5 className="font-bold">ETR returned to Issuer</h5>
              </TagBorderedSm>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mb-4 -mx-4">
          <div className="w-full px-4 lg:w-1/3 ml-auto">
            <EditableAssetTitle
              role="Remark"
              value="Remark"
              newValue={remark}
              onSetNewValue={setRemark}
              isEditable={true}
              isRemark={true}
              isSubmitted={isDestroyTokenPendingConfirmation}
            />
          </div>
        </div>
        <div className="flex flex-wrap pb-4">
          <div className="w-auto lg:ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <Button
                  className="bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-auto ml-2">
                <Button
                  className="bg-scarlet-500 text-white rounded-xl text-lg py-2 px-3 shadow-none hover:bg-scarlet-400"
                  onClick={() => handleDestroyToken("0x" + ((remark && encryptRemark(remark, keyId)) ?? ""))}
                  disabled={isDestroyTokenPendingConfirmation}
                  data-testid={"acceptSurrenderBtn"}
                >
                  {isDestroyTokenPendingConfirmation ? (
                    <LoaderSpinner data-testid={"accept-loader"} />
                  ) : (
                    <>Accept ETR Return</>
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
