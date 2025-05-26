import React, { FunctionComponent, useState } from "react";
import { FormTransferableRecordPanel } from "./FormTransferableRecordPanel";

export default {
  title: "Creator/FormTransferableRecordPanel",
  component: FormTransferableRecordPanel,
  parameters: {
    componentSubtitle: "Component for managing transferable record details in both edit and view modes.",
  },
};

export const EditMode: FunctionComponent = () => {
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638");
  const [holderAddress, setHolderAddress] = useState("0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638");
  const [remarks, setRemarks] = useState("Sample remarks for the transferable record");

  return (
    <div className="max-w-screen-lg p-4 border rounded-md shadow-md">
      <FormTransferableRecordPanel
        mode="edit"
        beneficiaryAddress={beneficiaryAddress}
        holderAddress={holderAddress}
        remarks={remarks}
        setBeneficiaryAddress={setBeneficiaryAddress}
        setHolderAddress={setHolderAddress}
        setRemarks={setRemarks}
        fileName="Tradetrust-bill-of-lading.tt"
      />
    </div>
  );
};

export const ViewMode: FunctionComponent = () => {
  return (
    <div className="max-w-screen-lg p-4 border rounded-md shadow-md">
      <FormTransferableRecordPanel
        mode="view"
        beneficiaryAddress="0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
        holderAddress="0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638"
        remarks="Sample remarks for the transferable record"
        fileName="Tradetrust-bill-of-lading.tt"
      />
    </div>
  );
};

export const EmptyEditMode: FunctionComponent = () => {
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [holderAddress, setHolderAddress] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="max-w-screen-lg p-4 border rounded-md shadow-md">
      <FormTransferableRecordPanel
        mode="edit"
        beneficiaryAddress={beneficiaryAddress}
        holderAddress={holderAddress}
        remarks={remarks}
        setBeneficiaryAddress={setBeneficiaryAddress}
        setHolderAddress={setHolderAddress}
        setRemarks={setRemarks}
        fileName="Tradetrust-bill-of-lading.tt"
      />
    </div>
  );
};
