import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";

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
      id="overlay"
      className="font-gilroy bg-white w-full max-w-[640px] min-w-[308px] h-auto max-h-[244px] flex flex-col rounded-[12px] bg-white font-medium leading-5 tracking-[0px] text-neutral-600 z-20"
    >
      <div id="header" className="flex flex-wrap items-center gap-4 min-[596px]:flex-nowrap p-6 pb-4">
        <div className="flex flex-shrink-0 items-center justify-center">
          <div className="h-7 w-7" style={{ backgroundImage: "url('/static/images/dropzone/check_circle.svg')" }} />
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
        <div className="flex flex-wrap items-center justify-between gap-y-6 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
          <Button
            className="bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px] py-3 w-[292px] h-[48px] min-w-[260px] rounded-[12px] p-[12px]"
            onClick={() => handleConnection()}
            // data-testid={`cancelReject${actionTitle}Btn`}
          >
            Connect with Metamask
          </Button>
          <Button
            className="bg-cerulean-500 text-white hover:bg-cerulean-800 px-[18px] py-3 w-[292px] h-[48px] min-w-[260px] rounded-[12px] p-[12px]"
            onClick={() => handleDispatch()}
            // data-testid={`confirmReject${actionTitle}Btn`}
          >
            Proceed Anyway
            {/* {  <LoaderSpinner data-testid={"loader"} /> : <>Confirm</>} */}
          </Button>
        </div>
      </div>
    </div>
  );
};
