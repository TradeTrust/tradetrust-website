import React from "react";
import { ButtonSolidOrange } from "../../../UI/Button";
import { AssetManagementActions } from "../../AssetManagementContainer";
import { AssetInformationPanel } from "../../AssetInformationPanel";
import { AssetTitle } from "../../AssetTitle";
import { AssetManagementTitle } from "./../AssetManagementTitle";
import { ManageAssetsDropdown } from "../AssetManagementDropdown";

interface ActionSelectionFormProps {
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

export const ActionSelectionForm = ({
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
}: ActionSelectionFormProps) => {
  return (
    <div className="row py-3">
      <div className="col-12">
        {isConnectedToWallet && <AssetManagementTitle formAction={formAction} onSetFormAction={onSetFormAction} />}
        <div className="row mb-3">
          <div className="col-12 col-lg">
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
          {isConnectedToWallet ? (
            <div className="col-auto ml-auto">
              {account !== beneficiary && account !== holder ? (
                <ButtonSolidOrange
                  onClick={() => {
                    alert("Your wallet address has no manage assets privileges.");
                  }}
                >
                  No Access
                </ButtonSolidOrange>
              ) : (
                <ManageAssetsDropdown
                  // account={account}
                  beneficiary={beneficiary}
                  holder={holder}
                  onSetFormAction={onSetFormAction}
                  canSurrender={canSurrender}
                />
              )}
            </div>
          ) : (
            <div className="col-auto ml-auto">
              <ButtonSolidOrange data-testid={"connectToWallet"} onClick={onConnectToWallet}>
                Connect Wallet
              </ButtonSolidOrange>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
