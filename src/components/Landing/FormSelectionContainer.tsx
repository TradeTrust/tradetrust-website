import React, { FunctionComponent } from "react";
import { FormSelection } from "./FormSelection";

const forms = [
  {
    name: "Electronic Bill of Lading (Carrier)",
    type: "Transferable",
    img: "./static/creator/bill_of_lading.png",
  },
  {
    name: "Electronic Promissory Note",
    type: "Transferable",
    img: "./static/creator/epn.png",
  },
  {
    name: "Warehouse Receipt",
    type: "Transferable",
    img: "/static/creator/warehouse_reciept.png",
  },
  {
    name: "Certificate of Origin",
    type: "Non-Transferable",
    img: "./static/creator/coo.png",
  },
  {
    name: "Invoice",
    type: "Non-Transferable",
    img: "./static/creator/invoice.png",
  },
];
const formTypes = ["Transferable", "Non-Transferable"];
export const FormSelectionContainer: FunctionComponent = () => {
  return (
    <>
      <div>
        <h1 data-testid="form-selection-title" className="p-8">
          Create Document
        </h1>
      </div>
      <FormSelection forms={forms} formTypes={formTypes} />
    </>
  );
};
