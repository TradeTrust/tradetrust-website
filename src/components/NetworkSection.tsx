import React from "react";
import { NetworkSelect } from "./Layout/NetworkSelect";
import { OverlayContent, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import { InfoOverlay } from "./UI/Overlay";
import ConnectToMetamask from "./ConnectToMetamask";

interface NetworkSectionProps {
  subtitle: string;
  overlayMargin?: string; // e.g. "ml-2" or "ml-3"
  className?: string;
  disabled?: boolean;
  document?: any;
}

export const NetworkSection = ({
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
        <div className="w-full xs:w-auto flex flex-row items-center">
          <NetworkSelect disabled={disabled} document={document} />
          <OverlayContextProvider>
            <InfoOverlay className={`p-0 ${overlayMargin} cursor-pointer focus:outline-none`}>
              <OverlayContent className="bg-white max-w-sm lg:max-w-md" title="Network Selector">
                A document can only be successfully verified on the same network where the document was created in.
                <br />
                If unsure, do check with the document issuer.
              </OverlayContent>
            </InfoOverlay>
          </OverlayContextProvider>
        </div>
      </div>
      <ConnectToMetamask className="w-full xs:w-[18.25rem]" />
    </div>
  );
};
