import React from "react";
import { CheckCircle, XCircle } from "react-feather";
import { NETWORK_NAME } from "../../config";

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
  isRevoked?: boolean;
  isConsumed?: boolean;
  messageSet: {
    failureTitle: string;
    successTitle: string;
    revokedTitle?: string;
    consumedTitle?: string;
    failureMessage: string;
  };
}

export const StatusCheck = ({ valid, isRevoked, isConsumed, messageSet }: StatusCheck) => {
  let message: any = valid ? messageSet.successTitle : messageSet.failureTitle;
  let icon: any = valid ? <CheckCircle className="text-teal" /> : <XCircle className="text-red" />;

  if (NETWORK_NAME === "Corda Enterprise") {
    if (isConsumed) {
      message = messageSet.consumedTitle;
      icon = <CheckCircle className="text-teal text-orange" />;
    }
    if (isRevoked) {
      message = messageSet.revokedTitle;
      icon = <XCircle className="text-red" />;
    }
  }

  return <Status message={message} icon={icon} />;
};
