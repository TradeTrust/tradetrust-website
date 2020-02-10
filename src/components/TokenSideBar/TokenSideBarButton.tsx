import React from "react";
import css from "./TokenSideBar.scss";

interface TokenSideBarButtonProps {
  label: string;
  status?: string;
  handleClick: (e: any) => void;
}

const TokenSideBarButton = ({ label, status, handleClick }: TokenSideBarButtonProps) => {
  return (
    <button
      className={`${css.button} ${
        status === "success" ? css["button-success"] : status === "danger" ? css["button-danger"] : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TokenSideBarButton;
