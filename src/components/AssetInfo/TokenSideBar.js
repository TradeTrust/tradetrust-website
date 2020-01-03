import React from "react";
import styles from "./tokenSidebar.scss";
import TokenSideBarHolder from "./TokenSideBarHolder.js";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary.js";

const TokenSidebar = props => {
  const isHolder = true;

  const TokenSideBarRole = props => {
    const isHolder = props.isHolder;
    if (isHolder) {
      return <h4>Holder</h4>;
    } else {
      return <h4>Beneficiary</h4>;
    }
  };

  const TokenSideBarContent = props => {
    const isHolder = props.isHolder;
    if (isHolder) {
      return <TokenSideBarHolder registryAddress={props.registryAddress} />;
    } else {
      return <TokenSideBarBeneficiary />;
    }
  };

  return (
    <aside className={`${styles["tokensidebar"]} ${props.isSidebarExpand ? styles["is-expanded"] : ""}`}>
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
        <TokenSideBarContent isHolder={isHolder} registryAddress={props.registryAddress} />
      </div>
      {/*
      <div className={`${styles["hamburger"]}`}>
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
      */}
    </aside>
  );
};

export default TokenSidebar;
