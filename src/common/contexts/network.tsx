import { OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from "react";
import { LoadingModal } from "../../components/UI/Overlay";
import { ChainId } from "../../constants/chain-info";
import { useProviderContext } from "./provider";

interface NetworkModalComponentProps {
  children: React.ReactNode;
}

export const NetworkModalComponent: FunctionComponent<NetworkModalComponentProps> = ({ children }) => {
  const { currentChainId, changeNetwork } = useProviderContext();
  const { currentChain } = useContext(ChainContext);
  const { showOverlay, closeOverlay } = useContext(OverlayContext);

  const changeUserNetwork = useCallback(async () => {
    if (currentChainId === currentChain) {
      return;
    }
    const network: ChainId = currentChain;
    try {
      showOverlay(<LoadingModal title={"Changing Network..."} content={"Please respond to the metamask window"} />);
      await changeNetwork(network);
      console.log("changeNetwork");
      console.log(currentChainId);
      closeOverlay();
    } catch (e: any) {
      showOverlay(
        showDocumentTransferMessage("You've cancelled changing network.", {
          isSuccess: false,
        })
      );
    }
  }, [currentChainId, currentChain, changeNetwork, closeOverlay, showOverlay]);

  useEffect(() => {
    changeUserNetwork();
  }, [changeUserNetwork]);

  return <>{children}</>;
};

interface ChainContextProps {
  defaultChain: ChainId;
  children: React.ReactNode;
}

export const ChainContextProvider: FunctionComponent<ChainContextProps> = ({ defaultChain, children }) => {
  const [currentChain, setNewChain] = useState<ChainId>(defaultChain);

  const updateChainId = (newChain: ChainId) => {
    setNewChain(newChain);
  };

  return (
    <ChainContext.Provider
      value={{
        currentChain,
        updateChainId,
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const ChainContext = React.createContext({
  currentChain: ChainId.Ethereum,
  updateChainId: (newChain: ChainId) => {
    console.log(newChain);
  },
});
