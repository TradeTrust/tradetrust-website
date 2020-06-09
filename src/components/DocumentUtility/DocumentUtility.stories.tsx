import React from "react";
import { DocumentUtility } from "./DocumentUtility";
import document from "../../test/fixture/ebl.json";

export default {
  title: "Document/Utility",
  component: DocumentUtility,
};

export const PrintAndDownload = () => {
  return <DocumentUtility document={document as any} handleSharingToggle={() => {}} />;
};
