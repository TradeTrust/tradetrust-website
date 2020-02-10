import React from "react";
import TokenSideBarTooltip from "./TokenSideBarTooltip";
import TokenSideBarButton from "./TokenSideBarButton";
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
    <section id={`sec-${id}`} className={`${css.sec}`}>
      <div className="row">
        <div className="col-12">
          <div className={`${css["field-title"]}`}>
            <h4>{title}</h4>
            <div className={`${css["field-tooltip"]}`}>
              <TokenSideBarTooltip id={id} />
            </div>
          </div>
          <div className={`${css.field}`}>{children}</div>
          <TokenSideBarButton label={label} status={status} handleClick={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default TokenSideBarField;
