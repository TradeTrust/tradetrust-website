import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";

interface TokenSideBarContentProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
}

const TokenSideBarContent = ({
  adminAddress,
  beneficiaryAddress,
  holderAddress,
  approvedBeneficiaryAddress,
  registryAddress
}: TokenSideBarContentProps) => {
  const isEqualBeneficiaryAndHolder = adminAddress === holderAddress && adminAddress === beneficiaryAddress;
  const showHolder = adminAddress === holderAddress || isEqualBeneficiaryAndHolder;
  const showBeneficiary = adminAddress === beneficiaryAddress && !isEqualBeneficiaryAndHolder;
  const showLoader = holderAddress === "" && beneficiaryAddress === "";
  const showNoAccess = showLoader === false && (adminAddress !== holderAddress && adminAddress !== beneficiaryAddress);

  return (
    <>
      {showLoader && <div className={css.loader} />}
      {showNoAccess && <TokenSideBarNoMatch />}
      {showHolder && (
        <TokenSideBarHolder
          isEqualBeneficiaryAndHolder={isEqualBeneficiaryAndHolder}
          approvedBeneficiaryAddress={approvedBeneficiaryAddress}
          registryAddress={registryAddress}
        />
      )}
      {showBeneficiary && <TokenSideBarBeneficiary />}
    </>
  );
};

export default TokenSideBarContent;
