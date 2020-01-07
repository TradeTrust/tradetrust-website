import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarRole from "./TokenSideBarRole";
import TokenSideBarField from "./TokenSideBarField";

// isHolder: true/false - determines to show holder or beneficiary sidebar view.

const TokenSideBar = (props: {
  isSideBarExpand: boolean;
  registryAddress?: React.ReactNode;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}) => {
  const isHolder = true;
  const isHolderChangeBeneficiary = false;

  const TokenSideBarContent = (props: { isHolder: boolean; registryAddress?: React.ReactNode, isHolderChangeBeneficiary?: Boolean }) => {
    const isHolder = props.isHolder;

    if (isHolder) {
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

  return (
    <aside className={`${styles["tokensidebar"]} ${props.isSideBarExpand ? styles["is-expanded"] : ""}`}>
      <div className={`${styles["tokensidebar-content"]}`}>
        <header>
          <div className="row">
            <div className="col-12">
              <div className={`${styles["heading"]}`}>
                <TokenSideBarRole isHolder={isHolder} />
                <h2>Manage Asset</h2>
              </div>
              <div className={`${styles["divider"]}`} />
            </div>
          </div>
        </header>
        <TokenSideBarContent isHolder={isHolder} registryAddress={props.registryAddress} isHolderChangeBeneficiary={isHolderChangeBeneficiary} />
      </div>
      <div className={`${styles["hamburger"]}`} onClick={props.handler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
    </aside>
  );
};

export default TokenSideBar;
