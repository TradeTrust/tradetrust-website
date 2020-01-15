import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

const TokenSideBarBeneficiary = () => (
  <TokenSideBarField
    id="sec-approvechangebeneficiary"
    title="Approve Change Beneficiary"
    ctaText="Approve"
    ctaStatus="success"
  >
    <label>
      <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
    </label>
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
