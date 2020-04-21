export enum TOKEN_ACTION_TYPES {
  "CHANGE_HOLDER",
  "CHANGE_BENEFICIARY",
  "ENDORSE_BENEFICIARY",
  "SURRENDER_DOCUMENT",
}

export function getSuccessResponse(actionType: TOKEN_ACTION_TYPES): string {
  switch (actionType) {
    case TOKEN_ACTION_TYPES.CHANGE_HOLDER:
      return "Change Holder Success";
    case TOKEN_ACTION_TYPES.CHANGE_BENEFICIARY:
      return "Change Beneficiary Success";
    case TOKEN_ACTION_TYPES.ENDORSE_BENEFICIARY:
      return "Endorse Change of Beneficiary Success";
    case TOKEN_ACTION_TYPES.SURRENDER_DOCUMENT:
      return "Surrender Document Success";
    default:
      return "";
  }
}

export const checkIfApprovedAddress = (
  approvedEscrowContractAddress?: string
): approvedEscrowContractAddress is string => {
  const addressZero = "0x0000000000000000000000000000000000000000";
  return !!approvedEscrowContractAddress && approvedEscrowContractAddress !== addressZero;
};
