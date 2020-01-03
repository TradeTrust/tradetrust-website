import React from "react";
import styles from "./tokenSidebar.scss";

const TokenSidebarBeneficiary = () => {
  return (
    <>
      <section className={`${styles["sec"]}`}>
        <div className="row">
          <div className="col-12">
            <h4>Allow Transfer</h4>
            <div className={`${styles["field"]}`}>
              <label>
                <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
              </label>
            </div>
            <button className={`${styles["button"]} ${styles["button-success"]}`}>Allow</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TokenSidebarBeneficiary;
