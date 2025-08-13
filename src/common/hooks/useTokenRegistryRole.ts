import { BytesLike } from "ethers";
import { useEffect, useState } from "react";
import { useContractFunctionHook } from "./useContractFunctionHook";
import { TradeTrustToken } from "../../types";
export const useTokenRegistryRole = ({
  account,
  role,
  tokenRegistry,
}: {
  tokenRegistry?: TradeTrustToken;
  account?: string;
  role: BytesLike;
}): {
  hasRole?: boolean;
} => {
  const [hasRoleState, setHasRoleState] = useState<boolean>();
  const { call: checkRole, value: hasRole, reset: resetCheckRole } = useContractFunctionHook(tokenRegistry, "hasRole");

  useEffect(() => {
    if (account) {
      checkRole(role, account);
      resetCheckRole();
    }
  }, [role, account, checkRole, tokenRegistry, resetCheckRole]);

  useEffect(() => {
    setHasRoleState(Array.isArray(hasRole) ? hasRole[0] : hasRole);
  }, [hasRole]);

  return { hasRole: hasRoleState };
};
