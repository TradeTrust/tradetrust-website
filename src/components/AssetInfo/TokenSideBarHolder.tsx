import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

// isAdditionalFields: true/false - only show when a beneficiary allowed transfer, else blank.

const TokenSideBarHolder = (props: { registryAddress: React.ReactNode }) => {
  const isAdditionalFields = false;

  const AdditionalFields = () => {
    if (isAdditionalFields) {
      return (
        <TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
        <label>
          <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
        </label>
      </TokenSideBarField>
      <AdditionalFields />
      <TokenSideBarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
        <div className={`${styles["field"]}`}>
          <p className={`${styles["register-address"]}`}>{props.registryAddress}</p>
        </div>
      </TokenSideBarField>
    </>
  );
};

export default TokenSideBarHolder;
