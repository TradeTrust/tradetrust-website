import { isObfuscated } from "@trustvc/trustvc";
import React, { FunctionComponent, useEffect, useState } from "react";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { DOCUMENT_SCHEMA } from "../../reducers/certificate";

interface ObfuscatedMessageProps {
  document: WrappedOrSignedOpenAttestationDocument;
}

export const ObfuscatedMessage: FunctionComponent<ObfuscatedMessageProps> = ({ document }) => {
  const { documentSchema } = useSelector((state: RootState) => state.certificate);
  const [isDocumentObfuscated, setIsDocumentObfuscated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkObfuscation = async () => {
      try {
        const result = await isObfuscated(document);
        setIsDocumentObfuscated(result);
      } catch (error) {
        console.warn("Error checking if document is obfuscated:", error);
        setIsDocumentObfuscated(false);
      }
    };

    checkObfuscation();
  }, [document]);

  // Return null while checking or if not obfuscated
  if (isDocumentObfuscated === null || !isDocumentObfuscated) return null;
  return (
    <div className="container">
      <div className="text-lg font-gilroy-bold text-scarlet-500" data-testid="obfuscation-info">
        <p className="py-6">
          {documentSchema === DOCUMENT_SCHEMA.W3C_VC_2_0
            ? "Note: Some fields/data might be obfuscated in this document."
            : "Note: There are fields/data obfuscated in this document."}
        </p>
      </div>
    </div>
  );
};
