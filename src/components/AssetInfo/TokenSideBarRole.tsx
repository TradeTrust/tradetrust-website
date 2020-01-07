import React from "react";

const TokenSideBarRole = (props: { isHolder: any }) => {
  const isHolder = props.isHolder;
  if (isHolder) {
    return <h4>Holder</h4>;
  } else {
    return <h4>Beneficiary</h4>;
  }
};

export default TokenSideBarRole;
