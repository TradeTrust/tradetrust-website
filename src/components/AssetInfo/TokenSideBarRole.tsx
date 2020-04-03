import React, { useContext } from "react";
import getUserRoles, { userRoleText, TokenSideBarRoleProps } from "../../utils/UserRolesUtil";
import {useTitleEscrowUsers} from "../../common/hooks/useTitleEscrowUsers";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

const TokenSideBarRole = ({ titleEscrowInstance }: {titleEscrowInstance: TitleEscrow}) => {
  const {holder, beneficiary} = useTitleEscrowUsers({titleEscrow: titleEscrowInstance})
  const userRole = getUserRoles({ adminAddress, holderAddress: holder, beneficiaryAddress: beneficiary });
  return <h4>{userRoleText(userRole)}</h4>;
};

export default TokenSideBarRole;
