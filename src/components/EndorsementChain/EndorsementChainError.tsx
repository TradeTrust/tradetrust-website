import React from "react";

export const EndorsementChainError = ({ error }: { error: string }) => {
  return (
    <div className="container-custom">
      <div>{error}</div>
    </div>
  );
};
