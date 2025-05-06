import { ProviderTimeoutMessage } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { useEndorsementChain } from "../../common/hooks/useEndorsementChain";
import { URLS } from "../../constants";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

const ProviderDocumentationURL = `${URLS.DOCS}/docs/how-tos/advanced/additional-network-metamask-guide/`;
const timeout = 60;

interface EndorsementChainContainer {
  tokenRegistry: string;
  tokenId: string;
  keyId?: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorsementChainContainer: FunctionComponent<EndorsementChainContainer> = ({
  tokenRegistry,
  tokenId,
  keyId,
  setShowEndorsementChain,
}) => {
  const endorsementChainProps = useEndorsementChain(tokenRegistry, tokenId, keyId);
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
    <EndorsementChainLayout
      {...endorsementChainProps}
      setShowEndorsementChain={setShowEndorsementChain}
      providerDocumentationURL={ProviderDocumentationURL}
    />
  );
};
