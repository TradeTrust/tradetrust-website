import React from "react";
import styles from "./tokenSidebar.scss";

// isChangeBeneficiary: true/false - only show when a beneficiary allowed transfer, else blank.

const TokenSidebarHolder = props => {
  const TokenSidebarHolderChangeBeneficiary = props => {
    const isChangeBeneficiary = props.isChangeBeneficiary;
    if (isChangeBeneficiary) {
      return (
        <section className={`${styles["sec"]}`}>
          <div className="row">
            <div className="col-12">
              <h4>Change Beneficiary</h4>
              <div className={`${styles["field"]}`}>
                <label>
                  <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
                </label>
              </div>
              <button className={`${styles["button"]} ${styles["button-success"]}`}>Change</button>
            </div>
          </div>
        </section>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <section className={`${styles["sec"]}`}>
        <div className="row">
          <div className="col-12">
            <h4>Transfer Ownership</h4>
            <div className={`${styles["field"]}`}>
              <label>
                <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
              </label>
            </div>
            <button className={`${styles["button"]}`}>Transfer</button>
          </div>
        </div>
      </section>
      <TokenSidebarHolderChangeBeneficiary isChangeBeneficiary={false} />
      <section className={`${styles["sec"]}`}>
        <div className="row">
          <div className="col-12">
            <h4>Surrender Document</h4>
            <div className={`${styles["field"]}`}>
              <p className={`${styles["register-address"]}`}>{props.registryAddress}</p>
            </div>
            <button className={`${styles["button"]} ${styles["button-danger"]}`}>Surrender</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TokenSidebarHolder;
