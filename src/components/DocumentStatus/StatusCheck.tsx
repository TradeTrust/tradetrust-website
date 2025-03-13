import React, { FunctionComponent } from "react";
import { CheckCircle, XCircle } from "react-feather";

interface StatusProps {
  message: string;
  icon: React.ReactNode;
}

const Status = ({ message, icon }: StatusProps) => (
  <div className="flex justify-start items-center py-2 h-9">
    <div className="w-5 h-5 flex-1 flex">{icon}</div>
    <div className="flex-grow">
      <p className="pl-2 mb-0 text-sm leading-5">{message}</p>
    </div>
  </div>
);

interface StatusCheck {
  valid: boolean;
  messageSet: {
    failureTitle: string;
    successTitle: string;
    failureMessage: string;
  };
}

export const StatusCheck: FunctionComponent<StatusCheck> = ({ valid, messageSet }) => {
  const message = valid ? messageSet.successTitle : messageSet.failureTitle;
  const icon = valid ? (
    <CheckCircle className="text-forest-500 w-5 h-5" />
  ) : (
    <XCircle className="text-scarlet-500 w-5 h-5" />
  );

  return <Status message={message} icon={icon} />;
};
