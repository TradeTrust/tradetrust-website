import React from "react";
import css from "./viewerStyles.module.scss";

export const VerifyingView = () => (
  <div className={`${css["viewer-container"]} bg-light text-blue`}>
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-3" style={{ fontSize: "1.5rem" }}>
      Verifying Document...
    </div>
  </div>
);
