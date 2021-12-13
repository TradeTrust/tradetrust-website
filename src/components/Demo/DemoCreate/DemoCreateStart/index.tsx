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

  const features = [
    {
      img: "circle-form.png",
      title: "Fill up the content for CoO",
    },
    {
      img: "circle-load.png",
      title: "Issue a CoO via TradeTrust",
    },
    {
      img: "circle-verify.png",
      title: "Verify it to make sure it’s not tempered with",
    },
  ];

  return (
    <>
      <p className="mt-8">Here&apos;s what you can do with this Demo:</p>
      <div className="flex justify-around">
        {features.map(({ img, title }) => {
          return (
            <div key={img} className="w-1/3 px-3">
              <img className="mx-auto" src={`/static/images/demo/${img}`} />
              <p className="text-cerulean text-center">{title}</p>
            </div>
          );
        })}
      </div>
      {loading ? (
        <div className="mt-12">
          <LoaderSpinner width="36px" className="mx-auto mb-4" primary="#3B8CC5" />
          <h3 className="text-center">Loading funds to your wallet...</h3>
        </div>
      ) : error.length > 0 ? (
        <div className="mt-12">
          <h3 className="text-center">
            There maybe something wrong with the underlying network, please try again later.
          </h3>
        </div>
      ) : (
        <Button onClick={handleStart} className="flex mx-auto bg-cerulean text-white mt-8 hover:bg-cerulean-300">
          Start Now
        </Button>
      )}
    </>
  );
};
