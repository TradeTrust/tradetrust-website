import React from "react";
import getUserRoles, { userRoleText } from "../../utils/UserRolesUtil";
import { useTitleEscrowUsers } from "../../common/hooks/useTitleEscrowUsers";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useUserWallet } from "../../common/hooks/useUserWallet";
const TokenSideBarRole = ({ titleEscrowInstance }: { titleEscrowInstance: TitleEscrow }) => {
  const { userWalletAddress } = useUserWallet();
  const { holder, beneficiary } = useTitleEscrowUsers({ titleEscrow: titleEscrowInstance });
  const userRole = getUserRoles({
    userWalletAddress,
    holderAddress: holder || "",
    beneficiaryAddress: beneficiary || "",
  });
  return <h4>{userRoleText(userRole)}</h4>;
};

export default TokenSideBarRole;
