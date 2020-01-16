import React from "react";
import css from "./TokenSideBar.scss";

interface TokenSideBarFieldProps {
  id: string;
  title: string;
  ctaText: string;
  ctaStatus?: string;
  children?: React.ReactNode;
  handleClick: (e: any) => void;
}

const TokenSideBarField = ({ id, title, ctaText, ctaStatus, children, handleClick }: TokenSideBarFieldProps) => {
  return (
    <section id={id} className={`${css.sec}`}>
      <div className="row">
        <div className="col-12">
          <h4>{title}</h4>
          <div className={`${css.field}`}>{children}</div>
          <button
            className={`${css.button} ${
              ctaStatus === "success" ? css["button-success"] : ctaStatus === "danger" ? css["button-danger"] : ""
            }`}
            onClick={handleClick}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenSideBarField;
