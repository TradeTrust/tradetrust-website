import { OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, { createContext, FunctionComponent, useContext } from "react";
import { LoadingModal } from "../../components/UI/Overlay";
import { ChainId } from "../../constants/chain-info";
import { useProviderContext } from "./provider";

interface NetworkContextProps {
  changeUserNetwork: (chainId: ChainId) => void;
}

export const NetworkContext = createContext<NetworkContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeUserNetwork: () => {},
});

interface NetworkContextProviderProps {
  children: React.ReactNode;
}

export const NetworkContextProvider: FunctionComponent<NetworkContextProviderProps> = ({ children }) => {
  const { showOverlay, closeOverlay } = useContext(OverlayContext);
  const { changeNetwork } = useProviderContext();

  const switchNetwork = async (chainId: ChainId) => {
    try {
      showOverlay(<LoadingModal title={"Changing Network..."} content={"Please respond to the metamask window"} />);
      await changeNetwork(chainId);
      closeOverlay();
    } catch (e: any) {
      showOverlay(
        showDocumentTransferMessage("You've cancelled changing network.", {
          isSuccess: false,
        })
      );
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        changeUserNetwork: switchNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = (): NetworkContextProps => useContext<NetworkContextProps>(NetworkContext);
