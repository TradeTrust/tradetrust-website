import React, { Component } from 'react';
import styles from "./tokenSidebar.scss";

class TokenSidebar extends Component {
  render() {
    return (
      <aside className={`${styles["tokensidebar"]}`}>
        <div className={`${styles["tokensidebar-content"]}`}>
          <section className={`${styles["sec"]} ${styles["sec-header"]}`}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2>Manage Asset</h2>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles["sec"]}`}>
            <div className="container">
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
            </div>
          </section>
        </div>
        <div className={`${styles["cancel"]}`}></div>
      </aside>
    );
  }
}

export default TokenSidebar;
