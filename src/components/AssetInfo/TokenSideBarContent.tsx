import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarField from "./TokenSideBarField";

const TokenSideBarContent = (props: {
  userRole: string;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
}) => {
  if (props.userRole === "Holder") {
    return (
      <>
        <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
        {props.approvedBeneficiaryAddress !== "" ? (
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
  } else if (props.userRole === "Beneficiary") {
    return (
      <>
        <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
      </>
    );
  } else if (props.userRole === "Holder and Beneficiary") {
    return (
      <>
        <TokenSideBarField title="Transfer Ownership" ctaText="Transfer">
          <label>
            <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
          </label>
        </TokenSideBarField>
        {props.approvedBeneficiaryAddress !== "" ? (
          <TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success">
            <label>
              <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
            </label>
          </TokenSideBarField>
        ) : null}
        <TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success">
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
  } else {
    return null;
  }
};

export default TokenSideBarContent;
