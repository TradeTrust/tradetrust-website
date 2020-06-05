import React from "react";
import { useIdentifierResolver } from "../../../../common/hooks/useIdentifierResolver";

export const MessageAddressResolved = ({ address }: { address: string }) => {
  const { resolvedIdentifier } = useIdentifierResolver(address);
  return <p>{resolvedIdentifier}</p>;
};
