import React, { useCallback, useContext } from "react";
import { LoadingModal } from "../../components/UI/Overlay";
import { showDocumentTransferMessage } from "../../components/UI/Overlay/OverlayContent";
import { ChainId } from "../../constants/chain-info";
import { OverlayContext } from "../contexts/OverlayContext";
import { useProviderContext } from "../contexts/provider";

interface useNetworkSelectProps {
  switchNetwork: (chainId: ChainId) => void;
}

export const useNetworkSelect = (): useNetworkSelectProps => {
  const { changeNetwork } = useProviderContext();
  const { showOverlay, closeOverlay } = useContext(OverlayContext);

  const switchNetwork = useCallback(
    async (chainId: ChainId) => {
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
    },
    [changeNetwork, closeOverlay, showOverlay]
  );

  return { switchNetwork };
};
