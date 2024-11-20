import {
  Button,
  LoaderSpinner,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
} from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { encryptRemark } from "../../../../../common/utils/chain-utils";

interface SurrenderFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  keyId?: string;
  handleReturnToIssuer: (remark: string) => void;
  returnToIssuerState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const SurrenderForm: FunctionComponent<SurrenderFormProps> = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  keyId,
  handleReturnToIssuer,
  returnToIssuerState,
  setFormActionNone,
  setShowEndorsementChain,
}) => {
  const [remark, setRemark] = useState("");
  const isPendingConfirmation = returnToIssuerState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = returnToIssuerState === FormState.CONFIRMED;

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
      <div className="flex flex-wrap justify-between pb-4 -mx-4">
        <div className="w-full px-4 lg:w-1/3">
          <AssetInformationPanel
            setShowEndorsementChain={setShowEndorsementChain}
            tokenRegistryAddress={tokenRegistryAddress}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-4 -mx-4">
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Owner" value={beneficiary} isEditable={false} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Holder" value={holder} isEditable={false} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle
            role="Remark"
            value="Remark"
            newValue={remark}
            onSetNewValue={setRemark}
            isEditable={true}
            isRemark={true}
            isSubmitted={isPendingConfirmation}
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
                disabled={isPendingConfirmation}
                data-testid={"cancelSurrenderBtn"}
              >
                Cancel
              </Button>
            </div>
            <div className="w-auto ml-2">
              <Button
                className="bg-scarlet-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-scarlet-400"
                onClick={() => handleReturnToIssuer("0x" + ((remark && encryptRemark(remark, keyId)) ?? ""))}
                disabled={isPendingConfirmation}
                data-testid={"surrenderBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Return ETR</>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
