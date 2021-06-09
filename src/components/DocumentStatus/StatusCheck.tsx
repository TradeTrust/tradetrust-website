import React, { FunctionComponent } from "react";
import { CheckCircle, XCircle } from "react-feather";

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

export const StatusCheck: FunctionComponent<StatusCheck> = ({ valid, messageSet }) => {
  const message = valid ? messageSet.successTitle : messageSet.failureTitle;
  const icon = valid ? <CheckCircle className="text-turquoise" /> : <XCircle className="text-red-500" />;

  return <Status message={message} icon={icon} />;
};
