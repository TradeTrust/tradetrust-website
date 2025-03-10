import React, { useContext, useRef, useState } from "react";
import { Button, OverlayContext, showDocumentTransferMessage } from "@tradetrust-tt/tradetrust-ui-components";

import ReactTooltip from "react-tooltip";
import { useProviderContext } from "../../common/contexts/provider";

const ConnectToMetamask = (): React.ReactElement => {
  const { showOverlay } = useContext(OverlayContext);
  const { upgradeToMetaMaskSigner, account } = useProviderContext();
  const [tooltipMessage, setTooltipMessage] = useState("Copy");
  const tooltipRef = useRef(null);
  const handleConnectWallet = async () => {
    try {
      await upgradeToMetaMaskSigner();
    } catch (error: any) {
      console.error(error);
      handleMetamaskError(error.message, error.code);
    }
  };
  const handleMetamaskError = (errorMesssage: string, errorCode: number) => {
    const isUserDeniedAccountAuthorization = errorCode === 4001;
    showOverlay(
      showDocumentTransferMessage(errorMesssage, {
        isSuccess: false,
        isButtonMetamaskInstall: !isUserDeniedAccountAuthorization,
      })
    ); // there is 2 type of errors that will be handled here, 1st = NO_METAMASK (error thrown from provider.tsx), 2nd = NO_USER_AUTHORIZATION (error from metamask extension itself).
  };

  const handleActiveWalletClicked = async () => {
    if (account) {
      try {
        await navigator.clipboard.writeText(account);
        setTooltipMessage("Copied!");
        ReactTooltip.hide(tooltipRef.current!);
        setTimeout(() => {
          ReactTooltip.show(tooltipRef.current!);
        }, 0);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };
  return (
    <div className="mt-4 md:mt-0 self-start md:self-center">
      {account ? (
        <>
          <div
            onMouseLeave={() => setTooltipMessage("Copy")}
            ref={tooltipRef}
            data-tip={tooltipMessage}
            data-for="active-wallet-tooltip"
            onClick={handleActiveWalletClicked}
            data-testid="activeWallet"
            className="w-[18.25rem] px-4 py-1 ml-auto flex items-center bg-gray-100 text-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out select-none"
          >
            <img src={"/static/images/wallet.png"} alt="Wallet Icon" className="w-6 h-6 mr-4" />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm">Active Wallet</p>
              <h5 className="text-cerulean-300 text-sm font-bold block whitespace-nowrap">{`${account.slice(
                0,
                account.length - 20
              )}...${account.slice(-4)}`}</h5>
            </div>
          </div>
        </>
      ) : (
        <Button
          className="bg-white  hover:bg-cloud-100 rounded-xl text-lg py-2 px-3 w-[18.25rem] flex items-center gap-2 text-[16px] font-bold"
          data-testid={"connectToWallet"}
          onClick={handleConnectWallet}
        >
          {" "}
          <img src="/static/images/wallet.png" alt="MetaMask" className="w-6 h-6" />
          Connect to Metamask
        </Button>
      )}
    </div>
  );
};

export default ConnectToMetamask;
