import React from "react";
import { EndorsementChainContainer } from "./EndorsementChainContainer";

export default {
  title: "Viewer|EndorsementChainContainer",
  component: EndorsementChainContainer,
};

export const Example = () => {
  return (
    <EndorsementChainContainer
      tokenRegistry="0x10E936e6BA85dC92505760259881167141365821"
      tokenId="0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f"
      setShowEndorsementChain={() => {}}
    />
  );
};
