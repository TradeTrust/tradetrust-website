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
  userWalletAddress: string;
  beneficiaryAddress: string;
  holderAddress: string;
}

const getUserRoles = ({ userWalletAddress, holderAddress, beneficiaryAddress }: TokenSideBarRoleProps) => {
  switch (true) {
    case userWalletAddress !== holderAddress && userWalletAddress !== beneficiaryAddress:
    case !holderAddress && !beneficiaryAddress:
      return UserRole.NoMatch;
    case userWalletAddress === holderAddress && userWalletAddress === beneficiaryAddress:
      return UserRole.HolderBeneficiary;
    case userWalletAddress === holderAddress:
      return UserRole.Holder;
    case userWalletAddress === beneficiaryAddress:
      return UserRole.Beneficiary;
    default:
      return UserRole.NoMatch;
  }
};

export default getUserRoles;
