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
      <TokenSideBarField id="sec-transferownership" title="Transfer Holdership" ctaText="Transfer">
        <label>
          <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
      {showChangeBeneficiary && (
        <TokenSideBarField id="sec-changebeneficiary" title="Change Beneficiary" ctaText="Submit" ctaStatus="success">
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              placeholder="Address (e.g. 0x483..)"
              disabled={!!approvedBeneficiaryAddress}
              defaultValue={approvedBeneficiaryAddress}
            />
          </label>
        </TokenSideBarField>
      )}
      {isEqualBeneficiaryAndHolder && (
        <TokenSideBarField id="sec-surrenderdocument" title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
          <label>
            <input
              className={`${css["field-input"]}`}
              type="text"
              placeholder="Address (e.g. 0x483..)"
              disabled
              value={registryAddress}
            />
          </label>
        </TokenSideBarField>
      )}
    </>
  );
};

export default TokenSideBarHolder;
