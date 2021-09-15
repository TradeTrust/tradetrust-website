import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { DemoState, setDemoStateType } from "./../types";

interface DemoLoginProps {
  setDemoState: setDemoStateType;
}

export const DemoLogin: FunctionComponent<DemoLoginProps> = ({ setDemoState }) => {
  return (
    <>
      <h5>
        Take the TradeTrust User Journey and have a hands-on experience on how easy it is to streamline your operations
        using TradeTrust
      </h5>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      <Button
        className="bg-cerulean text-white mt-8 hover:bg-cerulean-300"
        onClick={() => setDemoState(DemoState.CREATE)}
      >
        <h5>Start now</h5>
      </Button>
    </>
  );
};
