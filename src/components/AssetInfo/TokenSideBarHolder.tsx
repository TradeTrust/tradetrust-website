import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

interface TokenSideBarHolderProps {
  isEqualBeneficiaryAndHolder: boolean;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
}

const TokenSideBarHolder = ({
  isEqualBeneficiaryAndHolder,
  approvedBeneficiaryAddress,
  registryAddress
}: TokenSideBarHolderProps) => {
  const showChangeBeneficiary = !!approvedBeneficiaryAddress || isEqualBeneficiaryAndHolder;

  return (
    <>
      <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
        <label>
          <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success">
          <label>
            <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
          <div className={`${css.field}`}>
            <p className={`${css["register-address"]}`}>{registryAddress}</p>
          </div>
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
