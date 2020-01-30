import React from "react";
import getUserRoles, { userRoleText, TokenSideBarRoleProps } from "../../utils/UserRolesUtil";

const TokenSideBarRole = ({ adminAddress, beneficiaryAddress, holderAddress }: TokenSideBarRoleProps) => {
  const userRole = getUserRoles({ adminAddress, holderAddress, beneficiaryAddress });
  return <h4>{userRoleText(userRole)}</h4>;
};

export default TokenSideBarRole;
