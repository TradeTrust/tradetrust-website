import React, { useCallback, useContext } from "react";
import { LoadingModal } from "../../components/UI/Overlay";
import { showDocumentTransferMessage } from "../../components/UI/Overlay/OverlayContent";
import { ChainId } from "../../constants/chain-info";
import { OverlayContext } from "../contexts/OverlayContext";
import { SIGNER_TYPE, useProviderContext } from "../contexts/provider";

interface useNetworkSelectProps {
  inPlaceLoading?: boolean;
}

interface NetworkSelectReturnType {
  switchNetwork: (chainId: ChainId) => void;
}

export const useNetworkSelect = ({ inPlaceLoading = false }: useNetworkSelectProps = {}): NetworkSelectReturnType => {
  const { providerType, changeNetwork, setNetworkChangeLoading } = useProviderContext();
  const { showOverlay, closeOverlay } = useContext(OverlayContext);

  const switchNetwork = useCallback(
    async (chainId: ChainId) => {
      try {
        if (!inPlaceLoading) {
          if (providerType === SIGNER_TYPE.METAMASK) {
            showOverlay(
              <LoadingModal title={"Changing Network..."} content={"Please respond to the metamask window"} />
            );
          }
        } else {
          setNetworkChangeLoading(true);
        }

        await changeNetwork(chainId);

        if (!inPlaceLoading) {
          closeOverlay();
        }
      } catch (e: any) {
        showOverlay(
          showDocumentTransferMessage("You've cancelled changing network.", {
            isSuccess: false,
          })
        );
      }
    },
    [changeNetwork, closeOverlay, inPlaceLoading, setNetworkChangeLoading, showOverlay, providerType]
  );

  return { switchNetwork };
};
