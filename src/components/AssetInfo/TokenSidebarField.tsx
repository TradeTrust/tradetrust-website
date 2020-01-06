import React from "react";
import styles from "./TokenSideBar.scss";

const TokenSideBarField = (props: {
  title: string;
  ctaText: string;
  ctaStatus?: string;
  children?: React.ReactNode;
  isChangeBeneficiary?: boolean;
}) => {
  let buttonCss = `${styles["button"]}`;
  if (props.ctaStatus === "success") {
    buttonCss = `${styles["button"]} ${styles["button-success"]}`;
  } else if (props.ctaStatus === "danger") {
    buttonCss = `${styles["button"]} ${styles["button-danger"]}`;
  } else {
  }

  if (props.isChangeBeneficiary) {
    return null;
  } else {
    return (
      <>
        <section className={`${styles["sec"]}`}>
          <div className="row">
            <div className="col-12">
              <h4>{props.title}</h4>
              <div className={`${styles["field"]}`}>{props.children}</div>
              <button className={buttonCss}>{props.ctaText}</button>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default TokenSideBarField;
