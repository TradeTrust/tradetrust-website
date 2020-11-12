import styled from "@emotion/styled";
import { WrappedDocument } from "@govtechsg/open-attestation";
import React from "react";
import { mixin, vars } from "./../../styles";

const ObfuscationInfo = styled.div`
  ${mixin.fontSourcesansproBold};
  ${mixin.fontSize(18)};
  color: ${vars.red};
`;

interface ObfuscatedMessageProps {
  document: WrappedDocument;
}

export const ObfuscatedMessage = ({ document }: ObfuscatedMessageProps) => {
  if (!document?.privacy?.obfuscatedData?.length) return null;

  return (
    <ObfuscationInfo data-testid="obfuscation-info">
      <div className="container">
        <p className="py-6">Note: There are fields/data obfuscated in this document.</p>
      </div>
    </ObfuscationInfo>
  );
};
