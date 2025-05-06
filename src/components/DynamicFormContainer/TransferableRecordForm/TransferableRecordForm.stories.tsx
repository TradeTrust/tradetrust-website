import React, { FunctionComponent, useState } from "react";
import { TransferableRecordForm } from "./TransferableRecordForm";

export default {
  title: "DynamicForm/TransferableRecordForm",
  component: TransferableRecordForm,
  parameters: {
    componentSubtitle: "Form for specifying owner and holder wallet addresses and optional remarks.",
  },
};

export const Default: FunctionComponent = () => {
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [holderAddress, setHolderAddress] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="max-w-screen-lg p-4 border rounded-md shadow-md">
      <TransferableRecordForm
        beneficiaryAddress={beneficiaryAddress}
        holderAddress={holderAddress}
        remarks={remarks}
        setBeneficiaryAddress={setBeneficiaryAddress}
        setHolderAddress={setHolderAddress}
        setRemarks={setRemarks}
      />
    </div>
  );
};
