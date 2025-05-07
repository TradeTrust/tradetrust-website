import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useState } from "react";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { ConnectToMetamaskModelComponent } from "../ConnectToMetamask";
import { Model } from "../UI/Overlay/OverlayContent/Model";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import ConnectToMagicLink from "../ConnectToMagicLink";

const WALLET_TYPE_NAME: Partial<Record<SIGNER_TYPE, string>> = {
  [SIGNER_TYPE.METAMASK]: "Metamask",
  [SIGNER_TYPE.MAGIC]: "MagicLink",
};

interface ConnectToBlockchainProps {
  collapsible?: boolean;
  nextStep?: React.ReactNode;
}

interface ConnectToBlockchainHeaderProps {
  selectedWalletType: SIGNER_TYPE;
  setSelectedWalletType: (wallet: SIGNER_TYPE) => void;
}

interface ConnectToBlockchainHeaderItemProps {
  key: string;
  walletType: SIGNER_TYPE;
  walletIcon: React.ReactNode;
  isSelected: boolean;
  isConnected: boolean;
  onClick: () => void;
}

const ConnectToBlockchainHeaderItem = ({
  key,
  walletType,
  walletIcon,
  isSelected,
  isConnected,
  onClick,
}: ConnectToBlockchainHeaderItemProps) => {
  return (
    <button
      id={`connect-blockchain-button-${key}`}
      onClick={onClick}
      className={`connect-blockchain-button break-keep w-max flex gap-2 items-center px-6 py-3 border rounded-t-xl border-b transition-colors ${
        isSelected ? "border-b-white" : "hover:text-blue-600"
      }`}
    >
      {walletIcon}
      {isConnected ? (
        <>
          <div className="text-left">
            <h5>{WALLET_TYPE_NAME[walletType]}</h5>
            <p className="text-cloud-400 text-sm">Connected</p>
          </div>
          <div id="connect-blockchain-active" className="w-3 h-3 rounded-full bg-forest-500" />
        </>
      ) : (
        <h5>{WALLET_TYPE_NAME[walletType]}</h5>
      )}
    </button>
  );
};

const ConnectToBlockchainHeader = ({ selectedWalletType, setSelectedWalletType }: ConnectToBlockchainHeaderProps) => {
  const { providerType, account } = useProviderContext();
  const WalletConnectMethods = [
    {
      walletType: SIGNER_TYPE.METAMASK,
      walletIcon: <img src="/static/images/wallet.png" alt="Metamask" className="w-6 h-6" />,
      isSelected: !!(selectedWalletType === SIGNER_TYPE.METAMASK),
      isConnected: !!(providerType === SIGNER_TYPE.METAMASK && account),
      onClick: () => setSelectedWalletType(SIGNER_TYPE.METAMASK),
    },
    {
      walletType: SIGNER_TYPE.MAGIC,
      walletIcon: <img src="/static/images/magic_link.svg" alt="MagicLink" className="w-6 h-6" />,
      isSelected: !!(selectedWalletType === SIGNER_TYPE.MAGIC),
      isConnected: !!(providerType === SIGNER_TYPE.MAGIC && account),
      onClick: () => setSelectedWalletType(SIGNER_TYPE.MAGIC),
    },
  ];

  return (
    <div className="mx-3 mb-[-1px] overflow-hidden">
      <div className="flex w-full overflow-x-auto">
        <div className="flex w-fit">
          <div className="flex w-fit">
            {WalletConnectMethods.map((wallet) => (
              <ConnectToBlockchainHeaderItem
                key={wallet.walletType}
                walletType={wallet.walletType}
                walletIcon={wallet.walletIcon}
                isSelected={wallet.isSelected}
                isConnected={wallet.isConnected}
                onClick={wallet.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectToBlockchainModel: React.FC<ConnectToBlockchainProps> = ({ collapsible = false, nextStep }) => {
  const [selectedWalletType, setSelectedWalletType] = useState<SIGNER_TYPE>(SIGNER_TYPE.METAMASK);
  const { closeOverlay } = useOverlayContext();

  return (
    <Model
      title="Connect to Blockchain Wallet"
      collapsible={collapsible}
      showDivider
      footer={
        <Button className="w-full xs:w-1/2 text-cerulean-500" onClick={closeOverlay}>
          Cancel
        </Button>
      }
      footerClassName="justify-end"
    >
      <div id="connect-blockchain-header">
        <ConnectToBlockchainHeader
          selectedWalletType={selectedWalletType}
          setSelectedWalletType={setSelectedWalletType}
        />
      </div>
      <div id="connect-blockchain-body" className="p-8 border rounded-xl">
        {selectedWalletType === SIGNER_TYPE.METAMASK && (
          <ConnectToMetamaskModelComponent showOnNewConnectWarningMessage nextStep={nextStep} />
        )}
        {selectedWalletType === SIGNER_TYPE.MAGIC && (
          <ConnectToMagicLink className="w-full" showOnDisconnectWarningMessage />
        )}
      </div>
    </Model>
  );
};

export default ConnectToBlockchainModel;
