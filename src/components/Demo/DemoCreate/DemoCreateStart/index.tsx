import { Button } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useState } from "react";
import { ProviderContext } from "../../../../common/contexts/provider";

export const DemoCreateStart: FunctionComponent = () => {
  const { account } = useContext(ProviderContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addFunds = async (address: string) => {
    await fetch(`https://faucet.openattestation.com/donate/${address}`);
  };

  const handleStart = async () => {
    setLoading(true);

    try {
      await addFunds(account as string);
      // dispatch(updateDemoCreateStatusToForm());
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
        "getting funds"
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
