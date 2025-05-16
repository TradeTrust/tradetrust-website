import { Button } from "../../../Button";
import { gaEvent } from "../../../../common/utils/analytics";

import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useProviderContext } from "../../../../common/contexts/provider";
import { deployingDocStore, getDocumentPrepared } from "../../../../reducers/demo-create";
import { getFunds } from "../../../../services/create";
import { DemoCreateContext } from "../contexts/DemoCreateContext";
import { LoadingModal } from "../../../UI/Overlay";
import { GaAction, GaCategory } from "../../../../types";

export const DemoCreateStart: FunctionComponent = () => {
  const { providerOrSigner, account } = useProviderContext();
  const { setActiveStep } = useContext(DemoCreateContext);
  const [loading, setLoading] = useState(false);
  const [getFundsError, setGetFundsError] = useState(false);

  const { prepared, error } = useSelector(getDocumentPrepared);

  const dispatch = useDispatch();

  const handleStart = async () => {
    try {
      setLoading(true);
      setGetFundsError(false);
      if (!providerOrSigner) throw new Error("Invalid provider");
      if (!account) throw new Error("Not connected");
      const balance = await providerOrSigner.getBalance("latest");
      const formattedBalance = Number(ethers.utils.formatEther(balance));

      if (formattedBalance <= 1) {
        await getFunds(account as string);
      }
      dispatch(deployingDocStore(providerOrSigner));
    } catch (e) {
      setGetFundsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prepared) {
      setActiveStep("form");
      setLoading(false);
      gaEvent({
        action: GaAction.MAGIC_START,
        category: GaCategory.MAGIC_DEMO,
      });
    }

    if (error) {
      setLoading(false);
    }
  }, [prepared, error, setActiveStep]);

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
      {loading && (
        <LoadingModal
          title="Preparing..."
          content={
            <p>
              Please do not navigate out of this demo.
              <br />
              This process might take a while
            </p>
          }
        />
      )}
      <p className="mt-4 mb-4">Here&#39;s what you can do with this Demo:</p>
      <div className="flex justify-around">
        {features.map(({ img, title }) => {
          return (
            <div key={img} className="w-1/3 px-3">
              <img alt={title} className="mx-auto h-32" src={`/static/images/demo/${img}`} />
              <p className="text-cerulean-500 text-center">{title}</p>
            </div>
          );
        })}
      </div>
      {error || getFundsError ? (
        <div className="mt-12">
          <h3 className="text-center">
            There maybe something wrong with the underlying network, please try again later.
          </h3>
        </div>
      ) : (
        <Button onClick={handleStart} className="flex mx-auto bg-cerulean-500 text-white mt-8 hover:bg-cerulean-800">
          Start Now
        </Button>
      )}
    </>
  );
};
