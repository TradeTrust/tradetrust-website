import React from "react";
import { ButtonSolidOrange } from "../../../../UI/Button";
import { AssetInformationPanel } from "../../../AssetInformationPanel";
import { AssetManagementActions } from "../../../AssetManagementContainer";
import { ManageAssetsDropdown } from "../../AssetManagementDropdown";
import { EditableAssetTitle } from "./../EditableAssetTitle";

interface ActionSelectionFormProps {
  isConnectedToWallet: boolean;
  onSetFormAction: (nextFormAction: AssetManagementActions) => void;
  tokenId: string;
  tokenRegistryAddress: string;
  beneficiary: string;
  holder: string;
  account?: string;
  canSurrender: boolean;
  onConnectToWallet: () => void;
}

export const ActionSelectionForm = ({
  isConnectedToWallet,
  onSetFormAction,
  tokenId,
  tokenRegistryAddress,
  beneficiary,
  holder,
  account,
  canSurrender,
  onConnectToWallet,
}: ActionSelectionFormProps) => {
  return (
    <div className="row py-3">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-12 col-lg">
            <AssetInformationPanel tokenId={tokenId} tokenRegistryAddress={tokenRegistryAddress} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Beneficiary" value={beneficiary} isEditable={false} onSetNewValue={() => {}} />
          </div>
          <div className="col-12 col-lg">
            <EditableAssetTitle role="Holder" value={holder} isEditable={false} onSetNewValue={() => {}} />
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
                <ManageAssetsDropdown onSetFormAction={onSetFormAction} canSurrender={canSurrender} />
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
