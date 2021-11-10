import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import { SampleMobile } from "../SampleMobile";

interface ViewProps {
  toggleQrReaderVisible?: () => void;
}

export const View: FunctionComponent<ViewProps> = ({ toggleQrReaderVisible }) => {
  return (
    <div>
      <SampleMobile />
      <img
        className="mx-auto w-56"
        alt="Document Dropzone TradeTrust"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <h4>Drop your TradeTrust file to view its contents</h4>
      <p className="my-6">Or</p>
      <Button className="bg-cerulean text-white hover:bg-cerulean-500 mr-2 md:mr-0" size={ButtonSize.SM}>
        Select Document
      </Button>
      <Button
        className="bg-cerulean text-white hover:bg-cerulean-500 md:hidden"
        size={ButtonSize.SM}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleQrReaderVisible && toggleQrReaderVisible();
        }}
      >
        Scan QR Code
      </Button>
    </div>
  );
};
