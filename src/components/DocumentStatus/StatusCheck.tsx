import React from "react";
import { SvgIcon, SvgIconCheckCircle, SvgIconXCircle } from "./../UI/SvgIcon";

interface StatusProps {
  message: string;
  icon: React.ReactNode;
}

const Status = ({ message, icon }: StatusProps) => (
  <div className="status">
    <div className="row no-gutters align-items-center">
      <div className="col-auto">
        <SvgIcon>{icon}</SvgIcon>
      </div>
      <div className="col">
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
  const icon = valid ? <SvgIconCheckCircle /> : <SvgIconXCircle />;

  return <Status message={message} icon={icon} />;
};
