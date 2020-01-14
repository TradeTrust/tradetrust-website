import React from "react";
import css from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

const TokenSideBarBeneficiary = () => (
  <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
    <label>
      <input className={`${css["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
    </label>
  </TokenSideBarField>
);

export default TokenSideBarBeneficiary;
