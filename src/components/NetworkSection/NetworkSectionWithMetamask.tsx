import React from "react";
import { NetworkSection } from "./NetworkSection";
import ConnectToMetamask from "../ConnectToMetamask";

interface NetworkSectionProps {
  subtitle: string;
  overlayMargin?: string; // e.g. "ml-2" or "ml-3"
  className?: string;
  disabled?: boolean;
  document?: any;
}

export const NetworkSectionWithMetamask = ({
  subtitle,
  overlayMargin = "ml-2",
  className = "",
  disabled = false,
  document,
}: NetworkSectionProps): JSX.Element => {
  return (
    <div className={`flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-2 ${className}`}>
      <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
        <div className="w-full xs:w-auto text-gray-900 flex items-center" data-testid="page-subtitle">
          {subtitle}
        </div>
        <NetworkSection overlayMargin={overlayMargin} disabled={disabled} document={document} />
      </div>
      <ConnectToMetamask className="w-full xs:w-72" />
    </div>
  );
};
