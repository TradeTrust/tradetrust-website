import React from "react";
import { CreatorItemState } from "../../../common/contexts/CreatorContext";

export interface TokenRegistrySetupProps {
  state?: CreatorItemState;
}

const TokenRegistrySetupRef = (props: TokenRegistrySetupProps, ref: React.Ref<HTMLDivElement>): React.JSX.Element => {
  // const [state, setState] = useState<CreatorItemState>(props.state || CreatorItemState.LOADING);
  return <div ref={ref}>TokenRegistrySetup</div>;
};

export const TokenRegistrySetup = React.forwardRef<HTMLDivElement, TokenRegistrySetupProps>(TokenRegistrySetupRef);
