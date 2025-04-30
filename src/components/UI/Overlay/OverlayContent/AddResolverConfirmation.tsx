import React, { FunctionComponent } from "react";
import { ConfirmationContent, DismissalButton, MESSAGE_TYPE } from "./ConfirmationContent";

export const AddResolverConfirmation: FunctionComponent = () => {
  return (
    <ConfirmationContent messageType={MESSAGE_TYPE.SUCCESS} title="Success" btnText="Okay, got it">
      <p className="text-cloud-800">Address successfully added</p>
      <DismissalButton buttonText="Okay, got it" />
    </ConfirmationContent>
  );
};
