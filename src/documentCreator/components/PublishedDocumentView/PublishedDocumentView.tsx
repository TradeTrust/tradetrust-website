import React, { ReactElement, useContext } from "react";
import { Document } from "@govtechsg/decentralized-renderer-react-components";
import { getData } from "@govtechsg/tradetrust-schema";
import { get } from "lodash";
import { DocumentPreview } from "../DocumentPreview";
import { FormDataContext } from "../../contexts/FormDataContext";

interface PopupModalProps {
  document: Document;
  togglePreviewDisplay: (i: boolean) => void;
}

const getTitle = (document: Document): string => {
  return `${get(document, "name", "document")}.tt`;
};

const PublishedDocumentView = (): ReactElement => {
  const { wrappedDocument } = useContext(FormDataContext);
  const document = getData(wrappedDocument);
  return (
    <>
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(wrappedDocument, null, 2))}`}
        download={getTitle(document)}
        style={{ margin: 15, float: "right" }}
      >
        Download Document
      </a>
      <DocumentPreview document={document} />
    </>
  );
};

export default PublishedDocumentView;
