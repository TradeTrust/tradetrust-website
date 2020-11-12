import React from "react";
import { CheckCircle, XCircle } from "react-feather";
import { vars } from "../../styles";

interface StatusProps {
  message: string;
  icon: React.ReactNode;
}

const Status = ({ message, icon }: StatusProps) => (
  <div className="status">
    <div className="flex items-center">
      <div className="w-auto">{icon}</div>
      <div className="flex-grow">
        <p className="pl-2 mb-0 message">{message}</p>
      </div>
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

export const StatusCheck = ({ valid, messageSet }: StatusCheck) => {
  const message = valid ? messageSet.successTitle : messageSet.failureTitle;
  const icon = valid ? <CheckCircle color={`${vars.teal}`} /> : <XCircle color={`${vars.red}`} />;

  return <Status message={message} icon={icon} />;
};
