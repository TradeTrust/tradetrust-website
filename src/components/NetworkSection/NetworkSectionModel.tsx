import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useEffect } from "react";
import { NetworkSelect } from "../Layout/NetworkSelect";
import { Model } from "../UI/Overlay/OverlayContent/Model";
import { HelpCircle } from "react-feather";
import { useProviderContext } from "../../common/contexts/provider";
import { useOverlayContext } from "../../common/contexts/OverlayContext";

interface NetworkSectionModelProps {
  collapsible?: boolean;
  nextStep?: React.ReactNode;
}

const NetworkSectionModel: React.FC<NetworkSectionModelProps> = ({ collapsible = false, nextStep }) => {
  const { closeOverlay, showOverlay } = useOverlayContext();
  const { currentChainId, networkChangeLoading, setNetworkChangeLoading } = useProviderContext();

  useEffect(() => {
    setNetworkChangeLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Model
      title="Network Selector"
      collapsible={collapsible}
      showDivider
      footer={
        <>
          <Button className="flex-1 w-full text-cerulean-500" onClick={closeOverlay}>
            Cancel
          </Button>
          <Button
            disabled={currentChainId === undefined || networkChangeLoading}
            className="flex-1 w-full bg-cerulean-500 text-white hover:bg-cerulean-800 disabled:cursor-not-allowed disabled:bg-cloud-300"
            onClick={() => {
              closeOverlay();
              nextStep && showOverlay(nextStep);
            }}
          >
            Continue
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <p>Choose the blockchain network you want to use for your transferable document.</p>
        </div>
        <div className="flex flex-col gap-2">
          <span>Select Network: </span>
          <NetworkSelect disabled={false} document={undefined} inPlaceLoading={true} />
        </div>
        <div className="flex flex-row gap-2 bg-cerulean-50 p-2 rounded-lg border">
          <div className="flex items-center h-6">
            <HelpCircle color="#4DA6E8" size={18} />
          </div>
          <span className="flex-1">
            A document can only be successfully verified on the same network where the document was created in.
          </span>
        </div>
      </div>
    </Model>
  );
};

export default NetworkSectionModel;
