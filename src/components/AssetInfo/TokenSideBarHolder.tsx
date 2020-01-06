import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

// isChangeBeneficiary: true/false - only show when a beneficiary allowed transfer, else blank.

const TokenSideBarHolder = (props: { registryAddress: React.ReactNode }) => {
  return (
    <>
      <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
      <TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success" isChangeBeneficiary={false}>
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
      <TokenSideBarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
        <div className={`${styles["field"]}`}>
          <p className={`${styles["register-address"]}`}>{props.registryAddress}</p>
        </div>
      </TokenSideBarField>
    </>
  );
};

export default TokenSideBarHolder;
