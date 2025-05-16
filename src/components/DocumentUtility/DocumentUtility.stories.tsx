import React, { useEffect, useState } from "react";
import { DocumentUtility } from "./DocumentUtility";
import { v2, wrapOADocument, WrappedDocument } from "@trustvc/trustvc";

export default {
  title: "Viewer/DocumentUtility",
  component: DocumentUtility,
  parameters: {
    componentSubtitle: "Utility functions relating to document, Display QR Code, Print, Download.",
  },
};

const issuers = [
  {
    name: "John",
    documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
    identityProof: {
      type: v2.IdentityProofType.DNSTxt,
      location: "example.com",
    },
  },
];

const handlePrint = () => {
  window.print();
};

export const PrintAndDownload = () => {
  const [documentWithoutQr, setDocumentWithoutQr] = useState<WrappedDocument<any> | null>(null);

  useEffect(() => {
    wrapOADocument({
      issuers,
      name: "bah bah black sheep",
    }).then(setDocumentWithoutQr);
  }, []);

  if (!documentWithoutQr) return <div>Loading...</div>;
  return (
    <DocumentUtility document={documentWithoutQr as any} onPrint={handlePrint} selectedTemplate="default-template" />
  );
};

export const QRPrintAndDownload = () => {
  const [documentWithQr, setDocumentWithQr] = useState<WrappedDocument<any> | null>(null);

  useEffect(() => {
    wrapOADocument({
      issuers,
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    }).then(setDocumentWithQr);
  }, []);

  if (!documentWithQr) return <div>Loading...</div>;
  return <DocumentUtility document={documentWithQr as any} onPrint={handlePrint} selectedTemplate="default-template" />;
};
