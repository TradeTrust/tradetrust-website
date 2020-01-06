import React from "react";
import styles from "./tokenSidebar.scss";
import TokenSidebarField from "./TokenSidebarField";

// isChangeBeneficiary: true/false - only show when a beneficiary allowed transfer, else blank.

const TokenSidebarHolder = (props: { registryAddress: React.ReactNode }) => {
  return (
    <>
      <TokenSidebarField title="Transfer Ownership" ctaText="Transfer">
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSidebarField>
      <TokenSidebarField title="Change Beneficiary" ctaText="Change" isChangeBeneficiary={true}>
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSidebarField>
      <TokenSidebarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
        <div className={`${styles["field"]}`}>
          <p className={`${styles["register-address"]}`}>{props.registryAddress}</p>
        </div>
      </TokenSidebarField>
    </>
  );
};

export default TokenSidebarHolder;
