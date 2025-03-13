import { isObfuscated } from "@trustvc/trustvc";
import { isSignedDocument } from "@trustvc/trustvc/w3c/vc";
import React, { FunctionComponent } from "react";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";

interface ObfuscatedMessageProps {
  document: WrappedOrSignedOpenAttestationDocument;
}

export const ObfuscatedMessage: FunctionComponent<ObfuscatedMessageProps> = ({ document }) => {
  if (isSignedDocument(document) || !isObfuscated(document)) return null;

  return (
    <div className="container">
      <div className="text-lg font-gilroy-bold text-scarlet-500" data-testid="obfuscation-info">
        <p className="py-6">Note: There are fields/data obfuscated in this document.</p>
      </div>
    </div>
  );
};
