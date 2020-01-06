import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

const TokenSideBarBeneficiary = () => {
  return (
    <>
      <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
    </>
  );
};

export default TokenSideBarBeneficiary;
