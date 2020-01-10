import React from "react";

interface TokenSideBarRoleProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
}

const TokenSideBarRole = ({ adminAddress, beneficiaryAddress, holderAddress }: TokenSideBarRoleProps) => {
  let userRole = "\u00A0"; // empty space to maintain layout

  if (adminAddress === holderAddress && adminAddress === beneficiaryAddress) {
    userRole = "Holder and Beneficiary";
  } else if (adminAddress === holderAddress) {
    userRole = "Holder";
  } else if (adminAddress === beneficiaryAddress) {
    userRole = "Beneficiary";
  }

  return <h4>{userRole}</h4>;
};

export default TokenSideBarRole;
