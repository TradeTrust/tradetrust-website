import { Button, LoaderSpinner } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { ProviderContext } from "../../../../common/contexts/provider";
import { deployingDocStore } from "../../../../reducers/demo-create";
import { getFunds } from "../../../../services/create";
import { DemoCreateContext } from "../contexts/DemoCreateContext";

export const DemoCreateStart: FunctionComponent = () => {
  const { account, provider } = useContext(ProviderContext);
  const { setActiveStep } = useContext(DemoCreateContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleStart = async () => {
    setLoading(true);

    try {
      const balance = await provider.getBalance("latest");
      const formattedBalance = Number(ethers.utils.formatEther(balance));

      if (formattedBalance <= 1) {
        await getFunds(account as string);
      }

      dispatch(deployingDocStore(provider));
      setActiveStep("form");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <>
      <h4 className="mt-8">Create CoO</h4>
      <p className="mt-8">
        See how a TradeTrust Document can be issued and provide your bank the assurance of document integrity
      </p>
      {loading ? (
        <div className="mt-12">
          <LoaderSpinner width="36px" className="mx-auto mb-4" primary="#3B8CC5" />
          <h3 className="text-center">Loading funds to your wallet...</h3>
        </div>
      ) : error.length > 0 ? (
        error
      ) : (
        <Button onClick={handleStart} className="bg-cerulean text-white mt-8 hover:bg-cerulean-300">
          Start Now
        </Button>
      )}
    </>
  );
};
