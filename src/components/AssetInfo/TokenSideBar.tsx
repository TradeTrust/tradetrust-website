import React from "react";
import styles from "./TokenSideBar.scss";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarRole from "./TokenSideBarRole";

// metamaskAddress - hardcoded local user address to be tally with return address response.

const TokenSideBar = (props: {
  holderAddress: string;
  beneficiaryAddress: string;
  approvedBeneficiaryAddress: string;
  registryAddress?: string;
  handler: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
  isSideBarExpand: boolean;
}) => {
  const metamaskAddress = "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C";
  let userRole = "";

  if (metamaskAddress === props.holderAddress && metamaskAddress === props.beneficiaryAddress) {
    userRole = "Holder and Beneficiary";
  } else if (metamaskAddress === props.holderAddress) {
    userRole = "Holder";
  } else if (metamaskAddress === props.beneficiaryAddress) {
    userRole = "Beneficiary";
  }

  return (
    <aside className={`${styles["tokensidebar"]} ${props.isSideBarExpand ? styles["is-expanded"] : ""}`}>
      <div className={`${styles["tokensidebar-content"]}`}>
        <header>
          <div className="row">
            <div className="col-12">
              <div className={`${styles["heading"]}`}>
                <TokenSideBarRole userRole={userRole} />
                <h2>Manage Asset</h2>
              </div>
              <div className={`${styles["divider"]}`} />
            </div>
          </div>
        </header>
        <TokenSideBarContent
          userRole={userRole}
          registryAddress={props.registryAddress}
          approvedBeneficiaryAddress={props.approvedBeneficiaryAddress}
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
