import { DocumentTypeContent } from "../../../types";
import { TransferableRecordPersonas } from "./TransferableRecordPersonas";
import { VerifiableDocumentPersonas } from "./VerifiableDocumentPersonas";

export const DocumentContent: DocumentTypeContent[] = [
  {
    type: "Transferable Record",
    description:
      "Transferable Records are Electronic Transferable documents that entitle the holder to claim the performance of the obligation indicated therein and that allow the transfer of the claim to that performance by transferring possession of the document or instrument. Examples of transferable records typically include bills of lading, bills of exchange, promissory notes, and warehouse receipts.",
    message: "See how each persona benefit from the use of TradeTrust when dealing with Blank-Endorsed BL",
    users: TransferableRecordPersonas,
  },
  {
    type: "Verifiable Document",
    description:
      "Tradetrust Verifiable documents are digital documents that are tamper-proof and protected against fraud by signing their digital fingerprints on +10’000 blockchain nodes. Examples of Verifiable documents typically include Certificate of Origin(CoO), Invoices and promissory notes.",
    message: "See how each persona benefit from the use of TradeTrust when dealing with Certificate of Origin",
    users: VerifiableDocumentPersonas,
  },
];
