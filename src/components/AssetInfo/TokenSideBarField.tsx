import React from "react";
import styles from "./TokenSideBar.scss";

const TokenSideBarField = (props: {
  title: string;
  ctaText: string;
  ctaStatus?: string;
  children?: React.ReactNode;
  isChangeBeneficiary?: boolean;
}) => {
  return (
    <section className={`${styles["sec"]}`}>
      <div className="row">
        <div className="col-12">
          <h4>{props.title}</h4>
          <div className={`${styles["field"]}`}>{props.children}</div>
          <button
            className={`${styles["button"]} ${
              props.ctaStatus === "success"
                ? styles["button-success"]
                : props.ctaStatus === "danger"
                ? styles["button-danger"]
                : ""
            }`}
          >
            {props.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenSideBarField;
