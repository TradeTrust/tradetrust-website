import { useEffect } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";

export const useTitleEscrowUsers = ({ titleEscrow }: { titleEscrow: TitleEscrow }) => {
  const { call: getBeneficiary, value: beneficiary } = useContractFunctionHook(titleEscrow, "beneficiary");
  const { call: getHolder, value: holder } = useContractFunctionHook(titleEscrow, "holder");

  useEffect(() => {
    getBeneficiary();
    getHolder();
  }, [titleEscrow, getBeneficiary, getHolder]);

  return { beneficiary, holder };
};
