import React from "react";

interface TokenSideBarRoleProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
}

const TokenSideBarRole = ({ adminAddress, beneficiaryAddress, holderAddress }: TokenSideBarRoleProps) => {
  const getUserRole = () => {
    switch (true) {
      case adminAddress === holderAddress && adminAddress === beneficiaryAddress:
        return "Holder and Beneficiary";
      case adminAddress === holderAddress:
        return "Holder";
      case adminAddress === beneficiaryAddress:
        return "Beneficiary";
      default:
        return "";
    }
  };

  return <h4>{getUserRole()}</h4>;
};

export default TokenSideBarRole;
