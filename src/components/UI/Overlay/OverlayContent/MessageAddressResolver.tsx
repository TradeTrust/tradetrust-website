import React from "react";
import { useIdentifierResolver } from "../../../../common/hooks/useIdentifierResolver";

export const MessageAddressResolver = ({ address }: { address: string }) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);
  return <p>{resolvedIdentifier || address}</p>;
};
