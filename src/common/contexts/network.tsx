import { OverlayContext, showDocumentTransferMessage } from "@govtechsg/tradetrust-ui-components";
import React, {
  DependencyList,
  EffectCallback,
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const changeUserNetwork = async () => {
    const network: ChainId = currentChain;
    try {
      showOverlay(<LoadingModal title={"Changing Network..."} content={"Please respond to the metamask window"} />);
      await changeNetwork(network);
      closeOverlay();
    } catch (e: any) {
      showOverlay(
        showDocumentTransferMessage("You've cancelled changing network.", {
          isSuccess: false,
        })
      );
    }
  };

  const useGranularEffect = (effect: EffectCallback, primaryDeps: DependencyList, secondaryDeps: DependencyList) => {
    const ref = useRef<DependencyList>();

    if (!ref.current || !primaryDeps.every((w, i) => Object.is(w, ref.current[i]))) {
      ref.current = [...primaryDeps, ...secondaryDeps];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(effect, ref.current);
  };

  useGranularEffect(
    () => {
      if (currentChainId !== currentChain) {
        changeUserNetwork();
      }
    },
    [currentChain],
    [currentChainId, changeUserNetwork]
  );

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  updateChainId: (newChain: ChainId) => {},
});
