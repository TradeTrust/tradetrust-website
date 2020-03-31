import React from "react";
import getUserRoles, { userRoleText, TokenSideBarRoleProps } from "../../utils/UserRolesUtil";

const TokenSideBarRole = ({ userWalletAddress, beneficiaryAddress, holderAddress }: TokenSideBarRoleProps) => {
  const userRole = getUserRoles({ userWalletAddress, holderAddress, beneficiaryAddress });
  return <h4>{userRoleText(userRole)}</h4>;
};

export default TokenSideBarRole;
