import React from "react";
import TokenSideBarTooltip from "./TokenSideBarTooltip";
import css from "./TokenSideBar.scss";

interface TokenSideBarFieldProps {
  id: string;
  title: string;
  label: string;
  status?: string;
  isEndorseChangeOfBeneAwaiting?: boolean;
  children?: React.ReactNode;
  handleClick: (e: any) => void;
}

const TokenSideBarField = ({
  id,
  title,
  label,
  status,
  isEndorseChangeOfBeneAwaiting,
  children,
  handleClick
}: TokenSideBarFieldProps) => {
  return (
    <section id={`sec-${id}`} className={`${css.sec}`}>
      <div className="row">
        <div className="col-12">
          <div className={`${css["field-title"]}`}>
            <h4>{title}</h4>
            <div className={`${css["field-tooltip"]}`}>
              <TokenSideBarTooltip id={id} isEndorseChangeOfBeneAwaiting={isEndorseChangeOfBeneAwaiting} />
            </div>
          </div>
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
