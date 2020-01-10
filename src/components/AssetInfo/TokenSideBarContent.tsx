import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

const TokenSideBarContent = (props: {
  isHolder: boolean;
  registryAddress?: string;
  isHolderChangeBeneficiary?: boolean;
}) => {
  if (props.isHolder) {
    return (
      <>
        <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
        {props.isHolderChangeBeneficiary ? (
          <TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success">
            <label>
              <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
            </label>
          </TokenSideBarField>
        ) : null}
        <TokenSideBarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger">
          <div className={`${styles["field"]}`}>
            <p className={`${styles["register-address"]}`}>{props.registryAddress}</p>
          </div>
        </TokenSideBarField>
      </>
    );
  } else {
    return (
      <>
        <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
      </>
    );
  }
};

export default TokenSideBarContent;
