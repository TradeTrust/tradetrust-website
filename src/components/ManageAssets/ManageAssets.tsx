import React from "react";
import { useSelector } from "react-redux";
import { ManageAssetsDropdownPrimaryWhite } from "./ManageAssetsDropdown";
import { AssetInfo } from "../AssetInfo";
import { FeatureFlag } from "../FeatureFlag";

interface ManageAssetsProps {
  document: any;
}

export const ManageAssets = ({ document }: ManageAssetsProps) => {
  const {
    userWalletAddress,
    approvedBeneficiaryAddress,
    approvedHolderAddress,
    beneficiaryAddress,
    holderAddress,
    metamaskAccountError,
  } = useSelector((state: any) => ({
    userWalletAddress: state.admin.adminAddress,
    approvedBeneficiaryAddress: state.token.approvedBeneficiaryAddress,
    approvedHolderAddress: state.token.approvedHolderAddress,
    beneficiaryAddress: state.token.beneficiaryAddress,
    holderAddress: state.token.holderAddress,
    metamaskAccountError: state.admin.metamaskAccountError,
  }));

  return (
    <div className="py-4">
      <div className="container-custom">
        <div className="row no-gutters align-items-center">
          <div className="col-12 col-md-auto">
            <AssetInfo document={document} />
          </div>
          <FeatureFlag name="TITLE_TRANSFER">
            <div className="col-12 col-md-auto ml-md-auto">
              <ManageAssetsDropdownPrimaryWhite
                userWalletAddress={userWalletAddress}
                approvedBeneficiaryAddress={approvedBeneficiaryAddress}
                approvedHolderAddress={approvedHolderAddress}
                beneficiaryAddress={beneficiaryAddress}
                holderAddress={holderAddress}
                metamaskAccountError={metamaskAccountError}
              />
            </div>
          </FeatureFlag>
        </div>
      </div>
    </div>
  );
};
