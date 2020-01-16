import React from "react";

const TokenSideBarRole = (props: { isHolder: any }) => {
  const roleStr = props.isHolder ? "Holder" : "Beneficiary";
  return <h4>{roleStr}</h4>;
};

export default TokenSideBarRole;
