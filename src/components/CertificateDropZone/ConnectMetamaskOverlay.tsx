import { Button } from "../Button";
import React, { FunctionComponent } from "react";
import { CheckCircle } from "react-feather";

interface ConnectMetamaskOverlayProps {
  handleConnection: () => void;
  handleDispatch: () => void;
}

export const RejectActionTitle = {
  HOLDERSHIP: "Holdership",
  OWNERSHIP: "Ownership",
  OWNERSHIP_AND_HOLDERSHIP: "Ownership & Holdership",
};

export const ConnectMetamaskOverlay: FunctionComponent<ConnectMetamaskOverlayProps> = ({
  handleConnection,
  handleDispatch,
}) => {
  return (
    <div
      data-testid="connect-metamask-overlay"
      id="overlay"
      className="font-gilroy bg-white w-full max-w-[640px] min-w-[308px] h-auto flex flex-col rounded-xl bg-white font-medium leading-5 tracking-[0px] text-neutral-600 z-20"
    >
      <div id="header" className="flex flex-none items-center gap-4 min-[596px]:flex-nowrap p-6 pb-4">
        <div className="flex flex-shrink-0 items-center">
          <CheckCircle width="28px" height="28px" className="text-forest-500" />
        </div>
        <h3>Transferable Document Uploaded</h3>
      </div>
      <div id="body" className="px-6 py-4">
        <div className="text-center">
          <span>
            <p className="mb-3 text-center">
              You may either connect to your{" "}
              <a href="https://metamask.io/en-GB" target="_blank" rel="noreferrer">
                Metamask
              </a>{" "}
              wallet to perform asset management or proceed anyway for document verification.
            </p>
          </span>
        </div>
      </div>
      <div id="footer" className="p-6 pt-4">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-2 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
          <Button
            className="bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px] py-3 w-full xs:w-auto flex-1 min-h-12 rounded-xl p-3"
            onClick={() => handleConnection()}
            data-testid={`overlayHandleConnectionBtn`}
          >
            Connect with Metamask
          </Button>
          <Button
            className="bg-cerulean-500 text-white hover:bg-cerulean-800 px-[18px] py-3 w-full xs:w-auto flex-1 min-h-12 rounded-xl p-3"
            onClick={() => handleDispatch()}
            data-testid={`overlayHandleDispatchBtn`}
          >
            Proceed Anyway
          </Button>
        </div>
      </div>
    </div>
  );
};
