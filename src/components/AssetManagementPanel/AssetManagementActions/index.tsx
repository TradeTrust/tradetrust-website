export enum AssetManagementActions {
  None = "None",
  TransferHolder = "TransferHolder",
  TransferOwner = "TransferOwner",
  TransferOwnerHolder = "TransferOwnerHolder",
  NominateBeneficiary = "NominateBeneficiary",
  EndorseBeneficiary = "EndorseBeneficiary", // TransferOwner
  ReturnToIssuer = "ReturnToIssuer",
  AcceptReturnToIssuer = "AcceptReturnToIssuer",
  RejectReturnToIssuer = "RejectReturnToIssuer",
  RejectTransferOwnerHolder = "RejectTransferOwnerHolder",
  RejectTransferOwner = "RejectTransferOwner",
  RejectTransferHolder = "RejectTransferHolder",
}
