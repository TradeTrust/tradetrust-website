import React from "react";
// import { DocumentStatusUnStyled } from "./../DocumentStatus";
import { DocumentUtility, DocumentUtilityUnStyled } from "./DocumentUtility";
import document from "../../test/fixture/ebl.json";

export default {
  title: "Viewer/DocumentUtility",
  component: DocumentUtilityUnStyled,
  parameters: {
    componentSubtitle: "Utility functions relating to document, Print, Download.",
  },
};

export const PrintAndDownload = () => {
  return <DocumentUtility document={document as any} handleSharingToggle={() => {}} />;
};
