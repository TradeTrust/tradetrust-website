import React, { FunctionComponent } from "react";
import { TitleEscrowEvent } from "../../../types";
import { EndorsementChain } from "./EndorsementChain";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";

interface EndorsementChainLayout {
  endorsementChain?: TitleEscrowEvent[];
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  error,
  pending,
  endorsementChain,
  setShowEndorsementChain,
}) => {
  return (
    <div>
      {error && <EndorsementChainError error={error} setShowEndorsementChain={setShowEndorsementChain} />}
      {pending && <EndorsementChainLoading />}
      {endorsementChain && (
        <EndorsementChain endorsementChain={endorsementChain} setShowEndorsementChain={setShowEndorsementChain} />
      )}
    </div>
  );
};
