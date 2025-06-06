import React, { FunctionComponent, useContext, useEffect } from "react";
import { useEndorsementChain } from "../../common/hooks/useEndorsementChain";
import { EndorsementChainLayout } from "./EndorsementChainLayout";
import {
  OverlayContext,
  OverlayContextProvider,
  ProviderTimeoutMessage,
} from "@tradetrust-tt/tradetrust-ui-components";
import { useTimer } from "react-timer-hook";
import { URLS } from "../../constants";

const ProviderDocumentationURL = `${URLS.DOCS}/docs/4.x/topics/advanced/additional-network-metamask-guide/`;
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
