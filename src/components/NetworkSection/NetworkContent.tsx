import React from "react";
import { NetworkSelect } from "../Layout/NetworkSelect";
import { HelpCircle } from "react-feather";

interface NetworkContentProps {
  disabled: boolean;
}

export const NetworkContent: React.FC<NetworkContentProps> = ({ disabled }) => {
  return (
    <div data-testid="network-content" className="flex flex-col gap-4 bg-cerulean-50 p-2 rounded-lg">
      <div className="flex flex-col gap-2">
        <span>Select Network: </span>
        <NetworkSelect disabled={disabled} document={undefined} inPlaceLoading={true} />
      </div>

      <div className="flex flex-row gap-2 bg-white p-2 rounded-lg border">
        <div className="flex items-center h-6">
          <HelpCircle color="#4DA6E8" size={18} />
        </div>
        <span className="flex-1">
          A document can only be successfully verified on the same network where the document was created in.
        </span>
      </div>
    </div>
  );
};
