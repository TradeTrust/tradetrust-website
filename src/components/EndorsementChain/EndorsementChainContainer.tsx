import React, { FunctionComponent, useContext, useEffect } from "react";
import { useEndorsementChain } from "../../common/hooks/useEndorsementChain";
import { EndorsementChainLayout } from "./EndorsementChainLayout";
import {
  MessageTitle,
  OverlayContext,
  OverlayContextProvider,
  showDocumentTransferMessage,
} from "@govtechsg/tradetrust-ui-components";
import { useTimer } from "react-timer-hook";

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
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1);

  const { start, pause } = useTimer({
    expiryTimestamp,
    onExpire: () =>
      showOverlay(showDocumentTransferMessage(MessageTitle.ACCEPT_SURRENDER_DOCUMENT, { isSuccess: true })),
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
      <EndorsementChainLayout {...endorsementChainProps} setShowEndorsementChain={setShowEndorsementChain} />
    </OverlayContextProvider>
  );
};
