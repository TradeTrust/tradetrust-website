import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
  LoaderSpinner,
} from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { isValidEndorseTransfer } from "../../../../../utils";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface EndorseTransferFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  holder?: string;
  handleEndorseTransfer: (approvedBeneficiary: string, approvedHolder: string) => void;
  transferOwnersState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorseTransferForm: FunctionComponent<EndorseTransferFormProps> = ({
  formAction,
  tokenRegistryAddress,
  holder,
  handleEndorseTransfer,
  transferOwnersState,
  setFormActionNone,
  setShowEndorsementChain,
}) => {
  const [newHolder, setNewHolder] = useState(holder || "");
  const [newOwner, setNewOwner] = useState(holder || ""); // Can only use this when owner is holder
  const isPendingConfirmation = transferOwnersState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = transferOwnersState === FormState.CONFIRMED;
  const isEditable =
    transferOwnersState !== FormState.PENDING_CONFIRMATION && transferOwnersState !== FormState.CONFIRMED;

  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.ENDORSE_TRANSFER_SUCCESS, {
          isSuccess: true,
          beneficiaryAddress: newOwner,
          holderAddress: newHolder,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newOwner, newHolder, showOverlay, setFormActionNone]);

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
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle
            role="Owner"
            value={holder}
            newValue={newOwner}
            isEditable={isEditable}
            onSetNewValue={setNewOwner}
            isError={transferOwnersState === FormState.ERROR}
          />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle
            role="Holder"
            value={holder}
            newValue={newHolder}
            isEditable={isEditable}
            onSetNewValue={setNewHolder}
            isError={transferOwnersState === FormState.ERROR}
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
              >
                Cancel
              </Button>
            </div>
            <div className="w-auto ml-2">
              <Button
                className="bg-cerulean-500 rounded-xl text-lg text-white py-2 px-3 shadow-none hover:bg-cerulean-800"
                disabled={!isValidEndorseTransfer(holder, newHolder, newOwner) || isPendingConfirmation}
                onClick={() => {
                  handleEndorseTransfer(newOwner || "", newHolder || "");
                }}
                data-testid={"endorseTransferBtn"}
              >
                {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Endorse Transfer</>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
