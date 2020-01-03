import React, { Component } from "react";
import styles from "./tokenSidebar.scss";

class TokenSidebar extends Component {
  render() {
    return (
      <aside className={`${styles["tokensidebar"]} ${this.props.isSidebarExpand ? styles["is-expanded"] : ""}`}>
        <div className={`${styles["tokensidebar-content"]}`}>
          <header>
            <div className="row">
              <div className="col-12">
                <h2>Manage Asset</h2>
                <div className={`${styles["divider"]}`} />
              </div>
            </div>
          </header>
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
          <section className={`${styles["sec"]}`}>
            <div className="row">
              <div className="col-12">
                <h4>Surrender Document</h4>
                <div className={`${styles["field"]}`}>
                  <label>
                    <input className={`${styles["field-input"]}`} type="text" placeholder="Address (e.g. 0x483..)" />
                  </label>
                </div>
                <button className={`${styles["button"]} ${styles["button-danger"]}`}>Surrender</button>
              </div>
            </div>
          </section>
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
  }
}

export default TokenSidebar;
