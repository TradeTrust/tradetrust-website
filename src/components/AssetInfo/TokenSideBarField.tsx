import React from "react";
import css from "./TokenSideBar.scss";

interface TokenSideBarFieldProps {
  id: string;
  title: string;
  label: string;
  status?: string;
  children?: React.ReactNode;
  handleClick: (e: any) => void;
}

const TokenSideBarField = ({ id, title, label, status, children, handleClick }: TokenSideBarFieldProps) => {
  return (
    <section id={id} className={`${css.sec}`}>
      <div className="row">
        <div className="col-12">
          <h4>{title}</h4>
          <div className={`${css.field}`}>{children}</div>
          <button
            className={`${css.button} ${
              status === "success" ? css["button-success"] : status === "danger" ? css["button-danger"] : ""
            }`}
            onClick={handleClick}
          >
            {label}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenSideBarField;
