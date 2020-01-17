import React from "react";
import TokenSideBarTooltip from "./TokenSideBarTooltip";
import css from "./TokenSideBar.scss";

interface TokenSideBarFieldProps {
  id: string;
  title: string;
  ctaText: string;
  ctaStatus?: string;
  approvedBeneficiaryAddress?: string;
  children?: React.ReactNode;
  handleClick: (e: any) => void;
}

const TokenSideBarField = ({
  id,
  title,
  ctaText,
  ctaStatus,
  approvedBeneficiaryAddress,
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
              <TokenSideBarTooltip id={id} approvedBeneficiaryAddress={approvedBeneficiaryAddress} />
            </div>
          </div>
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
