import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";

// isHolder: true/false - determines to show holder or beneficiary sidebar view.

const TokenSideBar = (props: {
  isSideBarExpand: boolean;
  registryAddress?: string;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}) => {
  const isHolder = true;
  const isHolderChangeBeneficiary = false;

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
        <TokenSideBarContent
          isHolder={isHolder}
          registryAddress={props.registryAddress}
          isHolderChangeBeneficiary={isHolderChangeBeneficiary}
        />
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
