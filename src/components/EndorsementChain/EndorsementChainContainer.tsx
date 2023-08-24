import React, { FunctionComponent, useContext, useEffect } from "react";
import { useEndorsementChain } from "../../common/hooks/useEndorsementChain";
import { EndorsementChainLayout } from "./EndorsementChainLayout";
import { OverlayContext, OverlayContextProvider, ProviderTimeoutMessage } from "@govtechsg/tradetrust-ui-components";
import { useTimer } from "react-timer-hook";

const ProviderDocumentationURL = "https://docs.tradetrust.io/docs/advanced/add-polygon-networks-to-metamask-wallet/";
const timeout = 60;

interface EndorsementChainContainer {
  tokenRegistry: string;
  tokenId: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorsementChainContainer: FunctionComponent<EndorsementChainContainer> = ({
  tokenRegistry,
  tokenId,
  setShowEndorsementChain,
}) => {
  const endorsementChainProps = useEndorsementChain(tokenRegistry, tokenId);
  const expiryTimestamp = new Date();
  const { showOverlay } = useContext(OverlayContext);
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeout);

  const handleProviderTimeout = () => {
    showOverlay(<ProviderTimeoutMessage address={ProviderDocumentationURL} />);
  };

  const { start, pause } = useTimer({
    expiryTimestamp,
    onExpire: handleProviderTimeout,
  });

  const { error, pending } = endorsementChainProps;
  useEffect(() => {
    if (!!error || !pending) {
      pause();
    } else if (pending) {
      start();
    }
  }, [start, pause, error, pending]);

  useEffect(() => {
    if (error) {
      pause();
    }
  }, [error, pause]);

  return (
    <OverlayContextProvider>
      <EndorsementChainLayout
        {...endorsementChainProps}
        setShowEndorsementChain={setShowEndorsementChain}
        providerDocumentationURL={ProviderDocumentationURL}
      />
    </OverlayContextProvider>
  );
};
