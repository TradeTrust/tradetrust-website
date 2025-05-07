import React from "react";
import { NetworkSelect } from "../Layout/NetworkSelect";
import { InfoOverlay } from "../UI/Overlay";
import { OverlayContent } from "../UI/Overlay/OverlayContent";

interface NetworkSectionProps {
  overlayMargin?: string; // e.g. "ml-2" or "ml-3"
  disabled?: boolean;
  document?: any;
  inPlaceLoading?: boolean;
}

export const NetworkSection = ({
  overlayMargin = "ml-2",
  disabled = false,
  document,
  inPlaceLoading = false,
}: NetworkSectionProps): JSX.Element => {
  return (
    <div className="w-full xs:w-auto min-w-72 flex flex-row items-top">
      <NetworkSelect disabled={disabled} document={document} inPlaceLoading={inPlaceLoading} />
      <div className="h-10 flex items-center">
        <InfoOverlay className={`p-0 ${overlayMargin} cursor-pointer focus:outline-none`}>
          <OverlayContent className="bg-white max-w-sm lg:max-w-lg" title="Network Selector">
            A document can only be successfully verified on the same network where the document was created in.
            <br />
            If unsure, do check with the document issuer.
          </OverlayContent>
        </InfoOverlay>
      </div>
    </div>
  );
};
