import React from "react";
import css from "./TokenSideBar.scss";

export const TokenErrorMessage = ({ errorMessage }: { errorMessage: string }) => (
  <div className={`${css["message"]} ${css["message-error"]}`}>
    <p>{errorMessage}</p>
  </div>
);
