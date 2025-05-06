import React, { FunctionComponent } from "react";
import { ConfirmationContent, DismissalButton, MESSAGE_TYPE } from "./ConfirmationContent";

interface ProviderTimeoutMessageProps {
  address: string;
}

export const ProviderTimeoutMessage: FunctionComponent<ProviderTimeoutMessageProps> = ({ address }) => {
  return (
    <ConfirmationContent messageType={MESSAGE_TYPE.WARNING}>
      <p className="text-cloud-800">
        Loading the endorsement chain is taking longer than usual. To address this,{" "}
        <a href={address} target="_blank" rel="noreferrer noopener">
          change your Remote Procedure Call (RPC) provider
        </a>
        .
      </p>
      <DismissalButton />
    </ConfirmationContent>
  );
};
