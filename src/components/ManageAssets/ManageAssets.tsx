import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ManageAssetsDropdownPrimaryWhite } from "./ManageAssetsDropdown";
import { AssetInfo } from "../AssetInfo";
import { FeatureFlag } from "../FeatureFlag";
import { loadAdminAddress } from "../../reducers/admin";
import { getTokenRegistryAddress } from "../../common/utils/document";
import { updateNetworkId } from "../../reducers/application";
import { initializeToken } from "../../reducers/token";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";

interface ManageAssetsProps {
  document: WrappedDocument;
  titleEscrow: TitleEscrow;
  approvedEscrowInstance?: TitleEscrow;
}

export const ManageAssets = ({ document, approvedEscrowInstance, titleEscrow }: ManageAssetsProps) => {
  const dispatch = useDispatch();
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const { holder, beneficiary } = useTitleEscrowUsers({ titleEscrow });
  const { holder: approvedHolderAddress, beneficiary: approvedBeneficiaryAddress } = useTitleEscrowUsers({
    titleEscrow: approvedEscrowInstance,
  });

  const { userWalletAddress, metamaskAccountError } = useSelector((state: any) => ({
    userWalletAddress: state.admin.adminAddress,
    metamaskAccountError: state.admin.metamaskAccountError,
  }));

  useEffect(() => {
    if (tokenRegistryAddress) dispatch(loadAdminAddress());
  }, [dispatch, document, tokenRegistryAddress]);

  useEffect(() => {
    if (userWalletAddress) {
      window.ethereum.on("networkChanged", () => {
        dispatch(updateNetworkId());
        dispatch(initializeToken());
      });
      window.ethereum.on("accountsChanged", () => dispatch(loadAdminAddress()));
      dispatch(initializeToken());
    }
  }, [dispatch, userWalletAddress]);

  const legacyView = () => {
    return (
      <div className="col-12 col-md-auto">
        <AssetInfo document={document} />
      </div>
    );
  };

  return (
    <div className="py-4">
      <div className="container-custom">
        <div className="row no-gutters align-items-center">
          <FeatureFlag name="TITLE_TRANSFER" fallback={legacyView()}>
            <div className="col-12 col-md-auto ml-md-auto">
              <ManageAssetsDropdownPrimaryWhite
                userWalletAddress={userWalletAddress}
                approvedBeneficiaryAddress={approvedBeneficiaryAddress || ""}
                approvedHolderAddress={approvedHolderAddress || ""}
                beneficiaryAddress={beneficiary || ""}
                holderAddress={holder || ""}
                metamaskAccountError={metamaskAccountError}
              />
            </div>
          </FeatureFlag>
        </div>
      </div>
    </div>
  );
};
