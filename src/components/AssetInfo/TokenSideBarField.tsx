import React from "react";
import css from "./TokenSideBar.scss";

interface TokenSideBarFieldProps {
  title: string;
  ctaText: string;
  ctaStatus?: string;
  children?: React.ReactNode;
}

const TokenSideBarField = ({ title, ctaText, ctaStatus, children }: TokenSideBarFieldProps) => {
  return (
    <section className={`${css.sec}`}>
      <div className="row">
        <div className="col-12">
          <h4>{title}</h4>
          <div className={`${css.field}`}>{children}</div>
          <button
            className={`${css.button} ${
              ctaStatus === "success" ? css["button-success"] : ctaStatus === "danger" ? css["button-danger"] : ""
            }`}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenSideBarField;
