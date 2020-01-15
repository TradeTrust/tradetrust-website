import React, { ReactElement } from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

interface TokenBeneficiaryInterface {
  setBeneficiary: (e: any) => void;
  approvedBeneficiary: string;
  approveChangeBeneficiary: () => void;
}

const TokenSideBarBeneficiary = ({
  setBeneficiary,
  approvedBeneficiary,
  approveChangeBeneficiary
}: TokenBeneficiaryInterface): ReactElement => (
  <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success" handleClick={approveChangeBeneficiary}>
    <label>
      <input
        className={`${css["field-input"]}`}
        type="text"
        placeholder="Address (e.g. 0x483..)"
        name="approvedBeneficiary"
        value={approvedBeneficiary}
        onChange={setBeneficiary}
      />
    </label>
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
