import React, { useEffect } from "react";
import { useProviderContext } from "../common/contexts/provider";
import { useShowMetaMaskPopup } from "../common/hooks/useShowMetaMaskPopup";
import Connected from "./ConnectToBlockchain/Connected";
import { NetworkLabel } from "./Creator/NetworkPanel/NetworkLabel";
import { ChainId } from "../constants/chain-info";

export const MetaMaskPopup = () => {
  const { account, currentChainId } = useProviderContext();
  const showPopup = useShowMetaMaskPopup(account!, currentChainId!);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="overlay fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[999]">
      <div className="overlay-bg absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[998]" />

      <div
        className="relative flex flex-col rounded-xl shadow-lg overflow-hidden bg-white max-w-[640px] w-full z-[1000]"
        style={{ width: "calc(100vw - (15px * 2))" }}
      >
        <div className="flex flex-nowrap justify-start items-center p-6 pb-4">
          <div className="flex items-center space-x-3">
            <img className="h-6 w-6" src="/static/images/alert/warning.png" alt="Warning" />
            <h3 className="flex-1 w-auto leading-7 p-2">
              <span>MetaMask Change Detected</span>
            </h3>
          </div>
        </div>

        <hr className="border-cloud-200" />

        <div
          id="content"
          className="px-6 py-4 flex-1 overflow-y-auto break-words text-left text-cloud-800 text-base space-y-4"
          data-testid="modal-description"
        >
          <p>Oops! Your MetaMask settings have changed.</p>
          <p>Reverting to the previous setup will help you continue.</p>

          <div className="px-2 py-4 ml-auto bg-gray-100 text-gray-800 rounded-lg w-full">
            <h6 className="px-4 text-lg font-bold">Previous Settings</h6>

            <div className="mt-4 px-4">
              <NetworkLabel networkName={ChainId[sessionStorage.getItem("chainId") as unknown as number].toString()} />
            </div>

            <div className="mt-4">
              <Connected
                imgSrc="/static/images/wallet.png"
                account={sessionStorage.getItem("account")!}
                withCardLayout={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
