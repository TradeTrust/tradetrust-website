import { WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";

interface ObfuscatedMessageProps {
  document: WrappedDocument;
}

export const ObfuscatedMessage = ({ document }: ObfuscatedMessageProps) => {
  if (!document?.privacy?.obfuscatedData?.length) return null;

  return (
    <div className="text-lg font-bold text-red" data-testid="obfuscation-info">
      <div className="container">
        <p className="py-6">Note: There are fields/data obfuscated in this document.</p>
      </div>
    </div>
  );
};
