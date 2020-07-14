import React, { FunctionComponent } from "react";
import { useEndorsementChain } from "../../common/hooks/useEndorsementChain";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

interface EndorsementChainContainer {
  tokenRegistry: string;
  tokenId: string;
}

export const EndorsementChainContainer: FunctionComponent<EndorsementChainContainer> = ({ tokenRegistry, tokenId }) => {
  const endorsementChainProps = useEndorsementChain(tokenRegistry, tokenId);
  return <EndorsementChainLayout {...endorsementChainProps} />;
};
