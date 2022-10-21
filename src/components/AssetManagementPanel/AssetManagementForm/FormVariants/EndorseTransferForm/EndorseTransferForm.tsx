import {
  Button,
  MessageTitle,
  OverlayContext,
  showDocumentTransferMessage,
  LoaderSpinner,
} from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { FormState } from "../../../../../constants/FormState";
import { isEthereumAddress } from "../../../../../utils";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface EndorseTransferFormProps {
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary: string;
  holder: string;
  handleEndorseTransfer: (newBeneficiary: string, newHolder: string) => void;
  transferOwnersState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorseTransferForm: FunctionComponent<EndorseTransferFormProps> = ({
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleEndorseTransfer,
  transferOwnersState,
  setFormActionNone,
  setShowEndorsementChain,
}) => {
  const isPendingConfirmation = transferOwnersState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = transferOwnersState === FormState.CONFIRMED;
  let newBeneficiary = beneficiary;
  let newHolder = holder;

  const { showOverlay } = useContext(OverlayContext);

  const isValidTransfer = () => {
    if (!newHolder) return false;
    if (newHolder === holder) return false;
    if (!isEthereumAddress(newHolder)) return false;

    return true;
  };

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.ENDORSE_TRANSFER_SUCCESS, {
          isSuccess: true,
          beneficiaryAddress: newBeneficiary,
          holderAddress: newHolder,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newHolder, newBeneficiary, showOverlay, setFormActionNone]);

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
          <EditableAssetTitle role="Owner" value={newBeneficiary} isEditable={false} />
        </div>
        <div className="w-full px-4 lg:w-1/3">
          <EditableAssetTitle role="Holder" value={newHolder} isEditable={false} />
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
                onClick={() => handleEndorseTransfer(newBeneficiary, newHolder)}
                disabled={isPendingConfirmation}
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