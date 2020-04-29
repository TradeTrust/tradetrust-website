import React from "react";
import { ButtonSolidGreenWhite, ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../../UI/Button";
import { AssetManagementActions } from "../../../AssetManagementContainer";
import { LoaderSpinner } from "../../../../UI/Loader";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetTitle } from "../../../AssetTitle";
import { AssetManagementTitle } from "../../AssetManagementTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface SurrenderFormProps {
  formAction: AssetManagementActions;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  surrenderingState: string;
  handleFormAction: () => void;
}

export const SurrenderForm = ({
  formAction,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  surrenderingState,
  handleFormAction,
}: SurrenderFormProps) => {
  const isPendingConfirmation = surrenderingState === "PENDING_CONFIRMATION";
  const isConfirmed = surrenderingState === "CONFIRMED";

  const onBackHandler = () => {
    if (isPendingConfirmation) {
      return false;
    } else {
      onSetFormAction(AssetManagementActions.None);
    }
  };

  return (
    <div className="row py-3">
      <div className="col-12">
        <AssetManagementTitle onBack={onBackHandler} formAction={formAction} />
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            {beneficiary ? (
              <AssetTitle role="Beneficiary" address={beneficiary}>
                <EditableAssetTitle
                  role="Beneficiary"
                  value={beneficiary}
                  isEditable={false}
                  newValue=""
                  onSetNewValue={() => {}}
                />
              </AssetTitle>
            ) : (
              <SkeletonPlaceholder />
            )}
          </div>
          <div className="col-12 col-lg">
            {holder ? (
              <AssetTitle role="Holder" address={holder}>
                <EditableAssetTitle
                  role="Holder"
                  value={holder}
                  isEditable={false}
                  newValue=""
                  onSetNewValue={() => {}}
                />
              </AssetTitle>
            ) : (
              <SkeletonPlaceholder />
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {isConfirmed ? (
              <div className="row">
                <div className="col-auto">
                  <ButtonSolidGreenWhite
                    onClick={() => {
                      onSetFormAction(AssetManagementActions.None);
                    }}
                  >
                    Success
                  </ButtonSolidGreenWhite>
                </div>
              </div>
            ) : (
              <div className="row no-gutters">
                <div className="col-auto">
                  <ButtonSolidWhiteGrey
                    onClick={() => onSetFormAction(AssetManagementActions.None)}
                    disabled={isPendingConfirmation}
                    data-testid={"cancelSurrenderBtn"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidRedWhite
                    onClick={handleFormAction}
                    disabled={isPendingConfirmation}
                    data-testid={"surrenderBtn"}
                  >
                    {isPendingConfirmation ? (
                      <LoaderSpinner data-testid={"loader"}/>
                    ) : (
                      <>
                        {formAction === AssetManagementActions.Surrender && <>Surrender Document</>}
                        {formAction === AssetManagementActions.TransferHolder && <>Transfer Holdership</>}
                        {formAction === AssetManagementActions.EndorseBeneficiary && <>Endorse Change of Beneficiary</>}
                      </>
                    )}
                  </ButtonSolidRedWhite>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
