export enum UserRole {
  Holder,
  Beneficiary,
  HolderBeneficiary,
  NoMatch,
}

export const userRoleText = (role: UserRole) => {
  switch (role) {
    case UserRole.Holder:
      return "Holder";
    case UserRole.Beneficiary:
      return "Beneficiary";
    case UserRole.HolderBeneficiary:
      return "Holder and Beneficiary";
    case UserRole.NoMatch:
      return "\u00A0";
    default:
      return "\u00A0";
  }
};

export interface TokenSideBarRoleProps {
  adminAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
}

const getUserRoles = ({ adminAddress, holderAddress, beneficiaryAddress }: TokenSideBarRoleProps) => {
  switch (true) {
    case adminAddress !== holderAddress && adminAddress !== beneficiaryAddress:
    case !holderAddress && !beneficiaryAddress:
      return UserRole.NoMatch;
    case adminAddress === holderAddress && adminAddress === beneficiaryAddress:
      return UserRole.HolderBeneficiary;
    case adminAddress === holderAddress:
      return UserRole.Holder;
    case adminAddress === beneficiaryAddress:
      return UserRole.Beneficiary;
    default:
      return UserRole.NoMatch;
  }
};

export default getUserRoles;
