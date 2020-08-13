import React, { useContext, useEffect, useState } from "react";
import { isAddress } from "web3-utils";
import { FormState } from "../../../../../constants/FormState";
import { ButtonSolidOrangeWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { OverlayContext } from "./../../../../../common/contexts/OverlayContext";
import {
  MessageTitle,
  showDocumentTransferMessage,
} from "./../../../../../components/UI/Overlay/OverlayContent/DocumentTransferMessage";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface NominateBeneficiaryHolderFormProps {
  isLoading: boolean;
  formAction: AssetManagementActions;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  handleNomination: (newBeneficiary: string, newHolder: string) => void;
  nominationState: string;
  setFormActionNone: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const NominateBeneficiaryHolderForm = ({
  isLoading,
  formAction,
  tokenRegistryAddress,
  beneficiary,
  holder,
  handleNomination,
  nominationState,
  setFormActionNone,
  setShowEndorsementChain,
}: NominateBeneficiaryHolderFormProps) => {
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const isPendingConfirmation = nominationState === FormState.PENDING_CONFIRMATION;
  const isConfirmed = nominationState === FormState.CONFIRMED;
  const isEditable = nominationState !== FormState.PENDING_CONFIRMATION && nominationState !== FormState.CONFIRMED;
  const { showOverlay } = useContext(OverlayContext);

  useEffect(() => {
    if (isConfirmed) {
      showOverlay(
        showDocumentTransferMessage(MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS, {
          isSuccess: true,
        })
      );
      setFormActionNone();
    }
  }, [isConfirmed, newBeneficiary, showOverlay, setFormActionNone]);

  const isInvalidNomination =
    !newBeneficiary || !holder || newBeneficiary === beneficiary || !isAddress(newBeneficiary);

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
          <div className="col-12 col-lg">
            <EditableAssetTitle
              isLoading={isLoading}
              role="Owner"
              value={beneficiary}
              newValue={newBeneficiary}
              isEditable={isEditable}
              onSetNewValue={setNewBeneficiary}
              error={nominationState === FormState.ERROR}
            />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle isLoading={isLoading} role="Holder" value={holder} isEditable={false} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            <div className="row no-gutters">
              <div className="col-auto">
                <ButtonSolidWhiteGrey
                  onClick={setFormActionNone}
                  disabled={isPendingConfirmation}
                  data-testid={"cancelNominationBtn"}
                >
                  Cancel
                </ButtonSolidWhiteGrey>
              </div>
              <div className="col-auto ml-2">
                <ButtonSolidOrangeWhite
                  disabled={isInvalidNomination || isPendingConfirmation}
                  onClick={() => {
                    if (holder === undefined) return;
                    // holder is used instead of 'NewHolder' because we do not want to change the value on the UI when nominating beneficiary.
                    handleNomination(newBeneficiary, holder);
                  }}
                  data-testid={"nominationBtn"}
                >
                  {isPendingConfirmation ? <LoaderSpinner data-testid={"loader"} /> : <>Nominate</>}
                </ButtonSolidOrangeWhite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
