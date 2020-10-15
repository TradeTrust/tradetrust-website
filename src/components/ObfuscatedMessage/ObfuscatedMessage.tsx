import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "./../../styles";
import { WrappedDocument } from "@govtechsg/open-attestation";

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
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <p>Note: There are fields/data obfuscated in this document.</p>
          </div>
        </div>
      </div>
    </ObfuscationInfo>
  );
};
