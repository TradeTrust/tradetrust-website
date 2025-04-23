import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useState } from "react";

interface ConnectMetamaskOverlayProps {
  handleCreateDocument: () => void;
  closeOverlay: () => void;
  form: any;
}

export const RejectActionTitle = {
  HOLDERSHIP: "Holdership",
  OWNERSHIP: "Ownership",
  OWNERSHIP_AND_HOLDERSHIP: "Ownership & Holdership",
};

export const ExpandPreview: FunctionComponent<ConnectMetamaskOverlayProps> = ({
  handleCreateDocument,
  closeOverlay,
  form,
}) => {
  const [zoom, setZoom] = useState(100);

  return (
    <div
      data-testid="connect-metamask-overlay"
      id="overlay"
      className="font-gilroy bg-white w-full max-w-[640px] min-w-[308px] h-auto flex flex-col rounded-[12px] font-medium leading-5 tracking-[0px] text-neutral-600 z-20"
    >
      <div id="header" className="flex flex-none items-center gap-4 min-[596px]:flex-nowrap p-6 pb-4">
        <h3>Document Preview</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center px-6 w-full gap-2">
        <div id="name" className="w-full sm:w-1/2">
          <p>{form.name}</p>
        </div>

        <div className="w-full sm:w-1/2 flex items-center justify-between">
          <div className="flex items-center justify-between w-5/6 gap-1">
            <p className="cursor-pointer hover:font-bold mb-0.3" onClick={() => setZoom(Math.max(5, zoom - 5))}>
              -
            </p>

            <input
              type="range"
              min="100"
              max="200"
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="h-[3px] w-11/12 range-custom cursor-pointer"
            />

            <p className="cursor-pointer hover:font-bold mb-0.3" onClick={() => setZoom(Math.min(100, zoom + 5))}>
              +
            </p>
          </div>
          <p className="text-sm px-2 w-1/6">{zoom}%</p>
        </div>
      </div>

      <div id="body" className="px-6 py-4">
        <div
          id="scrollbar"
          className="mx-auto h-[444px] overflow-auto bg-cloud-100 rounded-[12px] border border-transparent"
        >
          <div
            className="rounded-[12px] "
            style={{
              width: `${zoom}%`,
              height: `${zoom}%`,
              transformOrigin: "top left",
            }}
          >
            <img src={form.img} alt="Expand" className="rounded-[12px] p-2" />
          </div>
        </div>
      </div>

      <div id="footer" className="p-6 pt-4">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-2 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
          <Button
            className="bg-white text-cerulean-500 hover:bg-cloud-100 px-[18px] py-3 w-full xs:w-auto flex-1 min-h-12 rounded-xl p-3"
            onClick={() => closeOverlay()}
            data-testid={`overlayHandleConnectionBtn`}
          >
            Dismiss
          </Button>
          <Button
            className="bg-cerulean-500 text-white hover:bg-cerulean-800 px-[18px] py-3 w-full xs:w-auto flex-1 min-h-12 rounded-xl p-3"
            onClick={() => handleCreateDocument()}
            data-testid={`overlayHandleDispatchBtn`}
          >
            Create Document
          </Button>
        </div>
      </div>
    </div>
  );
};
