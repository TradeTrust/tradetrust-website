import { ObligationDocumentStatus } from "@trustvc/trustvc";

export { ObligationDocumentStatus };

export const OBLIGATION_STATUS_LABEL: Record<number, string> = {
  [ObligationDocumentStatus.Issued]: "Issued",
  [ObligationDocumentStatus.Accepted]: "Accepted",
  [ObligationDocumentStatus.Rejected]: "Rejected",
  [ObligationDocumentStatus.Discharged]: "Discharged",
};
