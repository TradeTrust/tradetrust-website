import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
  LoaderSpinner,
} from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { isEthereumAddress } from "../../../../../utils";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";
import { encryptRemark } from "../../../../../common/utils/chain-utils";

interface TransferHolderProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  keyId?: string;
  handleTransfer: (newHolder: string, remark: string) => void;
  holderTransferringState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const TransferHolderForm: FunctionComponent<TransferHolderProps> = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  keyId,
  handleTransfer,
  holderTransferringState,
  setFormActionNone,
  setShowEndorsementChain,
}) => {
  const [newHolder, setNewHolder] = useState("");
  const [remark, setRemark] = useState("");
  const isPendingConfirmation = holderTransferringState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = holderTransferringState === FormState.CONFIRMED;
  const isEditable =
    holderTransferringState !== FormState.PENDING_CONFIRMATION && holderTransferringState !== FormState.CONFIRMED;
  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.TRANSFER_HOLDER_SUCCESS, { isSuccess: true, holderAddress: newHolder })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newHolder, showOverlay, setFormActionNone]);

  const isValidTransfer = () => {
    if (!newHolder) return false;
    if (newHolder === holder) return false;
    if (!isEthereumAddress(newHolder)) return false;

    return true;
  };

  return (
    <>
      <AssetManagementTitle
        setFormActionNone={setFormActionNone}
        formAction={formAction}
        disabled={isPendingConfirmation}
      />
      <div className="flex flex-wrap justify-between mb-4 -mx-4">
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
          <EditableAssetTitle
            role="Holder"
            value={holder}
            newValue={newHolder}
            isEditable={isEditable}
            onSetNewValue={setNewHolder}
            isError={holderTransferringState === FormState.ERROR}
          />
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
                data-testid={"cancelTransferBtn"}
              >
                Cancel
              </Button>
            </div>
            <div className="w-auto ml-2">
              <Button
                className="bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800"
                disabled={!isValidTransfer() || isPendingConfirmation}
                onClick={() => handleTransfer(newHolder, "0x" + ((remark && encryptRemark(remark, keyId)) ?? ""))}
                data-testid={"transferBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Transfer</>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
