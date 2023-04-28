import { useEffect, useState } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TradeTrustToken } from "@govtechsg/token-registry/dist/contracts";
import { BytesLike } from "ethers";

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
    setHasRoleState(hasRole?.[0]);
  }, [hasRole]);

  return { hasRole: hasRoleState };
};
