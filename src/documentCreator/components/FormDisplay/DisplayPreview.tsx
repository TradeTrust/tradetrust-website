import React, { ReactElement, useState } from "react";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import { DocumentPreview } from "../DocumentPreview";
import { PopupModal } from "../common/PopupModal";

interface DocumentModalProps {
  document: Document;
  togglePreviewDisplay: (i: boolean) => void;
}

const DocumentPreviewModal = ({ togglePreviewDisplay, document }: DocumentModalProps): ReactElement => (
  <PopupModal toggleDisplay={togglePreviewDisplay} title="Document Preview" containerStyle={{ maxWidth: "85%" }}>
    <DocumentPreview document={document} />
  </PopupModal>
);

export const DisplayPreview = ({ document }: { document: Document }): ReactElement => {
  const [isPreviewVisible, togglePreviewDisplay] = useState(false);
  if (isPreviewVisible) {
    return <DocumentPreviewModal document={document} togglePreviewDisplay={togglePreviewDisplay} />;
  }
  return (
    <button id="document-preview" className="btn btn-primary" onClick={() => togglePreviewDisplay(!isPreviewVisible)}>
      Show Preview
    </button>
  );
};
