import React from "react";
import { useIdentifierResolver } from "../../../../common/hooks/useIdentifierResolver";

export const MessageAddressResolver = ({ address }: { address: string }) => {
  const { identityName } = useIdentifierResolver(address);
  return <p>{identityName || address}</p>;
};
