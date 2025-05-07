import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { useProviderContext } from "../../common/contexts/provider";
import { showDocumentTransferMessage } from "../UI/Overlay/OverlayContent";

const ConnectToMetamask = ({ className }: { className?: string }): React.ReactElement => {
  const { showOverlay } = useContext(OverlayContext);
  const { upgradeToMetaMaskSigner, account } = useProviderContext();
  const [tooltipMessage, setTooltipMessage] = useState("Copy");
  const tooltipRef = useRef(null);
  const [displayedAccount, setDisplayedAccount] = useState("");
  const accountRef = useRef<HTMLHeadingElement>(null);

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
        ReactTooltip.hide(tooltipRef.current!);
        setTooltipMessage("Copied!");
        setTimeout(() => {
          ReactTooltip.show(tooltipRef.current!);
        }, 0);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  useEffect(() => {
    if (account && accountRef.current) {
      const updateDisplayedAccount = () => {
        const accountWidth = accountRef.current!.clientWidth;
        const charCount = Math.floor(accountWidth / 9); // Approximate character width
        const startSlice = Math.max(0, charCount - 6);
        if (startSlice < account?.length) {
          setDisplayedAccount(`${account.slice(0, startSlice)}...${account.slice(-4)}`);
        } else {
          setDisplayedAccount(account);
        }
      };
      updateDisplayedAccount();
      window.addEventListener("resize", updateDisplayedAccount);
      return () => window.removeEventListener("resize", updateDisplayedAccount);
    }
  }, [account]);

  return (
    <div className={`self-start md:self-center w-[18.25rem] ${className}`}>
      {account ? (
        <>
          <div
            onMouseLeave={() => {
              setTimeout(() => {
                ReactTooltip.hide(tooltipRef.current!);
                setTooltipMessage("Copy");
              }, 1_000);
            }}
            onMouseEnter={() => {
              ReactTooltip.hide(tooltipRef.current!);
              setTooltipMessage("Copy");
              setTimeout(() => {
                ReactTooltip.show(tooltipRef.current!);
              }, 0);
            }}
            ref={tooltipRef}
            data-tip={tooltipMessage}
            data-for="active-wallet-tooltip"
            onClick={handleActiveWalletClicked}
            data-testid="activeWallet"
            className="px-4 py-1 ml-auto flex items-center bg-gray-100 text-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out select-none"
          >
            <img src={"/static/images/wallet.png"} alt="Wallet Icon" className="w-6 h-6 mr-4" />
            <div className="flex-1 flex flex-col overflow-hidden">
              <p className="text-sm">Active Wallet</p>
              <h5 ref={accountRef} className="text-cerulean-300 text-sm font-bold block whitespace-nowrap">
                {displayedAccount}
              </h5>
            </div>
          </div>
        </>
      ) : (
        <Button
          className="w-full bg-white hover:bg-cloud-100 rounded-xl text-lg py-2 px-3 flex items-center gap-2 text-[16px] font-bold"
          data-testid={"connectToWallet"}
          onClick={handleConnectWallet}
        >
          {" "}
          <img src="/static/images/wallet.png" alt="MetaMask" className="w-6 h-6" />
          <div className="flex-1 text-center">Connect to Metamask</div>
        </Button>
      )}
      <ReactTooltip type="light" id="active-wallet-tooltip" effect="solid" getContent={() => tooltipMessage} />
    </div>
  );
};

export default ConnectToMetamask;
