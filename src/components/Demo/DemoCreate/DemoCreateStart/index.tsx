import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useEffect } from "react";
import { useProviderContext } from "../../../../common/contexts/provider";
import { useDemoFormContext } from "../DemoFormContext";

export const DemoCreateStart: FunctionComponent = () => {
  const { upgradeToMagicSigner } = useProviderContext();
  const { currentStep, setCurrentStep } = useDemoFormContext();

  useEffect(() => {
    async function upgrade() {
      await upgradeToMagicSigner();
    }

    upgrade();
  });

  return (
    <>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      <Button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="bg-cerulean text-white mt-8 hover:bg-cerulean-300"
      >
        Start Now
      </Button>
    </>
  );
};
