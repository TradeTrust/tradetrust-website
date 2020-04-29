import React from "react";
import { ButtonSolidGreenWhite, ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../../UI/Button";
import { AssetManagementActions } from "../../AssetManagementContainer";
import { LoaderSpinner } from "../../../UI/Loader";
import { AssetInformationPanel } from "../../AssetInformationPanel";
import { AssetTitle } from "../../AssetTitle";
import { AssetManagementTitle } from "./../AssetManagementTitle";

interface SurrenderFormProps {
  isConnectedToWallet: boolean;
  formAction: AssetManagementActions;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary?: string;
  holder?: string;
  account?: string;
  canSurrender: boolean;
  surrenderingState: any;
  handleFormAction: () => void;
  onConnectToWallet: () => void;
  SkeletonPlaceholder: React.FC;
}

export const SurrenderForm = ({
  isConnectedToWallet,
  formAction,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  surrenderingState,
  handleFormAction,
  onConnectToWallet,
  SkeletonPlaceholder,
}: SurrenderFormProps) => {
  return (
    <div className="row py-3">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetManagementTitle onBack={() => {}} formAction={formAction} onSetFormAction={onSetFormAction} />
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            {beneficiary ? <AssetTitle role="Beneficiary" address={beneficiary} /> : <SkeletonPlaceholder />}
          </div>
          <div className="col-12 col-lg">
            {holder ? <AssetTitle role="Holder" address={holder} /> : <SkeletonPlaceholder />}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-auto ml-auto">
            {surrenderingState === "CONFIRMED" ? (
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
                    disabled={surrenderingState === "PENDING_CONFIRMATION"}
                  >
                    Cancel
                  </ButtonSolidWhiteGrey>
                </div>
                <div className="col-auto ml-2">
                  <ButtonSolidRedWhite
                    onClick={handleFormAction}
                    disabled={surrenderingState === "PENDING_CONFIRMATION"}
                  >
                    {surrenderingState === "PENDING_CONFIRMATION" ? (
                      <LoaderSpinner />
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
