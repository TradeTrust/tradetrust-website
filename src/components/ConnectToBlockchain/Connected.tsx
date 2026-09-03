import React, { useCallback, useEffect, useRef, useState } from "react";
// @ts-ignore: react-tooltip
import { Tooltip } from "react-tooltip";
// @ts-ignore: react-tooltip
import type { TooltipRefProps } from "react-tooltip";
import { useProviderContext } from "../../common/contexts/provider";
import ConnectToBlockchainModel from ".";
import { useOverlayContext } from "../../common/contexts/OverlayContext";

interface ConnectedProps {
  imgSrc: string;
  openConnectToBlockchainModel?: boolean;
  withCardLayout?: boolean;
  account?: string;
}

export const Connected: React.FC<ConnectedProps> = ({
  imgSrc,
  openConnectToBlockchainModel = false,
  withCardLayout = true,
  account: accountProp,
}) => {
  const [tooltipMessage, setTooltipMessage] = useState(openConnectToBlockchainModel ? "" : "Copy");
  const tooltipRef = useRef<TooltipRefProps>(null);
  const [displayedAccount, setDisplayedAccount] = useState("");
  const accountRef = useRef<HTMLHeadingElement>(null);
  const { account: contextAccount } = useProviderContext();
  const { showOverlay } = useOverlayContext();
  const account = accountProp || contextAccount;

  const updateDisplayedAccount = useCallback(() => {
    if (account && accountRef.current) {
      const accountWidth = accountRef.current!.clientWidth;
      const charCount = Math.floor(accountWidth / 9); // Approximate character width
      const startSlice = Math.max(0, charCount - 6);
      if (startSlice < account?.length) {
        setDisplayedAccount(`${account.slice(0, startSlice)}...${account.slice(-4)}`);
      } else {
        setDisplayedAccount(account);
      }
    }
  }, [account]);

  useEffect(() => {
    // Remove event listener on cleanup
    return () => {
      if (account && window?.removeEventListener) {
        window.removeEventListener("resize", updateDisplayedAccount);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateDisplayedAccount();
    window.addEventListener("resize", updateDisplayedAccount);
    return () => window.removeEventListener("resize", updateDisplayedAccount);
  }, [updateDisplayedAccount]);

  const handleActiveWalletClicked = async () => {
    if (openConnectToBlockchainModel) {
      showOverlay(<ConnectToBlockchainModel collapsible={true} />);
    } else if (account) {
      try {
        await navigator.clipboard.writeText(account);
        tooltipRef.current?.close();
        setTooltipMessage("Copied!");
        setTimeout(() => {
          tooltipRef.current?.open();
        }, 0);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <>
      <div
        onMouseLeave={() => {
          if (openConnectToBlockchainModel) return;

          setTimeout(() => {
            tooltipRef.current?.close();
            setTooltipMessage("Copy");
          }, 1_000);
        }}
        onMouseEnter={() => {
          if (openConnectToBlockchainModel) return;

          tooltipRef.current?.close();
          setTooltipMessage("Copy");
          setTimeout(() => {
            tooltipRef.current?.open();
          }, 0);
        }}
        data-tooltip-id="active-wallet-tooltip"
        onClick={handleActiveWalletClicked}
        data-testid="activeWallet"
        className={`${
          withCardLayout ? "shadow" : ""
        } px-4 py-1 ml-auto flex items-center bg-gray-100 text-gray-800 rounded-lg cursor-pointer transition duration-300 ease-in-out select-none hover:bg-gray-200`}
      >
        <img src={imgSrc} alt="Wallet Icon" className="w-6 h-6 mr-4" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <p className="text-sm">{accountProp ? "Wallet Address (MetaMask):" : "Active Wallet"}</p>
          <h5
            data-testid="wallet-address"
            ref={accountRef}
            className="text-cerulean-300 text-sm font-bold block whitespace-nowrap"
          >
            {displayedAccount}
          </h5>
        </div>
        {!openConnectToBlockchainModel && <img src="/static/images/copy.svg" alt="Copy" className="w-5 h-5" />}
      </div>
      <Tooltip
        ref={tooltipRef}
        variant="light"
        id="active-wallet-tooltip"
        border="1px solid #E7EAEC"
        content={tooltipMessage}
      />
    </>
  );
};

export default Connected;
