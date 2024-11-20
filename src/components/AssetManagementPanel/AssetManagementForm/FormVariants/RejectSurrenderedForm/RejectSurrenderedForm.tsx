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
import { encryptRemark } from "../../../../../common/utils/chain-utils";
import { EditableAssetTitle } from "../EditableAssetTitle";

interface RejectSurrenderedFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  keyId?: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  handleRestoreToken: (remark: string) => void;
  restoreTokenState: string;
}

export const RejectSurrenderedForm: FunctionComponent<RejectSurrenderedFormProps> = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  keyId,
  setFormActionNone,
  setShowEndorsementChain,
  handleRestoreToken,
  restoreTokenState,
}) => {
  const { showOverlay } = useContext(OverlayContext);
  const [remark, setRemark] = useState("");
  const isRestoreTokenPendingConfirmation = restoreTokenState === FormState.PENDING_CONFIRMATION;
  const isRestoreTokenConfirmed = restoreTokenState === FormState.CONFIRMED;

  const onClickRejectSurrender = () => {
    showOverlay(
      showDocumentTransferMessage(MessageTitle.CONFIRM_REJECT_SURRENDER_DOCUMENT, {
        isSuccess: true,
        beneficiaryAddress: beneficiary,
        holderAddress: holder,
        isConfirmationMessage: true,
        onConfirmationAction: () => handleRestoreToken("0x" + ((remark && encryptRemark(remark, keyId)) ?? "")),
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
              isSubmitted={isRestoreTokenPendingConfirmation}
            />
          </div>
        </div>
        <div className="flex flex-wrap pb-4">
          <div className="w-auto lg:ml-auto">
            <div className="flex flex-wrap">
              <div className="w-auto">
                <Button
                  className="bg-white rounded-xl text-lg py-2 px-3text-lg py-2 px-3 border-cloud-100 text-cloud-800 shadow-none hover:bg-cloud-200"
                  onClick={setFormActionNone}
                  disabled={isRestoreTokenPendingConfirmation}
                  data-testid={"cancelSurrenderBtn"}
                >
                  Cancel
                </Button>
              </div>
              <div className="w-auto ml-2">
                <Button
                  className="bg-scarlet-500 text-white rounded-xl text-lg py-2 px-3 shadow-none hover:bg-scarlet-400"
                  onClick={onClickRejectSurrender}
                  disabled={isRestoreTokenPendingConfirmation}
                  data-testid={"rejectSurrenderBtn"}
                >
                  {isRestoreTokenPendingConfirmation ? (
                    <LoaderSpinner data-testid={"reject-loader"} />
                  ) : (
                    <>Reject ETR Return</>
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
