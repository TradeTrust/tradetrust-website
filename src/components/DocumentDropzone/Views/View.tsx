import { Button, ButtonSize } from "../../Button";
import React, { FunctionComponent } from "react";

interface ViewProps {
  toggleQrReaderVisible?: () => void;
}

export const View: FunctionComponent<ViewProps> = ({ toggleQrReaderVisible }) => {
  return (
    <div>
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <h4>Drop your TradeTrust Document to view its contents</h4>
      <p className="my-6">Or</p>
      <div className="flex flex-col xs:flex-row justify-center gap-2">
        <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 w-full xs:w-72" size={ButtonSize.MD}>
          Select Document
        </Button>
        <Button
          className="bg-cerulean-500 text-white hover:bg-cerulean-800 w-full xs:w-72 md:hidden"
          size={ButtonSize.MD}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible && toggleQrReaderVisible();
          }}
        >
          Scan QR Code
        </Button>
      </div>
    </div>
  );
};
