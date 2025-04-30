import React from "react";

export interface TokenRegistrySetupProps {}

const TokenRegistrySetupRef = (props: TokenRegistrySetupProps, ref: React.Ref<HTMLDivElement>): React.JSX.Element => {
  return <div ref={ref}>TokenRegistrySetup</div>;
};

export const TokenRegistrySetup = React.forwardRef<HTMLDivElement, TokenRegistrySetupProps>(TokenRegistrySetupRef);
