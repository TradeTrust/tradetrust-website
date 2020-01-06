import React from "react";
import styles from "./tokenSidebar.scss";
import TokenSidebarField from "./TokenSidebarField";

const TokenSidebarBeneficiary = () => {
  return (
    <>
      <TokenSidebarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSidebarField>
    </>
  );
};

export default TokenSidebarBeneficiary;
